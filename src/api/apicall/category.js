// src/services/CategoryService.js
import ApiService from "@/api/client";
import API_PATHS from "@/constants/api_paths";

const CategoryService = {
  getAllCategories: async () => {
    return await ApiService.get(API_PATHS.GET_ALL_CATEGORIES);
  },

  getCategoryById: async (catId) => {
    return await ApiService.get(API_PATHS.GET_CATEGORY_BY_ID(catId));
  },


};

export default CategoryService;
