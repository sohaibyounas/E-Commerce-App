const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
connectDB();

const app = express();

// 1. Security HTTP Headers
app.use(helmet({ crossOriginResourcePolicy: false })); // static images allow karne ke liye

// 2. CORS setup
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);

// 3. Request Body Parsers
app.use(express.json({ limit: "10kb" })); // Large payload attacks rokne ke liye limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 4. Data sanitization against NoSQL query injection
// Express 5 compatibility: req.query is getter-only by default, make it writable for express-mongo-sanitize
app.use((req, res, next) => {
  if (req.query) {
    Object.defineProperty(req, "query", {
      value: { ...req.query },
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
  next();
});
app.use(mongoSanitize());

// 5. Rate Limiting Apply Karein
app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 6. Static Uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 7. Route Mounts
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

// Health Check
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is healthy and secure" });
});

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
