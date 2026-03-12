const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

// ----- Security Middleware -----
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Rate limiting — 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes.",
  },
});
app.use("/api", apiLimiter);

// ----- Body Parsers -----
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ----- Logging -----
app.use(morgan("dev"));

// ----- Static Files (legacy uploads support) -----
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----- API Routes -----
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Spice Store API is running",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ----- Global Error Handler -----
app.use(errorHandler);

// ----- Start Server -----
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Optionally connect Redis (lazy connect)
    try {
      const redis = require("./src/config/redis");
      if (redis) {
        await redis.connect();
      }
    } catch (err) {
      console.warn("Redis not available — cart caching disabled.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
