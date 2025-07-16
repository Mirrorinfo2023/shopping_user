import axios from "axios";
import { API_CONFIG } from "./config";

// methods are defined here
const token = localStorage.getItem("token");

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});
let defConfig = {
  headers: {
    Authorization: token,
  },
};
// Generic request methods
export const apiRequest = {
  get: (url, params = {}, config = { ...defConfig }) => apiClient.get(url, { ...config, params }),
  post: (url, data = {}, config = { ...defConfig }) => apiClient.post(url, data, config),
  put: (url, data = {}, config = { ...defConfig }) => apiClient.put(url, data, config),
  patch: (url, data = {}, config = { ...defConfig }) => apiClient.patch(url, data, config),
  delete: (url, config = { ...defConfig }) => apiClient.delete(url, config),
};

export default apiClient;
