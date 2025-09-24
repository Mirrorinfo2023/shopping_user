// components/PromoSection.jsx
import React from "react";
import Image from 'next/image';
export default function PromoSection({ products = [] }) {
  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">Promotions</h2>

      <div className="grid grid-cols-2 gap-3">
        {products.map((item, index) => (
          <div key={index} className="text-center">
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={200}
              className="rounded-md"
            />
            <p className="mt-2">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

