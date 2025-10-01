"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaStar, FaHeart, FaTag, FaShoppingCart } from "react-icons/fa";

const STATIC_PERSON_ID = "12345";

// ======================= Product Card =======================
const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productId = product?._id || product?.id;
  const rating = product.ratings?.average || 0;
  const discount = product.discount || 0;
  const finalPrice = product.finalPrice || product.price;

  // Fetch wishlist and set if product is already wishlisted
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `https://secure1.mirrorhub.in/api/wishlist/${STATIC_PERSON_ID}`
        );

        const wishlistedProducts = res.data?.wishlist?.map(
          (item) => item.productId || item._id
        );

        if (wishlistedProducts?.includes(productId)) {
          setIsWishlisted(true);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (productId) fetchWishlist();
  }, [productId]);

  // Add or remove from wishlist
  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const url = isWishlisted
        ? "https://secure1.mirrorhub.in/api/wishlist/remove"
        : "https://secure1.mirrorhub.in/api/wishlist/add";

      await axios.post(url, {
        productId,
        personId: STATIC_PERSON_ID,
      });

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <Link
      href={`/products/${productId}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-100 block relative"
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <FaTag className="text-xs" />
              {discount}% OFF
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <FaHeart className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <img
          src={product.images?.[0]?.url || "/logo.jpg"}
          alt={product.productName}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => (e.currentTarget.src = "/logo.jpg")}
        />

        {/* Rating */}
        {rating > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
            <FaStar className="text-yellow-400" />
            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {product.productName}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {product.shortDescription || product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{finalPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ======================= Category Section =======================
const CategorySection = ({ category, products }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          {category.categoryName}
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

// ======================= Skeleton Card =======================
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// ======================= Main Component =======================
export default function CategoriesWithProducts() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://secure1.mirrorhub.in/api/catagory/getallcategories"
      );
      if (res.data.success && res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    }
  };

  const fetchProductsForCategories = async (cats) => {
    const productsMap = {};
    try {
      await Promise.all(
        cats.map(async (cat) => {
          try {
            const res = await axios.get(
              `https://secure1.mirrorhub.in/api/products/filter?categoryId=${cat._id}`
            );
            if (res.data.success && res.data.products?.length > 0) {
              productsMap[cat._id] = res.data.products.slice(0, 8);
            }
          } catch (err) {
            console.error(`Error fetching products for ${cat.categoryName}:`, err);
          }
        })
      );
      setCategoryProducts(productsMap);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProductsForCategories(categories);
    }
  }, [categories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map(
          (cat) =>
            categoryProducts[cat._id] && (
              <CategorySection
                key={cat._id}
                category={cat}
                products={categoryProducts[cat._id]}
              />
            )
        )}

        {/* Empty State */}
        {Object.keys(categoryProducts).length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-6">
              We're adding new products soon. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
