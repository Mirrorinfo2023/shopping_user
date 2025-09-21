"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const WishlistIcon = ({ productId, personId, onUpdate }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if product is already in wishlist
  const fetchWishlistStatus = useCallback(async () => {
    if (!personId || !productId) return;
    try {
      const res = await axios.get(`https://secure1.mirrorhub.in/api/wishlist/${personId}`);
      if (res.data.success && res.data.product) {
        const productIds = res.data.product.map((p) =>
          typeof p === "object" && p._id ? p._id.toString() : p.toString()
        );
        setIsWishlisted(productIds.includes(productId));
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err.message);
    }
  }, [personId, productId]);

  useEffect(() => {
    fetchWishlistStatus();
  }, [fetchWishlistStatus]);

  // Toggle wishlist
  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigating to product page
    if (!personId || !productId) return;
    setLoading(true);
    try {
      if (isWishlisted) {
        // Remove
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/remove", {
          personId,
          productId,
        });
        setIsWishlisted(false);
      } else {
        // Add
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/add", {
          personId,
          productId,
        });
        setIsWishlisted(true);
      }
      onUpdate?.();
    } catch (err) {
      console.error("Wishlist toggle error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`absolute top-2 right-2 text-xl p-2 rounded-full transition-colors z-10 ${
        isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      aria-label="Toggle Wishlist"
    >
      <FaHeart />
    </button>
  );
};

const ProductGridCard = ({ product, userId = "12345", onUpdate }) => {
  const [imageError, setImageError] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const productId = product?._id || product?.id;
  const productName = product?.productName || product?.name || "Unnamed Product";
  const productImage =
    product?.images?.[0]?.url || product?.image || "/images/default-product.jpg";
  const productPrice = product?.finalPrice || product?.price || 0;
  const originalPrice = product?.price || productPrice;
  const rating = product?.ratings?.average || product?.rating || 0;
  const reviewCount = product?.ratings?.count || product?.reviews || 0;
  const productDescription =
    product?.description || product?.shortDescription || "No description available";

  const discount =
    originalPrice > productPrice
      ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
      : 0;

  const handleImageError = () => setImageError(true);

  // Check if in cart
  const checkCartStatus = useCallback(async () => {
    if (!productId) return;
    try {
      const res = await axios.get(`https://secure1.mirrorhub.in/api/cart/get/${userId}`);
      const data = res.data;
      if (data.success && data.data) {
        const inCart = data.data.cartItems.some(
          (item) => item.productId?._id === productId || item._id === productId
        );
        setIsInCart(inCart);
      }
    } catch (err) {
      console.error("Cart check error:", err);
    }
  }, [productId, userId]);

  useEffect(() => {
    checkCartStatus();
  }, [checkCartStatus]);

 
const handleCartClick = async (e) => {
  e.preventDefault();
  e.stopPropagation(); // prevent navigation
  if (loadingCart || !productId) return;

  setLoadingCart(true);
  try {
    if (isInCart) {
      // Remove from cart
      const res = await axios.post(
        "https://secure1.mirrorhub.in/api/cart/remove",
        { productId, personId: userId },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) setIsInCart(false);
    } else {
      // Add to cart
      const res = await axios.post(
        "https://secure1.mirrorhub.in/api/cart/add",
        { productId, personId: userId, quantity: 1 },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) setIsInCart(true);
    }
    onUpdate?.();
  } catch (err) {
    console.error("Cart update error:", err);
    alert("Cart update failed!");
  } finally {
    setLoadingCart(false);
  }
};

  if (!product || !productId) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
      {/* Wishlist */}
      <WishlistIcon productId={productId} personId={userId} onUpdate={onUpdate} />

      {/* Product Content */}
      <Link href={`/products/${productId}`} className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={imageError ? "/images/default-product.jpg" : productImage}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />

          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}

          {isInCart && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                In Cart
              </span>
            </div>
          )}
        </div>

        <div className="p-3">
          {product?.brand && (
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">
              {product.brand}
            </p>
          )}
          <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 h-10">
            {productName}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{productDescription}</p>

          {rating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-current" : "stroke-current text-gray-300"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                ₹{productPrice.toLocaleString("en-IN")}
              </span>
              {originalPrice > productPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <button
              onClick={handleCartClick}
              disabled={loadingCart}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isInCart
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              } disabled:opacity-50`}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
              {loadingCart ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isInCart ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductGridCard;
