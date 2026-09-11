import API from "./api";

export const fetchProducts = async (params = {}) => {
  const response = await API.get("/products", { params });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post("/products", productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
