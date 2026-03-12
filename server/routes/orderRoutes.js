const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST /api/orders — Place a new order (protected)
router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      subtotal,
      shipping,
      tax,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      shippingMethod: shippingMethod || "standard",
      subtotal,
      shipping: shipping || 0,
      tax: tax || 0,
      total,
      status: "Placed",
      trackingHistory: [
        {
          status: "Order Placed & Confirmed",
          location: shippingAddress.city || "",
          date: new Date(),
        },
      ],
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/my — Get current user's orders (protected)
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id — Get single order details (protected)
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure user can only view their own orders (or admin)
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
