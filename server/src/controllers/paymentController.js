const Order = require("../models/Order");
const {
  createRazorpayOrder,
  verifyPaymentSignature,
} = require("../services/paymentService");
const { sendOrderConfirmationEmail } = require("../services/emailService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * @desc    Create a Razorpay payment order
 * @route   POST /api/payment/create-order
 * @access  Private
 */
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount, items, customerName, email, phone, deliveryAddress } =
    req.body;

  if (!amount || amount <= 0) {
    throw new AppError("Invalid payment amount", 400);
  }

  // Create Razorpay order
  const receipt = `rcpt_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;
  const razorpayOrder = await createRazorpayOrder(amount, receipt);

  res.status(201).json({
    success: true,
    order: {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
    },
    key: process.env.RAZORPAY_KEY_ID,
  });
});

/**
 * @desc    Verify Razorpay payment and create order
 * @route   POST /api/payment/verify
 * @access  Private
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderData,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError("Missing payment verification data", 400);
  }

  // Verify signature
  const isValid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    throw new AppError("Payment verification failed — invalid signature", 400);
  }

  // Create order in database
  const {
    items,
    customerName,
    email,
    phone,
    deliveryAddress,
    shippingMethod,
    subtotal,
    shipping,
    tax,
    total,
  } = orderData;

  if (!items || items.length === 0) {
    throw new AppError("No order items provided", 400);
  }

  const order = await Order.create({
    user: req.user._id,
    customerName: customerName || req.user.name,
    email: email || req.user.email,
    phone: phone || "",
    items,
    deliveryAddress: deliveryAddress || {},
    shippingAddress: deliveryAddress || {},
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
    shippingMethod: shippingMethod || "standard",
    subtotal,
    shipping: shipping || 0,
    tax: tax || 0,
    total,
    status: "Processing",
    trackingHistory: [
      {
        status: "Order Placed & Payment Confirmed",
        location: deliveryAddress?.city || "",
        date: new Date(),
      },
    ],
  });

  // Send confirmation email (async, non-blocking)
  sendOrderConfirmationEmail(order).catch((err) =>
    console.error("Email sending failed:", err.message)
  );

  res.status(201).json({
    success: true,
    message: "Payment verified and order created successfully",
    order: {
      orderId: order.orderId,
      trackingId: order.trackingId,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.total,
    },
  });
});

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
