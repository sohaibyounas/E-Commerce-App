const rateLimit = require("express-rate-limit");

// General API rate limiter (15 minutes mein max 100 requests per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

// Auth rate limiter (Brute-force protection: 15 minutes mein max 10 login/register attempts)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication attempts, please try again after 15 minutes",
  },
});

module.exports = { apiLimiter, authLimiter };
