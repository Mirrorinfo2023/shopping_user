'use client';
import React, { useState } from 'react';

const WishlistAdd = ({ productId, personId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddToWishlist = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          personId,
        }),
      });

      const data = await res.json();
      if (res.status) {
        setMessage(' Added to wishlist!');
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
        onClick={handleAddToWishlist}
        disabled={loading}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add to Wishlist'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default WishlistAdd;
