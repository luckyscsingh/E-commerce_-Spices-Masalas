const express = require("express");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// GET /api/products — List all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id — Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products — Create product (admin only, with image upload)
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
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

      const product = await Product.create({
        name,
        description,
        basePrice: Number(basePrice),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        image: req.file ? req.file.filename : "",
        category: category || "Spices",
        sku,
        badge,
        rating: rating ? Number(rating) : 4.8,
        stock: stock ? Number(stock) : 0,
        lowStockAlert: lowStockAlert ? Number(lowStockAlert) : 10,
        weight,
        shippingClass,
        includeTax: includeTax === "true",
        trackInventory: trackInventory === "true",
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// PUT /api/products/:id — Update product (admin only)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update fields
      const fields = [
        "name",
        "description",
        "basePrice",
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

      if (req.body.includeTax !== undefined) {
        product.includeTax = req.body.includeTax === "true";
      }
      if (req.body.trackInventory !== undefined) {
        product.trackInventory = req.body.trackInventory === "true";
      }
      if (req.file) {
        product.image = req.file.filename;
      }

      const updated = await product.save();
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE /api/products/:id — Delete product (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
