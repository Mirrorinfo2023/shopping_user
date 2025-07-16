// const products = [
//   {
//     name: 'Smart Watch Pro Max',
//     image: '/products/smartwatch.jpg',
//     price: 1799,
//     originalPrice: 2499,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.3,
//     reviews: 120,
//     trusted: true,
//   },
//   {
//     name: 'Wireless Earbuds X',
//     image: '/products/earbuds.jpg',
//     price: 1299,
//     originalPrice: 1599,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.2,
//     reviews: 200,
//     trusted: false,
//   },
//   {
//     name: 'Fitness Band A1',
//     image: '/products/fitness-band.jpg',
//     price: 999,
//     originalPrice: 1399,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.5,
//     reviews: 300,
//     trusted: true,
//   },
//   {
//     name: 'Classic Analog Watch',
//     image: '/products/analog-watch.jpg',
//     price: 799,
//     originalPrice: 999,
//     moreCount: 0,
//     freeDelivery: false,
//     rating: 4.0,
//     reviews: 50,
//     trusted: false,
//   },
//   {
//     name: 'Digital Sports Watch',
//     image: '/products/sports-watch.jpg',
//     price: 1499,
//     originalPrice: 1899,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.1,
//     reviews: 90,
//     trusted: true,
//   },
//   {
//     name: 'Luxury Leather Watch',
//     image: '/products/leather-watch.jpg',
//     price: 2499,
//     originalPrice: 2999,
//     moreCount: 0,
//     freeDelivery: false,
//     rating: 4.7,
//     reviews: 140,
//     trusted: true,
//   },
//   {
//     name: 'Kids Digital Watch',
//     image: '/products/kids-watch.jpg',
//     price: 599,
//     originalPrice: 799,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.0,
//     reviews: 60,
//     trusted: false,
//   },
//   {
//     name: 'Minimalist Analog Watch',
//     image: '/products/minimalist-watch.jpg',
//     price: 899,
//     originalPrice: 1199,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.3,
//     reviews: 130,
//     trusted: true,
//   },
//   {
//     name: 'Stainless Steel Watch',
//     image: '/products/steel-watch.jpg',
//     price: 1599,
//     originalPrice: 2099,
//     moreCount: 0,
//     freeDelivery: false,
//     rating: 4.4,
//     reviews: 180,
//     trusted: false,
//   },
//   {
//     name: 'Smart Ring Tracker',
//     image: '/products/smart-ring.jpg',
//     price: 2199,
//     originalPrice: 2699,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.6,
//     reviews: 240,
//     trusted: true,
//   },
//   {
//     name: 'Hybrid Smart Watch',
//     image: '/products/hybrid-watch.jpg',
//     price: 1899,
//     originalPrice: 2299,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.2,
//     reviews: 110,
//     trusted: false,
//   },
//   {
//     name: 'Bluetooth Neckband Earphones',
//     image: '/products/neckband.jpg',
//     price: 899,
//     originalPrice: 1099,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.1,
//     reviews: 150,
//     trusted: false,
//   },
//   {
//     name: 'Luxury Gold Watch',
//     image: '/products/gold-watch.jpg',
//     price: 3299,
//     originalPrice: 4299,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.8,
//     reviews: 80,
//     trusted: true,
//   },
//   {
//     name: 'Smart Watch for Women',
//     image: '/products/women-smartwatch.jpg',
//     price: 1699,
//     originalPrice: 2199,
//     moreCount: 0,
//     freeDelivery: true,
//     rating: 4.3,
//     reviews: 175,
//     trusted: true,
//   },
//   {
//     name: 'Touch Screen Smart Watch',
//     image: '/products/touchscreen-watch.jpg',
//     price: 1399,
//     originalPrice: 1899,
//     moreCount: 0,
//     freeDelivery: false,
//     rating: 4.0,
//     reviews: 95,
//     trusted: false,
//   },
// ];
'use client';

