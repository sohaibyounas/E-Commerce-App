const Category = require("../models/Category");

const createCategory = async (categoryData) => {
  if (!categoryData.slug && categoryData.name) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  return await Category.create(categoryData);
};

const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const updateCategory = async (id, categoryData) => {
  if (categoryData.name && !categoryData.slug) {
    categoryData.slug = categoryData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  return await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
