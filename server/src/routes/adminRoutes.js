const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const { adminLogin } = require("../controllers/authController");
const {
  getStats,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

const router = express.Router();

// Admin login — public
router.post("/login", adminLogin);

// All routes below require auth + admin role
router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

module.exports = router;
