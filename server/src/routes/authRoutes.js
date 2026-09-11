const express = require("express");
const { register, login, getMe, verifyEmail } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
