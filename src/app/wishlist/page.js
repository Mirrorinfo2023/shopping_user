'use client';

import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

const initialWishlist = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    price: '₹2,499',
    image: '/product1.jpg',
  },
  {
    id: 2,
    title: 'Stylish Smartwatch',
    price: '₹1,799',
    image: '/product2.jpg',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    price: '₹999',
    image: '/product3.jpg',
  },
];

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    alert(`Moved item ${id} to cart`);
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>
  
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">Your wishlist is empty 😢</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.title}</h3>
                <p className="text-blue-600 font-bold text-base">{item.price}</p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => moveToCart(item.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
