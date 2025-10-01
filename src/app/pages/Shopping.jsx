'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import routes from '@/constants/routes';

import Header from '../../components/Header';
import FlashSale from '../../components/FlashSale';
import ProductGridCard from '../../components/ProductGridCard';
import HeroBanner from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import PromoSection from '../../components/promotion/PromoSection';
import BestSellersSection from '../../components/BestSalller';
import { bestSellerProducts } from '../data/bestSellerProducts';
import {
  homeStyleProducts,
  seasonalProducts,
  gadgetProducts,
  sampleProducts,
} from '../data/promotiondata';
import FeatureDeals from './FeatureDeals';
import FlashDealCard from '@/app/pages/FlashDealCard';
import BrandsCarousel from '@/app/pages/BrandsCarousel';
import { featuredProducts, flashSaleProducts } from '../data/shoppingdata';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import CategoryService from '@/api/apicall/category';
import ProductList from '@/components/api_components/products';
import ProductByCategories from '@/components/api_components/categories/categories_by_id';


export default function Shopping() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: { perView: 4, spacing: 12 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      setInterval(() => s.next(), 5000);
    },
    breakpoints: {
      '(max-width: 640px)': { slides: { perView: 2.5, spacing: 10 } },
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          'https://secure1.mirrorhub.in/api/catagory/getallcategories'
        );

        if (!res.status) throw new Error('Failed to fetch categories');

        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className="bg-gray-50 min-h-screen pt-1 text-gray-800 rounded-t-3xl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Slider */}
        <section className="my-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Category</h2>
            <Link
              href="/view-categories"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
          </div>

          {loading ? (
            // Shimmer Effect
            <div>
              <div className="keen-slider">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide flex flex-col items-center text-center px-2"
                  >
                    <div className="bg-gray-200 rounded-full p-3 w-[80px] h-[80px] flex items-center justify-center overflow-hidden animate-pulse">
                      <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mt-2 w-16 animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Shimmer Pagination Dots */}
              <div className="flex justify-center mt-4 gap-2">
                {[...Array(8)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : categories.length > 0 ? (
            <div>
              <div ref={sliderRef} className="keen-slider">
                {categories.map((category, index) => (
                  <div
                    key={category._id || index}
                    className="keen-slider__slide flex flex-col items-center text-center px-2"
                  >
                    <div className="bg-pink-100 rounded-full w-[80px] h-[80px] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110">
                      <img
                        src={category.icon ? category.icon : '/app_logo.png'}
                        alt={category.categoryName || 'Category'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-2">
                      {category.categoryName}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 gap-2">
                {categories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => slider?.moveToIdx?.(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide
                        ? 'bg-blue-600 w-3 h-3'
                        : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </section>


        {/* Hero Banner */}
        <div className="mt-8">
          <HeroBanner />
        </div>

        <ProductList />

        <FlashDealCard />

        {/* <div>
          <BestSellersSection products={bestSellerProducts} />
        </div> */}
        <ProductByCategories />

        {/* Featured Products */}
        {/* <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link
              href="/viewall-product"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section> */}

        <BrandsCarousel />
        {/* <FeatureDeals /> */}

        {/* Flash Sale */}
        {/* <section className="my-12">
          <FlashSale products={flashSaleProducts} />
        </section> */}

        {/* Promotions */}
        <section className="my-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <PromoSection title="Make Your Home Stylish" products={homeStyleProducts} />
            <PromoSection title="Season’s Top Picks" products={seasonalProducts} />
            <PromoSection title="Trending Gadgets & Appliances" products={gadgetProducts} />
          </div>
        </section>

        {/* Extra Featured Products */}
        {/* <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">More Featured Products</h2>
            <Link
              href="/viewall-product"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
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
        </section> */}

      </main>
    </div>
  );
}
