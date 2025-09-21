"use client";
import { useEffect, useState } from "react";
import ProductGridCard from "@/components/ProductGridCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useStaticData, setUseStaticData] = useState(false);

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://secure1.mirrorhub.in/api/products/basic");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

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
            description: p.description || "",
            brand: p.brand || "",
          }));
          setProducts(mappedProducts);
          setUseStaticData(false);
        } else {
          throw new Error("Invalid API data format");
        }
      } catch (err) {
        console.error("Fetch error, using static products:", err);
        setError(err.message);
        setProducts(staticProducts);
        setUseStaticData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading Shimmer
  if (loading) {
    return (
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="flex justify-between items-center mt-2">
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-8 bg-gray-200 rounded w-20" />
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
      
      </div>



      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
