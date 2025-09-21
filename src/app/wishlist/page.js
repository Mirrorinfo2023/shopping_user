'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaSpinner,
  FaExclamationTriangle,
} from 'react-icons/fa';
import axios from 'axios';

export default function WishlistScreen({ userId = "12345" }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingItems, setProcessingItems] = useState(new Set());

  // ✅ Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://secure1.mirrorhub.in/api/wishlist/${userId}`,
        { headers: { Accept: 'application/json' } }
      );

      if (response.status === 200 && response.data.success) {
        setWishlist(response.data.product || []);
      } else {
        throw new Error('Failed to fetch wishlist');
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('Failed to load wishlist.');
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // ✅ Remove from wishlist API
  const removeFromWishlist = async (productId) => {
    try {
      setProcessingItems((prev) => new Set(prev).add(productId));
      await axios.post("https://secure1.mirrorhub.in/api/wishlist/remove", {
        productId,
        personId: userId,
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Failed to remove item from wishlist");
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // ✅ Move to cart API
  const moveToCart = async (product) => {
    try {
      setProcessingItems((prev) => new Set(prev).add(product._id));

      // 1. Add to cart API
      await axios.post("https://secure1.mirrorhub.in/api/cart/add", {
        productId: product._id,
        personId: userId,
        quantity: 1,
      });

      // 2. Remove from wishlist
      await removeFromWishlist(product._id);

      alert("Item moved to cart successfully!");
    } catch (err) {
      console.error("Error moving to cart:", err);
      alert("Failed to move item to cart");
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-10 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Wishlist</h2>
        {error && (
          <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <span className="text-yellow-700 text-sm">{error}</span>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <FaHeart className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Save your favorite items here for later!
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-500">
            Showing {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const isProcessing = processingItems.has(item._id);

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-md transition relative"
                >
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                      <FaSpinner className="animate-spin text-2xl text-blue-600" />
                    </div>
                  )}

                  <div className="relative w-full h-48 bg-gray-100">
                    {item.images && item.images.length > 0 ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaHeart className="text-3xl text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">
                      {item.productName}
                    </h3>
                    <p className="text-blue-600 font-bold text-base">
                      ₹
                      {item.finalPrice?.toLocaleString('en-IN') || 'N/A'}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => moveToCart(item)}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaShoppingCart /> Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        disabled={isProcessing}
                        className="text-red-500 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove from wishlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
