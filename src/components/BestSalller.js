"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function BestSellersSection({ products = [] }) {
  const [wishlist, setWishlist] = useState({});
  const [visibleCount, setVisibleCount] = useState(8);
  const [cartQuantities, setCartQuantities] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "{}");
    setWishlist(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (id) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const renderStars = (rating = 0) =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );

  const getDiscount = (price, originalPrice) =>
    originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="my-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Best Sellers</h2>
       <Link
              href="/viewall-product"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 group"
          >
            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              aria-label={wishlist[product.id] ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {wishlist[product.id] ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>

            {/* Flag Badge */}
            <span className="absolute top-0 left-0 w-20 bg-yellow-500 text-white text-xs font-bold py-1 text-center shadow flag-ribbon z-10">
              Best Seller
            </span>

            {/* Out of Stock */}
            {!product.inStock && (
              <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            )}

            {/* Product Image */}
            <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={160}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                loading="lazy"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center text-xs gap-1 mb-2">{renderStars(product.rating || 4)}</div>

            {/* Price + Cart */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xl font-bold text-blue-700">₹{product.price}</span>
                {product.originalPrice && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                    <span className="text-green-600 font-semibold">
                      {getDiscount(product.price, product.originalPrice)}% OFF
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {cartQuantities[product.id] > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    {cartQuantities[product.id]}
                  </span>
                )}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className={`p-2 rounded-lg transition text-white ${
                    product.inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
}
