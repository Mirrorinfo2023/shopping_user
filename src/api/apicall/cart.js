import ApiService from "@/api/client";

// Add item(s) to cart
export const addToCart = async (payload) => {
  return await ApiService.post("cart/add", payload);
};

// Get cart by userId
export const getCart = async (userId) => {
  return await ApiService.get(`cart/get/${userId}`);
};

// Remove item from cart
export const removeFromCart = async (payload) => {
  return await ApiService.post("cart/remove", payload);
};

// Clear entire cart
export const clearCart = async (payload) => {
  return await ApiService.post("cart/clear", payload);
};
