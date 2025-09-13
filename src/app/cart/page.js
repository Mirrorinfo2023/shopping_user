'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSpinner, FaExclamationTriangle, FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function Cart({ userId = "12345" }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [clearingCart, setClearingCart] = useState(false);

  // Mock data for fallback
  const mockCartItems = [
    {
      _id: "68c3eb50d0d59661b973a608",
      productId: {
        _id: "68b92bf4dcf049943c146448",
        productName: "Xiaomi 13 Pro"
      },
      name: "Xiaomi 13 Pro",
      variant: "Color: White / Storage: 256GB",
      quantity: 1,
      price: 74999,
      discount: 10,
      finalPrice: 67499.1,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      seller: "Xiaomi Official Store",
      size: "256GB"
    },
    {
      _id: "68c3f30fd0d59661b973a688",
      name: "Black Shoes",
      variant: "Size 9",
      quantity: 2,
      price: 1200,
      discount: 10,
      finalPrice: 1080,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      seller: "Footwear Hub",
      size: "UK 9"
    }
  ];

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      try {
        const response = await fetch(`/api/cart/get/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setCartItems(data.data.cartItems || []);
            return;
          }
        }
        throw new Error('Failed to fetch cart');
      } catch (apiError) {
        console.warn('API fetch failed, using mock data:', apiError);
        throw apiError;
      }
      
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart. Using demo data.');
      setCartItems(mockCartItems);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    router.push('/checkout');
  };

  const handleQtyChange = async (itemId, change) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(itemId));
      
      const item = cartItems.find(item => item._id === itemId);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + change);
      
      // Update local state immediately for better UX
      setCartItems(prev => 
        prev.map(item => 
          item._id === itemId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );

      // Try to update via API
      try {
        const response = await fetch('/api/cart/update', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: item.productId?._id || item._id,
            quantity: newQuantity
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to update quantity');
        }
      } catch (updateError) {
        console.warn('API update failed, using local state:', updateError);
        // Keep the local change even if API fails
      }
      
    } catch (err) {
      console.error('Error changing quantity:', err);
      // Revert local change on error
      fetchCartItems();
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeItem = async (itemId) => {
    try {
      setUpdatingItems(prev => new Set(prev).add(itemId));
      
      const item = cartItems.find(item => item._id === itemId);
      if (!item) return;

      // Remove from local state immediately
      setCartItems(prev => prev.filter(item => item._id !== itemId));
      
      // Try to remove via API
      try {
        const response = await fetch('/api/cart/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: item.productId?._id || item._id
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to remove item');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to remove item');
        }
      } catch (removeError) {
        console.warn('API remove failed:', removeError);
        // Keep the local change even if API fails
      }
      
    } catch (err) {
      console.error('Error removing item:', err);
      // Revert local change on error
      fetchCartItems();
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      setClearingCart(true);
      
      // Clear local state immediately
      setCartItems([]);
      
      // Try to clear via API
      try {
        const response = await fetch('/api/cart/clear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to clear cart');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to clear cart');
        }

        alert('Cart cleared successfully!');
      } catch (clearError) {
        console.warn('API clear failed:', clearError);
        alert('Cart cleared locally, but there was an issue with the server.');
      }
      
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Failed to clear cart. Please try again.');
      // Revert local change on error
      fetchCartItems();
    } finally {
      setClearingCart(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.finalPrice || item.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-10 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Details */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-800">
              🛒 Product Details ({cartItems.length} items)
            </h2>
            
            <div className="flex items-center gap-2">
              {error && (
                <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1">
                  <FaExclamationTriangle className="text-yellow-500 mr-1 text-sm" />
                  <span className="text-yellow-700 text-xs">Demo data</span>
                </div>
              )}
              
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  disabled={clearingCart}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {clearingCart ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8">
                <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some items to your cart to continue shopping</p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              const isUpdating = updatingItems.has(item._id);
              const itemPrice = item.finalPrice || item.price;
              const itemTotal = itemPrice * item.quantity;
              const productName = item.productId?.productName || item.name;
              
              return (
                <div
                  key={item._id}
                  className="border rounded p-4 flex gap-4 items-start mb-4 hover:shadow transition relative"
                >
                  {isUpdating && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                      <FaSpinner className="animate-spin text-2xl text-blue-600" />
                    </div>
                  )}
                  
                  <img
                    src={item.image}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">{productName}</h3>
                    </div>
                    
                    {item.variant && (
                      <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                    )}
                    
                    <p className="text-gray-600 mt-1 text-sm">
                      All issue easy returns
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQtyChange(item._id, -1)}
                        disabled={isUpdating || item.quantity <= 1}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(item._id, 1)}
                        disabled={isUpdating}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item._id)}
                      disabled={isUpdating}
                      className="mt-2 text-sm text-red-500 hover:underline disabled:opacity-50 flex items-center gap-1"
                    >
                      <FaTrash className="text-xs" /> REMOVE
                    </button>

                    <div className="mt-2 font-bold text-lg text-orange-600">
                      ₹{itemTotal.toLocaleString('en-IN')}
                      {item.discount > 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-right text-gray-600 whitespace-nowrap">
                    <p>Sold by: {item.seller || 'Unknown Seller'}</p>
                    <p className="text-green-600 font-medium">Free Delivery</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-white p-4 rounded shadow h-fit border border-orange-200">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-orange-600">
            Price Details ({cartItems.length} Items)
          </h2>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Total Product Price</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            
            {cartItems.some(item => item.discount > 0) && (
              <div className="flex justify-between text-green-600">
                <span>Total Discount</span>
                <span>- ₹{cartItems.reduce((acc, item) => 
                  acc + ((item.price - (item.finalPrice || item.price)) * item.quantity), 0
                ).toLocaleString('en-IN')}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>
            
            <hr />
            
            <div className="flex justify-between font-bold text-base text-lg">
              <span>Total Amount</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            Clicking on Continue will not deduct any money
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={cartItems.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-2.5 mt-4 rounded font-semibold transition-colors"
          >
            {cartItems.length === 0 ? 'Cart is Empty' : 'Continue to Checkout'}
          </button>

          <div className="flex items-center gap-2 mt-4 text-xs bg-gray-100 p-2 rounded">
            <img
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/delivery.png"
              alt="Delivery Safety"
              className="w-10 h-10"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.marginLeft = '0';
              }}
            />
            <div>
              <p className="font-semibold text-blue-800">Your Safety, Our Priority</p>
              <p className="text-gray-600">
                We ensure your package is safe at every point of contact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}