import React, { useState } from 'react';
import ProductGridCard from '../../../../components/ProductGridCard';
const products = [
  {
    name: 'Smart Watch Pro Max',
    image: '/products/smartwatch.jpg',
    price: 1799,
    originalPrice: 2499,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.3,
    reviews: 120,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Wireless Earbuds X',
    image: '/products/earbuds.jpg',
    price: 1299,
    originalPrice: 1599,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.2,
    reviews: 200,
    trusted: false,
    category: 'Earphones',
  },
  {
    name: 'Fitness Band A1',
    image: '/products/fitness-band.jpg',
    price: 999,
    originalPrice: 1399,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.5,
    reviews: 300,
    trusted: true,
    category: 'Bands',
  },
  {
    name: 'Classic Analog Watch',
    image: '/products/analog-watch.jpg',
    price: 799,
    originalPrice: 999,
    moreCount: 0,
    freeDelivery: false,
    rating: 4.0,
    reviews: 50,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Smart Ring Tracker',
    image: '/products/smart-ring.jpg',
    price: 2199,
    originalPrice: 2699,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.6,
    reviews: 240,
    trusted: true,
    category: 'Wearables',
  },
  {
    name: 'Luxury Gold Watch',
    image: '/products/gold-watch.jpg',
    price: 3299,
    originalPrice: 4299,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.8,
    reviews: 80,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Bluetooth Neckband',
    image: '/products/neckband.jpg',
    price: 899,
    originalPrice: 1099,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.1,
    reviews: 150,
    trusted: false,
    category: 'Earphones',
  },
  {
    name: 'Minimalist Analog Watch',
    image: '/products/minimalist-watch.jpg',
    price: 999,
    originalPrice: 1199,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.3,
    reviews: 130,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Digital Sports Watch',
    image: '/products/sports-watch.jpg',
    price: 1499,
    originalPrice: 1899,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.1,
    reviews: 90,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Smart Watch Women Edition',
    image: '/products/women-smartwatch.jpg',
    price: 1699,
    originalPrice: 2199,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.3,
    reviews: 175,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Touchscreen Smart Watch',
    image: '/products/touchscreen-watch.jpg',
    price: 1399,
    originalPrice: 1899,
    moreCount: 0,
    freeDelivery: false,
    rating: 4.0,
    reviews: 95,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Hybrid Smart Watch',
    image: '/products/hybrid-watch.jpg',
    price: 1899,
    originalPrice: 2299,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.2,
    reviews: 110,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Kids Digital Watch',
    image: '/products/kids-watch.jpg',
    price: 599,
    originalPrice: 799,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.0,
    reviews: 60,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Wireless Gaming Earbuds',
    image: '/products/gaming-earbuds.jpg',
    price: 1499,
    originalPrice: 1999,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.6,
    reviews: 210,
    trusted: true,
    category: 'Earphones',
  },
  {
    name: 'Luxury Leather Watch',
    image: '/products/leather-watch.jpg',
    price: 2599,
    originalPrice: 3099,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.7,
    reviews: 140,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Stainless Steel Watch',
    image: '/products/steel-watch.jpg',
    price: 1599,
    originalPrice: 2099,
    moreCount: 0,
    freeDelivery: false,
    rating: 4.4,
    reviews: 180,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Active Fitness Band',
    image: '/products/fitness-band.jpg',
    price: 799,
    originalPrice: 1199,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.5,
    reviews: 210,
    trusted: true,
    category: 'Bands',
  },
  {
    name: 'Noise Cancelling Earbuds',
    image: '/products/earbuds.jpg',
    price: 1799,
    originalPrice: 2399,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.4,
    reviews: 310,
    trusted: true,
    category: 'Earphones',
  },
  {
    name: 'Kids Smart Watch',
    image: '/products/kids-watch.jpg',
    price: 699,
    originalPrice: 899,
    moreCount: 0,
    freeDelivery: true,
    rating: 3.9,
    reviews: 45,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'Gold Plated Smart Watch',
    image: '/products/gold-watch.jpg',
    price: 3999,
    originalPrice: 4499,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.8,
    reviews: 70,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Slim Fitness Tracker',
    image: '/products/fitness-band.jpg',
    price: 1099,
    originalPrice: 1599,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.2,
    reviews: 190,
    trusted: false,
    category: 'Bands',
  },
  {
    name: 'Classic Leather Strap Watch',
    image: '/products/leather-watch.jpg',
    price: 1299,
    originalPrice: 1599,
    moreCount: 0,
    freeDelivery: false,
    rating: 4.3,
    reviews: 110,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Pro Gaming Earphones',
    image: '/products/gaming-earbuds.jpg',
    price: 1999,
    originalPrice: 2499,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.5,
    reviews: 220,
    trusted: true,
    category: 'Earphones',
  },
  {
    name: 'Fitness Smart Ring',
    image: '/products/smart-ring.jpg',
    price: 2499,
    originalPrice: 2999,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.6,
    reviews: 150,
    trusted: true,
    category: 'Wearables',
  },
  {
    name: 'Elegant Analog Watch',
    image: '/products/analog-watch.jpg',
    price: 1099,
    originalPrice: 1399,
    moreCount: 0,
    freeDelivery: false,
    rating: 4.0,
    reviews: 100,
    trusted: false,
    category: 'Watches',
  },
  {
    name: 'SoundPro Wireless Buds',
    image: '/products/earbuds.jpg',
    price: 1699,
    originalPrice: 1999,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.3,
    reviews: 170,
    trusted: true,
    category: 'Earphones',
  },
  {
    name: 'Women’s Rose Gold Watch',
    image: '/products/women-smartwatch.jpg',
    price: 1899,
    originalPrice: 2399,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.5,
    reviews: 160,
    trusted: true,
    category: 'Watches',
  },
  {
    name: 'Neckband with Bass Boost',
    image: '/products/neckband.jpg',
    price: 999,
    originalPrice: 1299,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.2,
    reviews: 145,
    trusted: false,
    category: 'Earphones',
  },
  {
    name: 'Basic Fitness Band',
    image: '/products/fitness-band.jpg',
    price: 699,
    originalPrice: 899,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.1,
    reviews: 130,
    trusted: false,
    category: 'Bands',
  },
  {
    name: 'Luxury Black Dial Watch',
    image: '/products/steel-watch.jpg',
    price: 1999,
    originalPrice: 2499,
    moreCount: 0,
    freeDelivery: true,
    rating: 4.4,
    reviews: 180,
    trusted: true,
    category: 'Watches',
  }
];

