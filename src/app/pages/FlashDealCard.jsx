'use client';
import React, { useEffect, useState } from 'react';

const calculateTimeLeft = () => {
  const futureDate = new Date('2027-01-01T00:00:00');
  const now = new Date();
  const diff = futureDate - now;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export default function FlashDealCard() {
  // Start with zeros so SSR and client match
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // calculate immediately on client
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f3f6fd] p-6 rounded-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-blue-800">FLASH DEAL</h2>
          <p className="text-sm text-gray-600">
            Hurry Up! The offer is limited. Grab while it lasts
          </p>
        </div>
        <a
          href="/viewall-product"
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          View All
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Timer Box */}
        <div className="bg-white px-4 py-3 rounded-md shadow w-fit flex items-center space-x-2">
          {['days', 'hours', 'minutes', 'seconds'].map((key) => (
            <div key={key} className="text-center">
              <div className="bg-blue-700 text-white px-3 py-2 rounded-md font-bold text-lg w-16">
                {String(timeLeft[key]).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600 capitalize mt-1">{key}</div>
            </div>
          ))}
        </div>

        {/* Product Cards */}
        <div className="flex gap-4 overflow-x-auto">
          {[
            {
              title: 'iPhone 14 Pro Max',
              price: '$1,149.00',
              image:
                'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg',
            },
            {
              title: 'Beauty Jelly Lipstick',
              price: '$32.00',
              image:
                'https://m.media-amazon.com/images/I/51DZZCyNm8L.jpg',
            },
            {
              title: 'Leather Ladies Bag',
              price: '$15.00',
              rating: 2,
              image:
                'https://m.media-amazon.com/images/I/61Ao8R8BxFL._AC_UY1100_.jpg',
            },
            {
              title: 'Samsung S24 Ultra',
              price: '$1,150.00',
              image:
                'https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-md p-3 shadow w-44 shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 object-contain mx-auto"
              />
              <h3 className="text-sm font-semibold mt-2 truncate">
                {item.title}
              </h3>
              {item.rating && (
                <div className="text-orange-500 text-sm mt-1">
                  {'★'.repeat(item.rating)}
                  {'☆'.repeat(5 - item.rating)}{' '}
                  <span className="text-gray-400 text-xs">(2)</span>
                </div>
              )}
              <p className="text-md font-bold text-gray-700 mt-1">
                {item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
