const redis = require("../config/redis");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const CART_PREFIX = "cart:";
const CART_TTL = 60 * 60 * 24 * 7; // 7 days

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
  if (!redis) {
    throw new AppError("Cart service is temporarily unavailable", 503);
  }

  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new AppError("Product ID is required", 400);
  }

  // Validate product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const cartKey = `${CART_PREFIX}${req.user._id}`;

  // Store as JSON string in a Redis hash (field = productId, value = cart item data)
  const cartItem = JSON.stringify({
    productId: product._id,
    name: product.name,
    price: product.discountPrice || product.basePrice,
    image: product.image,
    quantity: parseInt(quantity, 10),
  });

  await redis.hset(cartKey, productId, cartItem);
  await redis.expire(cartKey, CART_TTL);

  // Get updated cart
  const cart = await redis.hgetall(cartKey);
  const items = Object.values(cart).map((item) => JSON.parse(item));

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart: items,
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeFromCart = asyncHandler(async (req, res) => {
  if (!redis) {
    throw new AppError("Cart service is temporarily unavailable", 503);
  }

  const { productId } = req.params;
  const cartKey = `${CART_PREFIX}${req.user._id}`;

  const removed = await redis.hdel(cartKey, productId);

  if (!removed) {
    throw new AppError("Item not found in cart", 404);
  }

  // Get updated cart
  const cart = await redis.hgetall(cartKey);
  const items = Object.values(cart).map((item) => JSON.parse(item));

  res.json({
    success: true,
    message: "Item removed from cart",
    cart: items,
  });
});

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
  if (!redis) {
    throw new AppError("Cart service is temporarily unavailable", 503);
  }

  const cartKey = `${CART_PREFIX}${req.user._id}`;
  const cart = await redis.hgetall(cartKey);
  const items = Object.values(cart).map((item) => JSON.parse(item));

  res.json({
    success: true,
    cart: items,
  });
});

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
