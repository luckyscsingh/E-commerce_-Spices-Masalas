const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// GET /api/admin/stats — Dashboard statistics
router.get("/stats", async (req, res) => {
  try {
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
    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      lowStockItems,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/orders — Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/orders/:id/status — Update order status
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status, location } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    order.trackingHistory.push({
      status,
      location: location || "",
      date: new Date(),
    });

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
