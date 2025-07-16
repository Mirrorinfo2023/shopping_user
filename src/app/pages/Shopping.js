'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import FlashSale from '../../components/FlashSale';
import ProductGridCard from '../../components/ProductGridCard';
import HeroBanner from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import PromoSection from '../../components/promotion/PromoSection';
import { FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import BestSellersSection from '../../components/BestSalller';
import { bestSellerProducts } from '../data/bestSellerProducts';
import {
  homeStyleProducts,
  seasonalProducts,
  gadgetProducts,
  Productcategories,
  sampleProducts,
} from '../../app/data/promotiondata';

import {
  featuredProducts,
  flashSaleProducts,
} from '../../app/data/shoppingdata';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function Shopping() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const [sliderInstanceRef, slider] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      perView: 4,
      spacing: 12,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setInterval(() => slider.next(), 5000);
    },
    breakpoints: {
      '(max-width: 640px)': {
        slides: { perView: 2.5, spacing: 10 },
      },
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-1 text-gray-800 rounded-t-3xl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Slider */}
        <section className="my-10">
          <h2 className="text-xl font-bold mb-3">Shop by Category</h2>

          <div>
            <div ref={sliderInstanceRef} className="keen-slider">
              {Productcategories.map((category, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex flex-col items-center text-center px-2"
                >
                  <div className="bg-pink-100 rounded-full p-3 w-[80px] h-[80px] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2">{category.title}</p>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {Productcategories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => slider?.moveToIdx?.(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-blue-600 w-3 h-3' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Hero Banner */}
        <div className="mt-8">
          <HeroBanner />
        </div>
              
  <div>
      <BestSellersSection products={bestSellerProducts} />
    </div>
     

        {/* Featured Products */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>

        {/* Flash Sale */}
        <section className="my-12">
          <FlashSale products={flashSaleProducts} />
        </section>

        {/* Promotions */}
        <section className="my-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <PromoSection title="Make Your Home Stylish" products={homeStyleProducts} />
            <PromoSection title="Season’s Top Picks" products={seasonalProducts} />
            <PromoSection title="Trending Gadgets & Appliances" products={gadgetProducts} />
          </div>
        </section>

        {/* Recommended */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended for You</h2>
            <Link href="/pages/shopping/moreproduct">
              <span className="text-sm text-blue-600 hover:underline cursor-pointer">View All</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sampleProducts.map((product, idx) => (
              <ProductGridCard key={idx} product={product} />
            ))}
          </div>
        </section>

        {/* Extra Featured Products (Optional) */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">More Featured Products</h2>
            <a href="#" className="text-blue-600 hover:underline text-sm">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Link
                href="/products"
                key={index}
                className="block hover:scale-[1.02] transition-transform"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
