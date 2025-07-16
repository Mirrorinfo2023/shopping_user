"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import "../globals.css";
import Link from 'next/link';

const suggestedProducts = [
  {
    name: "Men's Polo T-Shirt",
    type: "tshirt",
    image: 'https://images.unsplash.com/photo-1585386959984-a4155229a19a?auto=format&fit=crop&w=400&q=60',
    price: 499,
    originalPrice: 799,
    rating: 4.2,
    material: "Cotton",
    size: "M, L, XL",
  },
  {
    name: "Samsung Galaxy M13",
    type: "mobile",
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=60',
    price: 10999,
    originalPrice: 12999,
    rating: 4.5,
    battery: "6000mAh",
    storage: "128GB",
  },
  {
    name: "Boat Wave Call 2",
    type: "watch",
    image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=400&q=60',
    price: 1499,
    originalPrice: 2999,
    rating: 4.0,
    display: "1.69\" AMOLED",
    features: ["Heart Rate", "Sleep Tracker"],
  },
  {
    name: "Slim Fit Cotton Shirt",
    type: "tshirt",
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=60',
    price: 699,
    originalPrice: 999,
    rating: 4.4,
    material: "Linen Blend",
    size: "L, XL, XXL",
  },
];

const ProductPage = () => {
  const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603415526960-fb4d996345c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155229a19a?auto=format&fit=crop&w=800&q=80',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const renderProductCard = (product) => {
    switch (product.type) {
      case 'tshirt':
        return (
          <div className="border p-3 rounded hover:shadow-md">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-48 object-cover rounded" />
            <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
            <p className="text-xs text-gray-500">Material: {product.material}</p>
            <p className="text-xs text-gray-500">Sizes: {product.size}</p>
            <p className="text-sm text-gray-600 mt-1">₹{product.price} <s className="text-red-400 text-xs ml-1">₹{product.originalPrice}</s></p>
            <p className="text-xs text-yellow-600">★ {product.rating}</p>
          </div>
        );

      case 'mobile':
        return (
          <div className="border p-3 rounded hover:shadow-md">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-48 object-cover rounded" />
            <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
            <p className="text-xs text-gray-500">Battery: {product.battery}</p>
            <p className="text-xs text-gray-500">Storage: {product.storage}</p>
            <p className="text-sm text-gray-600 mt-1">₹{product.price} <s className="text-red-400 text-xs ml-1">₹{product.originalPrice}</s></p>
            <p className="text-xs text-yellow-600">★ {product.rating}</p>
          </div>
        );

      case 'watch':
        return (
          <div className="border p-3 rounded hover:shadow-md">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-48 object-cover rounded" />
            <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
            <p className="text-xs text-gray-500">Display: {product.display}</p>
            <p className="text-xs text-gray-500">Features: {product.features.join(', ')}</p>
            <p className="text-sm text-gray-600 mt-1">₹{product.price} <s className="text-red-400 text-xs ml-1">₹{product.originalPrice}</s></p>
            <p className="text-xs text-yellow-600">★ {product.rating}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Main Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <div className="border rounded-lg overflow-hidden">
            <Image src={selectedImage} alt="Selected" width={600} height={400} className="w-full object-cover" />
          </div>
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                width={80}
                height={80}
                className={`rounded object-cover border w-20 h-20 cursor-pointer ${selectedImage === img ? 'ring-2 ring-blue-600' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">SOLSTICE</h2>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Men Solid Round Neck Elastane Red T-Shirt</h1>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-blue-700">₹292</span>
            <span className="text-sm text-gray-400 line-through">₹999</span>
            <span className="text-blue-600 text-sm font-medium">70% off</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">★ 4.1 | 490 ratings & 31 reviews</p>

          {/* Colors */}
          <div className="mb-4">
            <p className="font-semibold text-sm mb-1">Available Colors</p>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <Image key={i} src={img} alt="Color" width={40} height={40} className="w-10 h-10 rounded-full border object-cover" />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <p className="font-semibold text-sm mb-1">Select Size</p>
            <div className="flex gap-3">
              {['M', 'L', 'XL', 'XXL'].map((size) => (
                <button key={size} className="px-4 py-1 border text-sm rounded hover:bg-blue-100">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add to Cart</button>
            <Link href="/pages/shopping/buy_now">
              <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
                Buy Now
              </button>
            </Link>         
            </div>

          {/* Offers */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Available Offers</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              <li>10% Cashback on Axis Bank UPI</li>
              <li>5% Cashback on Flipkart Axis Card</li>
              <li>10% off on BOB EMI Transactions</li>
              <li>10% off up to ₹1250 on IDFC EMI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3">Product Details</h2>
        <p className="text-sm text-gray-700 mb-3">
          This round neck elastane t-shirt by SOLSTICE is designed for all-day comfort. Made from breathable cotton blend fabric with a hint of stretch for mobility and ease.
        </p>
        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
          <li>Material: 95% Cotton, 5% Elastane</li>
          <li>Fit: Slim Fit</li>
          <li>Neck: Round Neck</li>
          <li>Sleeve: Half Sleeve</li>
          <li>Care: Machine Wash Cold, Do Not Bleach</li>
        </ul>
      </div>

      {/* Suggested Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {suggestedProducts.map((prod, index) => (
            <React.Fragment key={index}>
              {renderProductCard(prod)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
