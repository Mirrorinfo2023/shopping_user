"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

// 🔹 Reusable Fallback Image
const FallbackImage = ({ src, alt, fill = false, width, height, className }) => {
  const [imgSrc, setImgSrc] = useState(src || "/app_logo.png");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      unoptimized
      onError={() => setImgSrc("/logo.jpg")}
    />
  );
};

// 🔹 Wishlist Button
const WishlistIcon = ({ productId, personId, onUpdate }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!personId || !productId) return;
      try {
        const res = await axios.get(
          `https://secure1.mirrorhub.in/api/wishlist/${personId}`
        );
        if (res.data?.product?.some((p) => p._id === productId)) {
          setIsWishlisted(true);
        }
      } catch (err) {
        console.error("Wishlist fetch error:", err.message);
      }
    };
    fetchWishlist();
  }, [personId, productId]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!personId || !productId) return;

    try {
      if (isWishlisted) {
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/remove", {
          personId,
          productId,
        });
        setIsWishlisted(false);
      } else {
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/add", {
          personId,
          productId,
        });
        setIsWishlisted(true);
      }
      onUpdate?.();
    } catch (err) {
      console.error("Wishlist error:", err.message);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`absolute top-2 right-2 text-xl p-2 rounded-full transition-colors z-10 ${
        isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      aria-label="Toggle Wishlist"
    >
      <FaHeart />
    </button>
  );
};

// 🔹 Product Card
const ProductGridCard = ({ product, userId = "12345", onUpdate }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0]?.url || "/logo.jpg"
  );

  const productId = product?._id || product?.id;
  const productName = product?.productName || "Unnamed Product";
  const productImages = product?.images || [];
  const productPrice = product?.finalPrice || 0;
  const productDescription = product?.description || "No description available";

  if (!product || !productId) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
      {/* Wishlist */}
      <WishlistIcon
        productId={productId}
        personId={userId}
        onUpdate={onUpdate}
      />

      {/* Product Content */}
      <Link href={`/products/${productId}`} className="block">
        {/* Main Image */}
        <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden">
          <FallbackImage
            src={selectedImage}
            alt={productName}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thumbnails */}
        {/* {productImages.length > 1 && (
          <div className="flex gap-2 justify-center p-2">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImage(img.url);
                }}
                className={`w-12 h-12 rounded border ${
                  selectedImage === img.url
                    ? "border-blue-500"
                    : "border-gray-300"
                } overflow-hidden`}
              >
                <FallbackImage
                  src={img.url}
                  alt={`thumb-${idx}`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )} */}

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 h-10">
            {productName}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {productDescription}
          </p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-gray-900">
              ₹{productPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductGridCard;
