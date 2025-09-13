import ApiService from "@/api/client";

// Get wishlist by personId
export const fetchWishlist = async (personId) => {
  return await ApiService.get(`wishlist/${personId}`);
};

// Add to wishlist
export const addToWishlist = async (payload) => {
  return await ApiService.post("wishlist/add", payload);
};

// Remove from wishlist (optional if API exists)
export const removeFromWishlist = async (wishlistItemId) => {
  return await ApiService.post(`wishlist/remove/${wishlistItemId}`);
};
