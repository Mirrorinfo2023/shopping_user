'use client';
import React, { useState } from 'react';

const CartAdd = ({ userId, product }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Prepare cart item payload
      const cartItem = {
        productId: product._id,
        vendorId: product.vendorId || '', // make sure vendorId exists
        name: product.productName,
        variant: product.variant || '', // e.g., "Color: Gray / Storage: 512GB"
        quantity: product.quantity || 1,
        price: product.price,
        discount: product.discount || 0,
        finalPrice: product.finalPrice,
        image: product.thumbnail || (product.images?.[0]?.url || '')
      };

      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          cartItems: [cartItem],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Added to cart successfully!');
      } else {
        setMessage(`Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default CartAdd;
