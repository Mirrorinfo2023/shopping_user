"use client";

import React, { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

// -----------------------------
// Mock Categories
// -----------------------------
const categories = [
  { id: 1, name: "Technology", image: "https://via.placeholder.com/80/0000FF/FFFFFF?text=T" },
  { id: 2, name: "Health", image: "https://via.placeholder.com/80/FF0000/FFFFFF?text=H" },
  { id: 3, name: "Travel", image: "https://via.placeholder.com/80/00FF00/FFFFFF?text=Tr" },
  { id: 4, name: "Education", image: "https://via.placeholder.com/80/FFA500/FFFFFF?text=E" },
  { id: 5, name: "Sports", image: "https://via.placeholder.com/80/800080/FFFFFF?text=S" },
];

// -----------------------------
// Mock Products
// -----------------------------
const products = [
  { id: 1, categoryId: 1, name: "Laptop", price: 60000, originalPrice: 70000, image: "https://via.placeholder.com/150" },
  { id: 2, categoryId: 1, name: "Smartphone", price: 35000, originalPrice: 40000, image: "https://via.placeholder.com/150" },
  { id: 3, categoryId: 2, name: "Vitamins", price: 800, originalPrice: 1000, image: "https://via.placeholder.com/150" },
  { id: 4, categoryId: 2, name: "Yoga Mat", price: 1200, originalPrice: 1500, image: "https://via.placeholder.com/150" },
  { id: 5, categoryId: 3, name: "Backpack", price: 2500, originalPrice: 3000, image: "https://via.placeholder.com/150" },
  { id: 6, categoryId: 3, name: "Travel Bag", price: 4000, originalPrice: 4500, image: "https://via.placeholder.com/150" },
  { id: 7, categoryId: 4, name: "Notebook", price: 150, originalPrice: 200, image: "https://via.placeholder.com/150" },
  { id: 8, categoryId: 4, name: "Pen Set", price: 300, originalPrice: 350, image: "https://via.placeholder.com/150" },
  { id: 9, categoryId: 5, name: "Football", price: 1200, originalPrice: 1500, image: "https://via.placeholder.com/150" },
  { id: 10, categoryId: 5, name: "Tennis Racket", price: 5000, originalPrice: 5500, image: "https://via.placeholder.com/150" },
];

// -----------------------------
// Product Card Component
// -----------------------------

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
      
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tr-lg shadow z-10">
          {discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-2 right-2 text-xl p-2 rounded-full transition-colors z-10 ${
          isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
        aria-label="Add to Wishlist"
      >
        <FaHeart />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/images/default-product.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center space-x-2">
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
          <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => setIsInCart(!isInCart)}
          className={`mt-3 w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
            isInCart
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          <FaShoppingCart />
          <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};



// -----------------------------
// Main ViewCategories Component
// -----------------------------
const ViewCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products
    .filter((product) => product.categoryId === selectedCategory)
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 pt-24 bg-gray-100 min-h-screen">
      {/* Categories */}
      <div className="flex space-x-4 overflow-x-auto pb-4 mb-6 snap-x snap-mandatory">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center cursor-pointer transition-transform transform snap-start ${
              selectedCategory === category.id ? "scale-110" : "scale-100"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div
              className={`w-16 h-16 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-md ${
                selectedCategory === category.id
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm mt-1 font-medium">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategories;
