const express = require("express");
const { protect } = require("../middleware/auth");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.get("/", getCart);

module.exports = router;
