const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
    },
    price: {
      type: Number,
      default: null,
    },
    discountPrice: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    cloudinaryId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Spices", "Powders", "Luxury", "Seeds", "Herbs", "Other"],
      default: "Spices",
    },
    sku: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      default: 0,
    },
    lowStockAlert: {
      type: Number,
      default: 10,
    },
    weight: {
      type: String,
      default: "",
    },
    dimensions: {
      length: { type: String, default: "" },
      width: { type: String, default: "" },
      height: { type: String, default: "" },
    },
    shippingClass: {
      type: String,
      default: "Standard Shipping",
    },
    includeTax: {
      type: Boolean,
      default: false,
    },
    trackInventory: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Text index for search functionality
productSchema.index({ name: "text", description: "text" });

// Set price from basePrice if not explicitly set
productSchema.pre("save", function (next) {
  if (!this.price) {
    this.price = this.basePrice;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
