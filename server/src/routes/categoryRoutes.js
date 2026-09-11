const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin-only routes
router.post("/", protect, authorize("admin"), createCategory);
router.patch("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
