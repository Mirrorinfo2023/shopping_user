import ApiService from "@/api/client";

// Create new address
export const createAddress = async (payload) => {
  return await ApiService.post("/addresses/create", payload);
};

// Get address by ID
export const getAddressById = async (id) => {
  return await ApiService.get(`/api/addresses/getbyid/${id}`);
};

// Update address
export const updateAddress = async (payload) => {
  return await ApiService.post("/api/addresses/updateaddress", payload);
};

// Remove address
export const removeAddress = async (id) => {
  return await ApiService.post(`/api/addresses/remove/${id}`);
};
