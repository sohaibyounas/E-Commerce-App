const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "fallback_secret_key_change_in_env",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

module.exports = generateToken;
