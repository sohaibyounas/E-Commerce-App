const Product = require("../models/Product");
const APIFeatures = require("../utils/apiFeatures");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

// Query parameters ke sath pagination, search, sort handle karna
const getProducts = async (queryString) => {
  const totalProducts = await Product.countDocuments();

  const features = new APIFeatures(Product.find(), queryString)
    .search()
    .filter()
    .sort()
    .paginate();

  const products = await features.query
    .populate("category", "name slug")
    .select("-__v");

  const page = parseInt(queryString.page, 10) || 1;
  const limit = parseInt(queryString.limit, 10) || 10;

  return {
    total: totalProducts,
    page,
    limit,
    count: products.length,
    products,
  };
};

const getProductById = async (id) => {
  return await Product.findById(id)
    .populate("category", "name description slug")
    .select("-__v");
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).populate("category", "name slug");
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
