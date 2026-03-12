const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shippingAddress: {
      fullName: { type: String, default: "" },
      street: { type: String, default: "" },
      apt: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      default: "COD",
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Placed",
    },
    trackingHistory: [
      {
        status: String,
        location: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate orderId before saving
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId =
      "SH-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
