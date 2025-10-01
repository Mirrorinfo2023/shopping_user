"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaStar, FaFire } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import Link from "next/link";

// -----------------------------
// Enhanced Product Card Component
// -----------------------------
const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discount = product.discount || 0;
  const rating = product.rating || 4.2;
  const isTrending = product.isTrending || Math.random() > 0.7;

  return (
    <Link href={`/products/${product._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group-hover:translate-y-[-4px] border border-gray-100">
        {/* Top Badges Container */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
          {/* Left Badges */}
          <div className="flex flex-col gap-2">
            {discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <FaFire className="text-xs" />
                {discount}% OFF
              </div>
            )}
            {isTrending && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <IoSparkles className="text-xs" />
                Trending
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              isWishlisted 
                ? "bg-red-500 text-white" 
                : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
            }`}
            aria-label="Add to Wishlist"
          >
            <FaHeart className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
          )}
          <img
            src={product.thumbnail || "/app_logo.png"}
            alt={product.productName}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-110`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Rating Overlay */}
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <FaStar className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {product.productName}
          </h3>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.finalPrice || product.price}
              </span>
              {product.finalPrice < product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Save ₹{Math.round(product.price - (product.finalPrice || product.price))}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsInCart(!isInCart);
            }}
            className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              isInCart
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg"
            }`}
          >
            <FaShoppingCart />
            <span>{isInCart ? "Added to Cart" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

// -----------------------------
// Enhanced Main Component
// -----------------------------
const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://secure1.mirrorhub.in/api/catagory/getallcategories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setSelectedCategory(data.categories[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://secure1.mirrorhub.in/api/products/filter?categoryId=${selectedCategory}`
        );
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Filter by search term
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategoryData = categories.find(cat => cat._id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-12">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-40 pt-24 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategoryData ? selectedCategoryData.categoryName : "Products"}
          </h1>
          <p className="text-gray-600">Discover amazing products in this category</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className={`relative max-w-2xl mx-auto transition-all duration-300 ${
            isSearchFocused ? 'scale-105' : ''
          }`}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaSearch className={`text-gray-400 transition-colors ${
                isSearchFocused ? 'text-blue-500' : ''
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-full pl-12 pr-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-300/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-sm transition-all duration-300 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`flex flex-col items-center min-w-[100px] transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category._id ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl border-3 flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 ${
                    selectedCategory === category._id
                      ? "border-blue-500 shadow-blue-200 bg-blue-50 scale-110"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <img
                    src={category.icon}
                    alt={category.categoryName}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className={`text-sm font-medium mt-3 transition-colors ${
                  selectedCategory === category._id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600"
                }`}>
                  {category.categoryName}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaSearch className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No products matching "${searchTerm}"`
                    : "No products available in this category"
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCategories;