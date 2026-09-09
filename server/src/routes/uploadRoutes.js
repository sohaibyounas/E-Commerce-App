const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/upload (Admin only)
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Relative path jo database mein store hoga
    const imagePath = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: imagePath,
    });
  },
);

module.exports = router;
