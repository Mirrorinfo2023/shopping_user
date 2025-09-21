"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

// -----------------------------
// Product Card Component
// -----------------------------
const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const discount = product.discount || 0;

  return (
    <Link href={`/products/${product._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tr-lg shadow z-10">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
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
            src={product.thumbnail || "/images/default-product.jpg"}
            alt={product.productName}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 text-center">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.productName}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-center justify-center space-x-2">
            {product.finalPrice < product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              ₹{product.finalPrice || product.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsInCart(!isInCart);
            }}
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
    </Link>
  );
};

// -----------------------------
// Main ViewCategories Component
// -----------------------------
const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://secure1.mirrorhub.in/api/catagory/getallcategories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setSelectedCategory(data.categories[0]._id); // default pehli category
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

  return (
    <div className="p-6 pt-24 bg-gray-100 min-h-screen">
      {/* Categories */}
      <div className="flex space-x-4 overflow-x-auto pb-4 mb-6 snap-x snap-mandatory">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`flex flex-col items-center cursor-pointer transition-transform transform snap-start ${
              selectedCategory === category._id ? "scale-110" : "scale-100"
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            <div
              className={`w-16 h-16 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-md ${
                selectedCategory === category._id
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300"
              }`}
            >
              <img
                src={category.icon}
                alt={category.categoryName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm mt-1 font-medium">
              {category.categoryName}
            </span>
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

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewCategories;
