const express = require("express");
const { protect } = require("../middleware/auth");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  trackOrder,
  downloadInvoice,
} = require("../controllers/orderController");

const router = express.Router();

// Public tracking route (must be before /:id)
router.get("/track/:trackingId", trackOrder);

// Protected routes
router.use(protect);

router.post("/", createOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrderById);
router.get("/:id/invoice", downloadInvoice);

module.exports = router;
