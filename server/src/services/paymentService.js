const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const AppError = require("../utils/AppError");

/**
 * Create a Razorpay payment order.
 * @param {number} amount - Amount in rupees
 * @param {string} receipt - Receipt/order identifier
 */
const createRazorpayOrder = async (amount, receipt) => {
  const options = {
    amount: Math.round(amount * 100), // Razorpay expects paise
    currency: "INR",
    receipt,
    payment_capture: 1, // Auto-capture
  };

  const order = await razorpay.orders.create(options);
  return order;
};

/**
 * Verify Razorpay payment signature.
 * @param {string} razorpayOrderId
 * @param {string} razorpayPaymentId
 * @param {string} razorpaySignature
 * @returns {boolean}
 */
const verifyPaymentSignature = (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === razorpaySignature;
};

module.exports = {
  createRazorpayOrder,
  verifyPaymentSignature,
};
