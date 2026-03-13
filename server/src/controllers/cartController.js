const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new AppError("Product ID is required", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.basePrice,
        image: product.image,
        quantity: parseInt(quantity, 10),
      }]
    });
  } else {
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = parseInt(quantity, 10);
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.basePrice,
        image: product.image,
        quantity: parseInt(quantity, 10),
      });
    }
    await cart.save();
  }

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart: cart.items,
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();

  res.json({
    success: true,
    message: "Item removed from cart",
    cart: cart.items,
  });
});

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json({
    success: true,
    cart: cart.items,
  });
});

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
