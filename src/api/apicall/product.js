import ApiService from "@/api/client";

// Get all products
export const fetchProducts = async () => {
  const res = await ApiService.get("products/basic");
  if (res.status) {
    return res.data?.data || res.data || [];
  }
  return [];
};

// Get single product by id
export const fetchProductById = async (id) => {
  const res = await ApiService.get(`products/${id}`);
  if (res.status) {
    return res.data;
  }
  return null;
};

// Create product
export const createProduct = async (payload) => {
  return await ApiService.post("products/create", payload);
};

// Update product
export const updateProduct = async (id, payload) => {
  return await ApiService.put(`products/${id}`, payload);
};

// Delete product
export const deleteProduct = async (id) => {
  return await ApiService.post(`products/${id}`);
};
