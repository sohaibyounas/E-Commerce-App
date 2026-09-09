const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Authenticate Token Middleware 
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // "Bearer <TOKEN>" se token extract karein
      token = req.headers.authorization.split(" ")[1];

      // Token verify karein
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret_key_change_in_env",
      );

      // User fetch karein bina password field ke
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User belonging to this token no longer exists",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed or expired",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

// 2. Role-Based Access Control (RBAC) Middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
