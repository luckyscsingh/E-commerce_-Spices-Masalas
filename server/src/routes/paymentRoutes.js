const express = require("express");
const { protect } = require("../middleware/auth");
const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const router = express.Router();

// All payment routes are protected
router.use(protect);

router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

module.exports = router;
