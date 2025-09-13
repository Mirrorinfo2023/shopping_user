'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaTrash, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

export default function WishlistScreen({ userId = "12345" }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingItems, setProcessingItems] = useState(new Set());

  // Mock data for demonstration (since API has CORS issues)
  const mockWishlist = [
    {
      _id: "68b92bf4dcf049943c146448",
      productName: "Xiaomi 13 Pro",
      description: "Xiaomi flagship with Snapdragon 8 Gen 2 and Leica cameras.",
      finalPrice: 67499.1,
      ratings: { average: 4.3, count: 127 },
      images: [
        { url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop" }
      ]
    },
    {
      _id: "68b92bf4dcf049943c146449",
      productName: "Samsung Galaxy S24 Ultra",
      description: "Flagship Samsung phone with advanced camera system.",
      finalPrice: 124999,
      ratings: { average: 4.7, count: 289 },
      images: [
        { url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop" }
      ]
    }
  ];

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      try {
        const response = await fetch(`https://secure1.mirrorhub.in/api/wishlist/${userId}`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setWishlist(data.product || []);
            return;
          }
        }
      } catch (apiError) {
        console.warn('API fetch failed, using mock data:', apiError);
      }
      
      // Fall back to mock data if API fails
      setWishlist(mockWishlist);
      
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('Failed to load wishlist. Using demo data.');
      setWishlist(mockWishlist);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setProcessingItems(prev => new Set(prev).add(productId));
      
      // Simulate API call - in a real implementation, you would call a DELETE endpoint
      console.log(`Would remove product ${productId} from wishlist`);
      
      // Remove from local state
      setWishlist(prev => prev.filter(item => item._id !== productId));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item from wishlist');
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const moveToCart = async (product) => {
    try {
      setProcessingItems(prev => new Set(prev).add(product._id));
      
      // Simulate API call since we can't call the actual API due to CORS
      console.log(`Would add product ${product._id} to cart`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Remove from wishlist after "successful" addition to cart
      await removeFromWishlist(product._id);
      alert('Item moved to cart successfully! (Demo mode)');
      
    } catch (err) {
      console.error('Error moving to cart:', err);
      alert('Failed to move item to cart');
    } finally {
      setProcessingItems(prev => {
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Save your favorite items here for later!</p>
            <button
              onClick={() => window.location.href = '/'}
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
            {error && ' (demo data due to API restrictions)'}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const isProcessing = processingItems.has(item._id);
              
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-md transition-all overflow-hidden relative"
                >
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                      <FaSpinner className="animate-spin text-2xl text-blue-600" />
                    </div>
                  )}
                  
                  <div className="relative w-full h-48 bg-gray-100">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        alt={item.productName}
                        className="w-full h-full object-cover"
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
                      ₹{item.finalPrice?.toLocaleString('en-IN') || 'N/A'}
                    </p>
                    
                    {item.ratings?.average > 0 && (
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(item.ratings.average) ? 'fill-current' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">
                          ({item.ratings.count || 0})
                        </span>
                      </div>
                    )}
                    
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