"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CartAdd from '@/components/api_components/addtocart'; // Adjust the path according to your folder structure

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [useStaticData, setUseStaticData] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ show: false, x: 0, y: 0 });

  const userId = "12345"; 
  const staticProducts = {
    "688b450473f4d3f8248c58b2": {
      ratings: { average: 4.5, count: 128 },
      _id: "688b450473f4d3f8248c58b2",
      sku: "SGS24U-512GB-GRY",
      productName: "Samsung Galaxy S24 Ultra",
      description: "Experience the ultimate in smartphone technology with the Samsung Galaxy S24 Ultra. Featuring a revolutionary 200MP camera system, the most powerful Snapdragon 8 Gen 3 processor, and an intelligent AI-powered experience that adapts to your needs. The stunning 6.8-inch Dynamic AMOLED 2X display with 120Hz refresh rate offers an immersive viewing experience, while the titanium frame provides premium durability.",
      shortDescription: "Galaxy S24 Ultra 512GB Gray - The Ultimate Smartphone",
      images: [
        {
          url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop",
          alt: "Galaxy S24 Ultra Front View",
          _id: "688b450473f4d3f8248c58b3"
        },
        {
          url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
          alt: "Galaxy S24 Ultra Back View",
          _id: "688b450473f4d3f8248c58b4"
        },
        {
          url: "https://images.unsplash.com/photo-1556659545-ec5c1c8c0606?w=800&h=600&fit=crop",
          alt: "Galaxy S24 Ultra Side View",
          _id: "688b450473f4d3f8248c58c4"
        },
        {
          url: "https://images.unsplash.com/photo-1616343930864-5d41a02f2c2a?w=800&h=600&fit=crop",
          alt: "Galaxy S24 Ultra Camera Closeup",
          _id: "688b450473f4d3f8248c58c5"
        }
      ],
      thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      brand: "Samsung",
      price: 124999,
      discount: 15,
      finalPrice: 106249.15,
      currency: "INR",
      quantity: 100,
      stockStatus: "in_stock",
      tags: ["smartphone", "android", "samsung", "flagship"],
      variants: [
        { variantName: "Color", value: "Titanium Gray", additionalPrice: 0, _id: "688b450473f4d3f8248c58b5" },
        { variantName: "Color", value: "Titanium Black", additionalPrice: 0, _id: "688b450473f4d3f8248c58c6" },
        { variantName: "Color", value: "Titanium Violet", additionalPrice: 2000, _id: "688b450473f4d3f8248c58c7" },
        { variantName: "Storage", value: "256GB", additionalPrice: 0, _id: "688b450473f4d3f8248c58b6" },
        { variantName: "Storage", value: "512GB", additionalPrice: 3000, _id: "688b450473f4d3f8248c58c8" },
        { variantName: "Storage", value: "1TB", additionalPrice: 8000, _id: "688b450473f4d3f8248c58c9" }
      ],
      attributes: [
        { key: "Processor", value: "Snapdragon 8 Gen 3", _id: "688b450473f4d3f8248c58b7" },
        { key: "Battery", value: "5000mAh", _id: "688b450473f4d3f8248c58b8" },
        { key: "Camera", value: "200MP Quad Camera", _id: "688b450473f4d3f8248c58b9" },
        { key: "Display", value: "6.8 inch Dynamic AMOLED", _id: "688b450473f4d3f8248c58ba" },
        { key: "RAM", value: "12GB", _id: "688b450473f4d3f8248c58bb" },
        { key: "Operating System", value: "Android 14", _id: "688b450473f4d3f8248c58bc" },
        { key: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3", _id: "688b450473f4d3f8248c58bd" },
        { key: "Water Resistance", value: "IP68", _id: "688b450473f4d3f8248c58be" }
      ],
      isActive: true,
      isFeatured: true,
      shippingInfo: {
        freeShipping: true,
        deliveryTime: "2-3 business days",
        returnPolicy: "30 days returnable"
      }
    }
  };

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/products/${id}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
          setSelectedImage(
            data.product.thumbnail || data.product.images?.[0]?.url
          );
          setUseStaticData(false);

          // Initialize selected variants
          if (data.product.variants) {
            const initialVariants = {};
            data.product.variants.forEach(variant => {
              if (!initialVariants[variant.variantName]) {
                initialVariants[variant.variantName] = variant.value;
              }
            });
            setSelectedVariants(initialVariants);
          }
        } else {
          throw new Error("Product not found in API");
        }
      } catch (err) {
        console.error("Error fetching product:", err);

        // Fallback to static data if available
        if (staticProducts[id]) {
          const productData = staticProducts[id];
          setProduct(productData);
          setSelectedImage(
            productData.thumbnail || productData.images?.[0]?.url
          );
          setUseStaticData(true);
          setError("Using demo data: " + err.message);

          // Initialize selected variants for static data
          if (productData.variants) {
            const initialVariants = {};
            productData.variants.forEach(variant => {
              if (!initialVariants[variant.variantName]) {
                initialVariants[variant.variantName] = variant.value;
              }
            });
            setSelectedVariants(initialVariants);
          }
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleImageNavigation = (direction) => {
    if (!product?.images?.length) return;

    if (direction === 'next') {
      setCurrentImageIndex(prev =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex(prev =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
    setSelectedImage(product.images[currentImageIndex].url);
  };

  const handleVariantSelect = (variantName, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;

    let total = product.finalPrice;

    // Add additional prices from selected variants
    if (product.variants) {
      product.variants.forEach(variant => {
        if (selectedVariants[variant.variantName] === variant.value) {
          total += variant.additionalPrice;
        }
      });
    }

    return total * quantity;
  };

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ show: true, x, y });
  };

  const hideZoom = () => {
    setZoomPosition({ show: false, x: 0, y: 0 });
  };

  // Group variants by type
  const groupedVariants = {};
  if (product?.variants) {
    product.variants.forEach(variant => {
      if (!groupedVariants[variant.variantName]) {
        groupedVariants[variant.variantName] = [];
      }
      groupedVariants[variant.variantName].push(variant);
    });
  }

  // Loading State with Enhanced Shimmer Effect
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Breadcrumb Shimmer */}
          <div className="flex space-x-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Image Section Shimmer */}
            <div className="relative">
              <div className="w-full aspect-square bg-gray-200 rounded-xl"></div>
              <div className="flex gap-3 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>

            {/* Details Section Shimmer */}
            <div className="space-y-6">
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>

              <div className="h-10 bg-gray-200 rounded w-1/3"></div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>

              <div className="h-0.5 bg-gray-200"></div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded-md"></div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="flex gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded-md w-20"></div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded-md w-32"></div>
                <div className="h-12 bg-gray-200 rounded-md flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State (when no static data available)
  if (error && !product) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error loading product</h3>
          <p className="text-red-600">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <div className="bg-gray-50 rounded-xl p-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Product not found</h3>
          <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Data Source Indicator */}
      {useStaticData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center">
          <svg className="w-5 h-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          <span className="text-yellow-700 text-sm">Showing demo product data. {error}</span>
        </div>
      )}



      <div className="grid md:grid-cols-2 gap-10 pt-15">
        {/* Image Section */}
        <div className="space-y-4">
          <div
            className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md cursor-zoom-in"
          // onMouseMove={handleZoomImage}
          // onMouseLeave={hideZoom}
          >
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage}
                  alt={product.productName}
                  fill
                  className="object-contain"
                  unoptimized
                />
                {zoomPosition.show && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background: `url(${selectedImage}) no-repeat`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                      pointerEvents: 'none'
                    }}
                  />
                )}

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                      onClick={() => handleImageNavigation('prev')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                      onClick={() => handleImageNavigation('next')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Wishlist Button */}
                <button
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'
                    }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <div
                  key={img._id}
                  className={`relative flex-shrink-0 w-20 h-20 border rounded-md overflow-hidden cursor-pointer transition-all ${selectedImage === img.url
                      ? 'ring-2 ring-blue-500 border-blue-500'
                      : 'hover:ring-2 hover:ring-blue-300'
                    }`}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setCurrentImageIndex(index);
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productName}</h1>
                <p className="text-gray-600">{product.shortDescription}</p>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.floor(product.ratings?.average || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {product.ratings?.average || 0}/5
                </span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{product.ratings?.count || 0} reviews</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="p-5 bg-gray-50 rounded-xl">
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">
                ₹{calculateTotalPrice().toLocaleString('en-IN')}
              </p>
              {product.price && product.price > product.finalPrice && (
                <p className="ml-3 text-lg text-gray-500 line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              )}
            </div>

            {product.price && product.price > product.finalPrice && (
              <div className="flex items-center mt-2">
                <span className="bg-amber-400 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                  Save {product.discount}%
                </span>
                <span className="ml-2 text-sm text-green-600 font-medium">
                  You save ₹{(product.price - product.finalPrice).toLocaleString('en-IN')}
                </span>
              </div>
            )}


          </div>

          {/* Variants Selection */}
          {Object.keys(groupedVariants).map(variantType => (
            <div key={variantType} className="space-y-3">
              <h3 className="font-medium text-gray-900">{variantType}</h3>
              <div className="flex flex-wrap gap-2">
                {groupedVariants[variantType].map(variant => (
                  <button
                    key={variant._id}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedVariants[variantType] === variant.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    onClick={() => handleVariantSelect(variantType, variant.value)}
                  >
                    {variant.value}
                    {variant.additionalPrice > 0 && (
                      <span className="ml-1">+ ₹{variant.additionalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={quantity >= product.quantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <CartAdd
              userId={userId}
              product={{
                _id: product._id,
                vendorId: product.vendorId || '', // Make sure vendorId exists
                productName: product.productName,
                variant: Object.entries(selectedVariants).map(([key, value]) => `${key}: ${value}`).join(' / '),
                quantity: quantity,
                price: product.price,
                discount: product.discount || 0,
                finalPrice: calculateTotalPrice(),
                thumbnail: product.thumbnail || product.images?.[0]?.url || ''
              }}
            />

            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium border transition-colors ${product.stockStatus === "in_stock"
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "border-gray-400 text-gray-400 cursor-not-allowed"
                }`}
              disabled={product.stockStatus !== "in_stock"}
            >
              Buy Now
            </button>
          </div>

          {/* Security & Returns */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>Secure transaction</span>
            </div>

          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <div className="flex border-b border-gray-200">
          <button className="px-4 py-3 font-medium text-blue-600 border-b-2 border-blue-600">
            Description
          </button>
          <button className="px-4 py-3 font-medium text-gray-500 hover:text-gray-700">
            Specifications
          </button>
          <button className="px-4 py-3 font-medium text-gray-500 hover:text-gray-700">
            Reviews ({product.ratings?.count || 0})
          </button>
        </div>

        <div className="py-6">
          <h3 className="text-xl font-semibold mb-4">About this item</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Key Features */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Key Features</h4>
              <ul className="space-y-2">
                {product.attributes.slice(0, Math.ceil(product.attributes.length / 2)).map(attr => (
                  <li key={attr._id} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>{attr.key}:</strong> {attr.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">&nbsp;</h4>
              <ul className="space-y-2">
                {product.attributes.slice(Math.ceil(product.attributes.length / 2)).map(attr => (
                  <li key={attr._id} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span><strong>{attr.key}:</strong> {attr.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}