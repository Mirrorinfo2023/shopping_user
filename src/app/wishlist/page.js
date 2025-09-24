'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowLeft,
  FaStar,
  FaEye,
  FaCheck,
} from 'react-icons/fa';
import axios from 'axios';

export default function WishlistScreen({ userId = "12345" }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingItems, setProcessingItems] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');

  // Show success message temporarily
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

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
      setError('Failed to load wishlist. Please try again later.');
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const removeFromWishlist = async (productId, productName) => {
    try {
      setProcessingItems((prev) => new Set(prev).add(productId));
      await axios.post("https://secure1.mirrorhub.in/api/wishlist/remove", {
        productId,
        personId: userId,
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      showSuccess(`"${productName}" removed from wishlist`);
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      setError('Failed to remove item from wishlist');
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

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
      await removeFromWishlist(product._id, product.productName);
      showSuccess(`"${product.productName}" moved to cart successfully!`);
    } catch (err) {
      console.error("Error moving to cart:", err);
      setError('Failed to move item to cart');
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-gray-200 rounded-full w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="w-full h-60 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-8"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4 md:px-8">
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-0 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <FaCheck className="text-white" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-white"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">Your favorite items saved for later</p>
            </div>
          </div>
          
          {wishlist.length > 0 && (
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Oops! Something went wrong</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-50 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-4xl text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Start building your collection! Save items you love by clicking the heart icon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => (window.location.href = '/')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Start Shopping
                </button>
                <button
                  onClick={fetchWishlist}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => {
                const isProcessing = processingItems.has(item._id);
                const hasDiscount = item.originalPrice && item.finalPrice < item.originalPrice;
                const discountPercent = hasDiscount 
                  ? Math.round(((item.originalPrice - item.finalPrice) / item.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={item._id}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                  >
                    {isProcessing && (
                      <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-2xl">
                        <div className="text-center">
                          <FaSpinner className="animate-spin text-3xl text-blue-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Processing...</p>
                        </div>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative w-full h-60 bg-gray-50 overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <>
                          <Image
                            src={item.images[0].url}
                            alt={item.productName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          {/* View Quick Action */}
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                            <FaEye className="text-gray-600 text-sm" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaHeart className="text-4xl text-gray-300" />
                        </div>
                      )}
                      
                      {/* Discount Badge */}
                      {hasDiscount && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description || 'No description available'}
                      </p>
                      
                   

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{item.finalPrice?.toLocaleString('en-IN') || 'N/A'}
                        </span>
                        {hasDiscount && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice?.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => moveToCart(item)}
                          disabled={isProcessing}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                        >
                          <FaShoppingCart className="group-hover/btn:scale-110 transition-transform" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item._id, item.productName)}
                          disabled={isProcessing}
                          className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove from wishlist"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = '/')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  // Implement move all to cart functionality
                  wishlist.forEach(item => moveToCart(item));
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Move All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}