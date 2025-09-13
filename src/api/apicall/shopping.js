import { apiRequest } from "./client";


export const getCategories = (id) => apiRequest.get(`/catagory/getcategories/${id}`);
export const getAllCategories = () => apiRequest.get("/catagory/getallcategories");
export const getCategoryById = (id) => apiRequest.get(`/categories/${id}`);
export const deleteCategoryById = (id) => apiRequest.delete(`/catagory/deletecategories/${id}`);

// 🔹 Products
export const getProducts = () => apiRequest.get("/products");
export const getBasicProducts = () => apiRequest.get("/products/basic");
export const getProductById = (id) => apiRequest.get(`/products/${id}`);
export const createProduct = (productData) => apiRequest.post("/products/create", productData);
export const updateProduct = (id, productData) => apiRequest.put(`/products/${id}`, productData);
export const deleteProduct = (id) => apiRequest.delete(`/products/${id}`);
export const deleteProductById = (id) => apiRequest.delete(`/products/delete/${id}`);
export const filterProducts = (filters) => apiRequest.get(`/products/filter`, { params: filters });


export const getProductsByCategory = (categoryId) =>
  apiRequest.get(`/products?category=${categoryId}`);

// 🔹 Wishlist
export const getWishlist = (personId) => apiRequest.get(`/wishlist/${personId}`);
export const addToWishlist = (personId) =>
  apiRequest.post(`/wishlist/add`, { personId });
export const removeFromWishlist = (personId, productId) =>
  apiRequest.delete(`/wishlist/${personId}/${productId}`);

// 🔹 Cart
export const getCart = (personId) => apiRequest.get(`/cart/get/${personId}`);
export const clearCart = (personId) => apiRequest.delete(`/cart/clear/${personId}`);
export const addToCart = (personId, productId, qty) =>
  apiRequest.post("/cart/add", { personId, productId, qty });
export const updateCartItem = (personId, productId, qty) =>
  apiRequest.put(`/cart/${personId}/${productId}`, { qty });
export const removeFromCart = (personId, productId) =>
  apiRequest.delete(`/cart/${personId}/${productId}`);

// 🔹 Orders
export const placeOrder = (orderData) => apiRequest.post("/orders/create", orderData);
export const getAllOrders = () => apiRequest.get("/orders/list");
export const getOrderDetails = (id) => apiRequest.get(`/orders/details/${id}`);
export const updateOrderStatus = (id, status) => apiRequest.put(`/orders/update-status/${id}`, { status });
export const cancelOrder = (id) => apiRequest.delete(`/orders/cancel/${id}`);
export const returnOrder = (id) => apiRequest.post(`/orders/return/${id}`);
export const getOrders = () => apiRequest.get("/orders");
export const getOrderById = (id) => apiRequest.get(`/orders/${id}`);
export const createOrder = (orderData) => apiRequest.post("/orders", orderData);


//REVIEW 
export const createReview = (reviewData) => apiRequest.post("/reviews/create", reviewData);
export const getAllReviews = () => apiRequest.get("/reviews/getallreviews");
export const getProductReview = (productId) => apiRequest.get(`/reviews/getproductreview/${productId}`);
export const updateReview = (reviewId, reviewData) => apiRequest.put(`/reviews/updatereview/${reviewId}`, reviewData);


//VENDORS
export const createVendor = (vendorData) => apiRequest.post("/vendors/create", vendorData);
export const getAllVendors = () => apiRequest.get("/vendors/getall");
export const getVendorById = (id) => apiRequest.get(`/vendor/get/${id}`);
export const updateVendor = (id, vendorData) => apiRequest.put(`/vendor/update/${id}`, vendorData);
export const deleteVendor = (id) => apiRequest.delete(`/vendor/delete/${id}`);
export const vendorLogin = (credentials) => apiRequest.post("/vendor/login", credentials);
export const createWithdrawalRequest = (withdrawalData) => apiRequest.post("/withdrawals/request", withdrawalData);
export const updateWithdrawalRequest = (id, withdrawalData) => apiRequest.put(`/withdrawals/${id}/update`, withdrawalData);
export const getAllWithdrawalRequests = () => apiRequest.get("/withdrawals/all");
export const getVendorWithdrawalRequests = (vendorId) => apiRequest.get(`/withdrawals/vendor/${vendorId}`);


//ADDRESS
export const createAddress = (addressData) => apiRequest.post("/addresses/create", addressData);
export const getAllAddresses = () => apiRequest.get("/addresses/getall");
export const getAddressById = (id) => apiRequest.get(`/addresses/getbyid/${id}`);
export const updateAddress = (id, addressData) => apiRequest.put(`/addresses/updateaddress`, addressData);
export const removeAddress = (id) => apiRequest.delete(`/addresses/remove/${id}`);
export const deleteAddress = (id) => apiRequest.delete(`/addresses/delete/${id}`);



//TRANSACTION
export const createTransaction = (transactionData) => apiRequest.post("/transactions/create", transactionData);