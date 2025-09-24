'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function FlashSale({ products = [] }) {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const endTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
        return;
      }

      const hours = String(Math.floor((distance / (1000 * 60 * 60)))).padStart(2, '0');
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer(); // initial run

    return () => clearInterval(interval);
  }, []);

  if (!products.length) {
    return (
      <section className="my-10 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2 font-sans">Flash Sale - Limited Time!</h2>
        <p>No products available right now.</p>
      </section>
    );
  }

  return (
    <section className="my-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 font-sans">Flash Sale - Limited Time!</h2>
        <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded font-mono">
          Ends in: {timeLeft}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
