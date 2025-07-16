import { apiRequest } from "../client";
import { ENDPOINTS } from "../config";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
};

export const addProduct = async (data) => {
  try {
    const response = await apiRequest.post(ENDPOINTS.PRODUCT.CREATE, data);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Please check your credentials.",
    };
  }
};
