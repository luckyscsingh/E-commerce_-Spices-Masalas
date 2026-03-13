const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

/**
 * @desc    Get all products with pagination, search, and category filter
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, category, search } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  // Build query filter
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limitNum);

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({
    products,
    totalProducts,
    currentPage: pageNum,
    totalPages,
  });
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.json(product);
});

/**
 * @desc    Get all unique product categories
 * @route   GET /api/products/categories
 * @access  Public
 */
const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  const validCategories = categories.filter(c => c && c.trim() !== "");
  res.json(validCategories);
});

/**
 * @desc    Create a new product (with Cloudinary image upload)
 * @route   POST /api/products
 * @access  Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    basePrice,
    discountPrice,
    category,
    sku,
    badge,
    rating,
    stock,
    lowStockAlert,
    weight,
    shippingClass,
    includeTax,
    trackInventory,
  } = req.body;

  let imageUrl = "";
  let cloudinaryId = "";

  // Upload image to Cloudinary if file is provided
  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "spice-store/products",
          transformation: [{ width: 800, height: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) reject(new AppError("Image upload failed", 500));
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    imageUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const product = await Product.create({
    name,
    description,
    basePrice: Number(basePrice),
    price: discountPrice ? Number(discountPrice) : Number(basePrice),
    discountPrice: discountPrice ? Number(discountPrice) : null,
    image: imageUrl,
    cloudinaryId,
    category: category || "Spices",
    sku,
    badge,
    rating: rating ? Number(rating) : 4.8,
    stock: stock ? Number(stock) : 0,
    lowStockAlert: lowStockAlert ? Number(lowStockAlert) : 10,
    weight,
    shippingClass,
    includeTax: includeTax === "true" || includeTax === true,
    trackInventory: trackInventory === "true" || trackInventory === true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  // Handle image replacement on Cloudinary
  if (req.file) {
    // Delete old image from Cloudinary if it exists
    if (product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }

    // Upload new image
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "spice-store/products",
          transformation: [{ width: 800, height: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) reject(new AppError("Image upload failed", 500));
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    product.image = result.secure_url;
    product.cloudinaryId = result.public_id;
  }

  // Update scalar fields
  const fields = [
    "name",
    "description",
    "basePrice",
    "price",
    "discountPrice",
    "category",
    "sku",
    "badge",
    "rating",
    "stock",
    "lowStockAlert",
    "weight",
    "shippingClass",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  // Handle boolean fields
  if (req.body.includeTax !== undefined) {
    product.includeTax =
      req.body.includeTax === "true" || req.body.includeTax === true;
  }
  if (req.body.trackInventory !== undefined) {
    product.trackInventory =
      req.body.trackInventory === "true" || req.body.trackInventory === true;
  }

  const updated = await product.save();

  res.json({
    success: true,
    product: updated,
  });
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  // Delete image from Cloudinary
  if (product.cloudinaryId) {
    await cloudinary.uploader.destroy(product.cloudinaryId);
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
};
