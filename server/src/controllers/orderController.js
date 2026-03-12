const Order = require("../models/Order");
const { sendOrderConfirmationEmail } = require("../services/emailService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * @desc    Place a new order (COD / direct)
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    customerName,
    email,
    phone,
    deliveryAddress,
    shippingAddress,
    paymentMethod,
    shippingMethod,
    subtotal,
    shipping,
    tax,
    total,
  } = req.body;

  if (!items || items.length === 0) {
    throw new AppError("No order items provided", 400);
  }

  const finalAddress = deliveryAddress || shippingAddress || {};

  const order = await Order.create({
    user: req.user._id,
    customerName: customerName || req.user.name,
    email: email || req.user.email,
    phone: phone || "",
    items,
    deliveryAddress: finalAddress,
    shippingAddress: finalAddress,
    paymentMethod: paymentMethod || "COD",
    paymentStatus: paymentMethod === "COD" ? "Pending" : "Pending",
    shippingMethod: shippingMethod || "standard",
    subtotal,
    shipping: shipping || 0,
    tax: tax || 0,
    total,
    status: "Placed",
    trackingHistory: [
      {
        status: "Order Placed & Confirmed",
        location: finalAddress.city || "",
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
    order,
  });
});

/**
 * @desc    Get current user's orders
 * @route   GET /api/orders/my
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({
    success: true,
    orders,
  });
});

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Ensure user can only view their own orders (or admin)
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new AppError("Not authorized to view this order", 403);
  }

  res.json({
    success: true,
    order,
  });
});

/**
 * @desc    Track order by tracking ID (public)
 * @route   GET /api/orders/track/:trackingId
 * @access  Public
 */
const trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    trackingId: req.params.trackingId,
  }).populate("items.product", "name image");

  if (!order) {
    throw new AppError("Order not found with this tracking ID", 404);
  }

  res.json({
    success: true,
    tracking: {
      orderId: order.orderId,
      trackingId: order.trackingId,
      orderStatus: order.status,
      paymentStatus: order.paymentStatus,
      deliveryAddress: order.deliveryAddress,
      productDetails: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      total: order.total,
      trackingHistory: order.trackingHistory,
      estimatedDelivery: null,
      createdAt: order.createdAt,
    },
  });
});

/**
 * @desc    Download invoice PDF
 * @route   GET /api/orders/:id/invoice
 * @access  Private
 */
const downloadInvoice = asyncHandler(async (req, res) => {
  const { generateInvoice } = require("../services/invoiceService");

  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Check authorization
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new AppError("Not authorized", 403);
  }

  const pdfBuffer = await generateInvoice(order);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=Invoice-${order.orderId}.pdf`,
    "Content-Length": pdfBuffer.length,
  });

  res.send(pdfBuffer);
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  trackOrder,
  downloadInvoice,
};
