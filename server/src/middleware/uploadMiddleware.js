const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed extensions & mime patterns
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const fileExt = path.extname(file.originalname).toLowerCase();

  const isExtensionValid = allowedExtensions.includes(fileExt);
  const isMimeValid =
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/octet-stream"; // Postman fallback case

  if (isExtensionValid || isMimeValid) {
    return cb(null, true);
  }

  const error = new Error(
    "Invalid file type. Only JPEG, PNG and WEBP images are allowed.",
  );
  error.statusCode = 400;
  cb(error, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
