"use client";
import { useEffect, useState } from "react";
import ProductGridCard from "@/components/ProductGridCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useStaticData, setUseStaticData] = useState(false);

  // Static product data (fallback)
  const staticProducts = [
    {
      id: "688b450473f4d3f8248c58b2",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      name: "Samsung Galaxy S24 Ultra",
      price: 106249.15,
      originalPrice: 124999,
      discount: 15,
      moreCount: 2,
      freeDelivery: true,
      rating: 4.5,
      reviews: 128,
      trusted: true,
      description: "Flagship Samsung phone with Snapdragon 8 Gen 3 and 512GB storage.",
      brand: "Samsung"
    },
    {
      id: "static-2",
      image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&h=300&fit=crop",
      name: "Apple Watch Series 9",
      price: 45999.08,
      originalPrice: 49999,
      discount: 8,
      moreCount: 1,
      freeDelivery: true,
      rating: 4.3,
      reviews: 89,
      trusted: true,
      description: "Apple Watch Series 9 with 45mm case, GPS, and new S9 chip.",
      brand: "Apple"
    },
    {
      id: "static-3",
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
      name: "boAt Airdopes 441",
      price: 1999.20,
      originalPrice: 2499,
      discount: 20,
      moreCount: 0,
      freeDelivery: true,
      rating: 4.0,
      reviews: 256,
      trusted: true,
      description: "boAt Airdopes 441 True Wireless Earbuds with IPX7 and 30H playback.",
      brand: "boAt"
    },
    {
      id: "static-4",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      name: "Sony WH-1000XM5",
      price: 28999.00,
      originalPrice: 32999,
      discount: 12,
      moreCount: 3,
      freeDelivery: true,
      rating: 4.8,
      reviews: 342,
      trusted: true,
      description: "Industry-leading noise canceling wireless headphones.",
      brand: "Sony"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        const response = await fetch("/api/products/basic");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.products)) {
          const mappedProducts = data.products.map((p) => ({
            id: p._id,
            image: p.thumbnail || "/images/default-product.jpg",
            name: p.productName,
            price: p.finalPrice,
            originalPrice: p.price || null,
            discount: p.discount || 0,
            moreCount: 0,
            freeDelivery: true,
            rating: p.ratings?.average || 0,
            reviews: p.ratings?.count || 0,
            trusted: true,
            description: p.description,
            brand: p.brand
          }));
          setProducts(mappedProducts);
          setUseStaticData(false);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("API Fetch Error, using static data:", err);
        setError(err.message);
        setProducts(staticProducts);
        setUseStaticData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading State with Shimmer Effect
  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header with Data Source Indicator */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        {useStaticData ? (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Using Demo Data
          </span>
        ) : (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Live Data
          </span>
        )}
      </div>

      {/* Error Banner (if any) */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Could not connect to API. Showing demo products. Error: {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Check back later for new arrivals.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Data Source Toggle Button */}
          {/* <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (useStaticData) {
                  // Try to reload API data
                  window.location.reload();
                } else {
                  // Switch to static data
                  setProducts(staticProducts);
                  setUseStaticData(true);
                  setError("Manually switched to demo data");
                }
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {useStaticData ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Live Data Again
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Use Demo Data
                </>
              )}
            </button>
          </div> */}
        </>
      )}
    </div>
  );
}