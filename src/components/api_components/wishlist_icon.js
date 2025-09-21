"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const WishlistIcon = ({ productId, personId }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Step 1: Check if product already in wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`https://secure1.mirrorhub.in/api/wishlist/${personId}`);
        if (res.data.success && res.data.product) {
          // Convert all IDs to string for comparison
          const productIds = res.data.product.map((p) =>
            (typeof p === "object" && p._id ? p._id : p).toString()
          );
          setIsWishlisted(productIds.includes(productId.toString()));
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err.message);
      }
    };

    if (personId && productId) fetchWishlist();
  }, [personId, productId]);

  // ✅ Step 2 & 3: Add or Remove wishlist item
  const toggleWishlist = async () => {
    if (!personId || !productId) return;

    setLoading(true);
    try {
      if (isWishlisted) {
        // Remove only this product
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/remove", {
          productId,
          personId,
        });
        setIsWishlisted(false);
      } else {
        // Add this product
        await axios.post("https://secure1.mirrorhub.in/api/wishlist/add", {
          productId,
          personId,
        });
        setIsWishlisted(true);
      }
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
      aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <FaHeart />
    </button>
  );
};

export default WishlistIcon;
