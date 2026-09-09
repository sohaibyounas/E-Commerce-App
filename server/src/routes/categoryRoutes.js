const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, authorize("admin"), createCategory); // Admin only

module.exports = router;
