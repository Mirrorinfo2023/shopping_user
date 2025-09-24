'use client';
import React, { useEffect, useRef, useState } from 'react';

const featureDeals = [
  {
    id: 1,
    title: 'Wireless Headphones',
    image: '/images/headphone.jpg',
    price: '₹1,499',
    originalPrice: '₹2,999',
    offer: '50% OFF',
  },
  {
    id: 2,
    title: 'Smart Watch',
    image: '/images/smartwatch.jpg',
    price: '₹1,999',
    originalPrice: '₹3,999',
    offer: '50% OFF',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    image: '/images/speaker.jpg',
    price: '₹999',
    originalPrice: '₹1,999',
    offer: '50% OFF',
  },
  {
    id: 4,
    title: 'Power Bank',
    image: '/images/powerbank.jpg',
    price: '₹899',
    originalPrice: '₹1,799',
    offer: '50% OFF',
  },
  {
    id: 5,
    title: 'Earbuds',
    image: '/images/earbuds.jpg',
    price: '₹1,299',
    originalPrice: '₹2,599',
    offer: '50% OFF',
  },
];

export default function FeatureDeals() {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);

  // Automatically scroll to next set every 3 second
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) =>
        prev + 1 >= featureDeals.length ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleDeals = featureDeals
    .slice(startIndex, startIndex + 3)
    .concat(
      startIndex + 3 > featureDeals.length
        ? featureDeals.slice(0, (startIndex + 3) % featureDeals.length)
        : []
    );

  return (
    <section className="py-6 px-4 md:px-10 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Featured Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-500">
        {visibleDeals.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-1 truncate">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-green-600">
                  {item.price}
                </span>
                <span className="text-sm line-through text-gray-500">
                  {item.originalPrice}
                </span>
              </div>
              <span className="text-xs text-orange-500 font-medium">
                {item.offer}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
