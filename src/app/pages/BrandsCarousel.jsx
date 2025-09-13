"use client";
import React, { useEffect, useRef } from "react";

const brands = [
  { name: "Electrical", image: "/brands/electrical.png" },
  { name: "Electronic Store", image: "/brands/electronic.png" },
  { name: "Global Tech", image: "/brands/global.png" },
  { name: "UniBridge", image: "/brands/unibridge.png" },
  { name: "OIL HEROES", image: "/brands/oil.png" },
  { name: "Tech Connect", image: "/brands/tech.png" },
  { name: "OTOSPEEDOS", image: "/brands/speedos.png" },
  { name: "POWER", image: "/brands/power.png" },
  { name: "Revolutionize", image: "/brands/revo.png" },
  { name: "BORCELL", image: "/brands/borcell.png" },
  { name: "TINNEERMAN", image: "/brands/tinner.png" },
  { name: "FRANCISCO", image: "/brands/fran.png" },
];

export default function BrandsCarousel() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Clone all child nodes for infinite scroll
    const clonedNodes = Array.from(container.children).map((child) =>
      child.cloneNode(true)
    );
    clonedNodes.forEach((node) => container.appendChild(node));

    let scrollX = 0;
    const speed = 0.5; // Adjust scroll speed here

    const autoScroll = () => {
      scrollX += speed;
      if (scrollX >= container.scrollWidth / 2) {
        scrollX = 0;
      }
      container.scrollLeft = scrollX;
      requestAnimationFrame(autoScroll);
    };

    requestAnimationFrame(autoScroll);
  }, []);

  return (
    <div className="w-full p-4 bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Brands</h2>
        <a href="/viewall-product" className="text-sm text-blue-600 hover:underline">
          View All &rarr;
        </a>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 whitespace-nowrap overflow-x-hidden no-scrollbar py-2"
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-20 h-20 rounded-full border p-2 flex items-center justify-center shadow bg-white"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