export default function MoreProductsPage() {
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Unique categories for dropdown
  const uniqueCategories = ['all', ...new Set(products.map((p) => p.category))];

  // Filtered and sorted products
  const filteredProducts = products
    .filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (minRating && p.rating < parseFloat(minRating)) return false;
      if (onlyDiscounted && !(p.originalPrice > p.price)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLowHigh') return a.price - b.price;
      if (sortBy === 'priceHighLow') return b.price - a.price;
      if (sortBy === 'ratingHighLow') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Filters */}
     <div className="flex flex-wrap gap-4 items-center mb-6">

  {/* Category Filter */}
  <select
    className="border px-3 py-2 rounded-md text-sm min-w-[150px]"
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
  >
    {uniqueCategories.map((cat) => (
      <option key={cat} value={cat}>
        {cat === 'all' ? 'All Categories' : cat}
      </option>
    ))}
  </select>

  {/* Price Range Filter */}
  <div className="flex items-center gap-2">
    <input
      type="number"
      placeholder="Min"
      className="border px-3 py-2 rounded-md w-[80px] text-sm"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
    />
    <span className="text-gray-500 text-sm">-</span>
    <input
      type="number"
      placeholder="Max"
      className="border px-3 py-2 rounded-md w-[80px] text-sm"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />
  </div>

  {/* Rating Filter */}
  <select
    className="border px-3 py-2 rounded-md text-sm min-w-[120px]"
    value={minRating}
    onChange={(e) => setMinRating(e.target.value)}
  >
    <option value="">Min Rating</option>
    <option value="4.5">4.5 ★</option>
    <option value="4">4.0 ★</option>
    <option value="3.5">3.5 ★</option>
    <option value="3">3.0 ★</option>
  </select>

  {/* Discount Checkbox */}
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={onlyDiscounted}
      onChange={(e) => setOnlyDiscounted(e.target.checked)}
      className="accent-blue-600"
    />
    Discounted Only
  </label>

  {/* Sort By Dropdown */}
  <select
    className="border px-3 py-2 rounded-md text-sm min-w-[150px] ml-auto"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="default">Sort By</option>
    <option value="priceLowHigh">Price: Low to High</option>
    <option value="priceHighLow">Price: High to Low</option>
    <option value="ratingHighLow">Rating: High to Low</option>
  </select>

</div>




     

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductGridCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-12">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
