import ApiService from "@/api/client";

// Create Order
export const createOrder = async (payload) => {
  return await ApiService.post("orders/create", payload);
};

// Get Order Details by ID
export const fetchOrderDetails = async (orderId) => {
  return await ApiService.get(`orders/details/${orderId}`);
};

// Cancel Order by ID
export const cancelOrder = async (orderId) => {
  return await ApiService.post(`orders/cancel/${orderId}`);
};
