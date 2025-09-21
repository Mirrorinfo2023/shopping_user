'use client';
import React, { useState } from 'react';
import axios from 'axios';
const WishlistAdd = ({ productId, personId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

 const handleAddToWishlist = async () => {
  setLoading(true);
  setMessage('');

  try {
    const res = await axios.post('https://secure1.mirrorhub.in/api/wishlist/add', {
      productId,
      personId,
    });

    if (res.status === 200 && res.data.success) {
      setMessage('Added to wishlist!');
    } else {
      setMessage(`Failed: ${res.data.message || 'Unknown error'}`);
    }
  } catch (err) {
    console.error('Wishlist Error:', err);
    setMessage('Error: ' + (err.response?.data?.message || err.message));
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
