const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Admin
 */
const getStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalCustomers = await User.countDocuments({ role: "user" });
  const lowStockItems = await Product.countDocuments({
    $expr: { $lte: ["$stock", "$lowStockAlert"] },
    trackInventory: true,
  });

  // Revenue
  const revenueResult = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  res.json({
    success: true,
    totalProducts,
    totalOrders,
    totalCustomers,
    lowStockItems,
    totalRevenue,
  });
});

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    orders,
  });
});

/**
 * @desc    Update order status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, location } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.status = status;
  order.trackingHistory.push({
    status,
    location: location || "",
    date: new Date(),
  });

  const updated = await order.save();

  res.json({
    success: true,
    order: updated,
  });
});

module.exports = {
  getStats,
  getAllOrders,
  updateOrderStatus,
};
