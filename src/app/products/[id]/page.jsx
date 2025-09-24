"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import CartAdd from "@/components/api_components/addtocart";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [imageLoading, setImageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const userId = "12345";

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const [productRes, reviewsRes] = await Promise.all([
          fetch(`https://secure1.mirrorhub.in/api/products/${id}`, {
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`https://secure1.mirrorhub.in/api/reviews/getproductreview/${id}`, {
            headers: { "Content-Type": "application/json" },
          })
        ]);

        const productData = await productRes.json();
        const reviewsData = await reviewsRes.json();

        if (productData.success) {
          setProduct(productData.product);
          const firstImage = productData.product.thumbnail || productData.product.images?.[0]?.url;
          setSelectedImage(firstImage);

          const initialVariants = {};
          productData.product.variants?.forEach(variant => {
            if (!initialVariants[variant.variantName]) initialVariants[variant.variantName] = variant.value;
          });
          setSelectedVariants(initialVariants);
        } else throw new Error("Product not found");

        if (reviewsData) {
          setReviews(Array.isArray(reviewsData) ? reviewsData : [reviewsData]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleVariantSelect = (variantName, value) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
  };

  const calculateTotalPrice = () => {
    if (!product) return 0;
    let total = product.finalPrice || product.price || 0;
    product.variants?.forEach(v => {
      if (selectedVariants[v.variantName] === v.value) total += v.additionalPrice || 0;
    });
    return total * quantity;
  };

  const calculateBasePrice = () => {
    if (!product) return 0;
    return (product.price || 0) * quantity;
  };

  const calculateDiscountPrice = () => {
    if (!product) return 0;
    return calculateBasePrice() - calculateTotalPrice();
  };

  const handleImageSelect = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setActiveImageIndex(index);
    setImageLoading(true);
  };

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    const nextIndex = (activeImageIndex + 1) % product.images.length;
    handleImageSelect(product.images[nextIndex].url, nextIndex);
  };

  const handlePrevImage = () => {
    if (!product?.images?.length) return;
    const prevIndex = (activeImageIndex - 1 + product.images.length) % product.images.length;
    handleImageSelect(product.images[prevIndex].url, prevIndex);
  };

  const groupedVariants = {};
  product?.variants?.forEach(variant => {
    if (!groupedVariants[variant.variantName]) groupedVariants[variant.variantName] = [];
    groupedVariants[variant.variantName].push(variant);
  });

  const handleBuyNow = async () => {
    if (!product) return;
    try {
      const payload = {
        userId,
        cartItems: [
          {
            productId: product._id,
            vendorId: product.vendorId?._id || "",
            name: product.productName,
            variant: Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(" / "),
            quantity,
            price: product.price,
            discount: product.discount || 0,
            finalPrice: calculateTotalPrice(),
            image: product.thumbnail || product.images?.[0]?.url || "",
          },
        ],
      };

      const res = await axios.post("https://secure1.mirrorhub.in/api/cart/add", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) router.push("/cart");
      else alert(res.data.message || "Failed to add product to cart.");
    } catch (err) {
      alert("Error adding to cart!");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? "text-yellow-400 fill-current" 
                : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  // Shimmer Loading Component
  const ShimmerLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Shimmer */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid xl:grid-cols-2 gap-12 p-10">
            
            {/* Image Gallery Shimmer */}
            <div className="space-y-6">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 animate-pulse"></div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-24 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Product Info Shimmer */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>

              <div className="space-y-3 p-6 bg-gray-100 rounded-2xl">
                <div className="h-12 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>

              {[1, 2].map(i => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  <div className="flex gap-3">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="h-10 bg-gray-200 rounded-lg animate-pulse w-20"></div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-14 bg-gray-200 rounded-xl animate-pulse flex-1"></div>
                <div className="h-14 bg-gray-200 rounded-xl animate-pulse flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) return <ShimmerLoader />;

  // Error State
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
          >
            Go Back
          </button>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-all font-medium"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-10">
     

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid xl:grid-cols-2 gap-12 p-10">
            
            {/* Flipkart Style Image Gallery */}
            <div className="space-y-6">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-100">
                {selectedImage && (
                  <>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                      </div>
                    )}
                    <Image 
                      src={selectedImage} 
                      alt={product.productName} 
                      fill 
                      className={`object-contain transition-opacity duration-300 ${
                        imageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      unoptimized
                      onLoad={() => setImageLoading(false)}
                      priority
                    />
                
                    {/* Navigation Arrows */}
                    {product.images?.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
                        >
                          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                
                    {/* Image Counter */}
                    {product.images?.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {activeImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                  </>
                )}
                
                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {product.discount > 0 && (
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                       {product.discount}% OFF
                    </span>
                  )}
                 
                </div>
              </div>

              {/* Thumbnail Strip - Flipkart Style */}
              {product.images?.length > 0 && (
                <div className="flex justify-center gap-3 pb-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 group ${
                        activeImageIndex === idx 
                          ? "border-blue-500 shadow-lg scale-110" 
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => handleImageSelect(img.url, idx)}
                    >
                      <Image 
                        src={img.url} 
                        alt={`${product.productName} ${idx + 1}`} 
                        fill 
                        className="object-cover" 
                        unoptimized 
                      />
                      {activeImageIndex === idx && (
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* View All Photos Button */}
              {product.images?.length > 4 && (
                <div className="text-center">
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <span>View All {product.images.length} Photos</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {product.productName}
                  </h1>
                  <p className="text-xl text-gray-600 mt-3 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Ratings and SKU */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                    {renderStars(Math.floor(product.ratings?.average || 0))}
                    <span className="font-semibold text-blue-900">
                      {product.ratings?.average || 0}/5
                    </span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 font-medium">
                    {product.ratings?.count || 0} reviews
                  </span>
                  
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent opacity-50 rounded-full transform translate-x-16 -translate-y-16"></div>
                
                <div className="flex items-end gap-4 relative z-10">
                  <p className="text-5xl font-bold text-gray-900">
                    ₹{calculateTotalPrice().toLocaleString("en-IN")}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-2xl text-gray-500 line-through mb-1">
                      ₹{calculateBasePrice().toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
                
                {product.discount > 0 && (
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold text-sm">
                       You save ₹{calculateDiscountPrice().toLocaleString("en-IN")}
                    </span>
                    <span className="text-green-600 font-bold">
                      ({product.discount}% OFF)
                    </span>
                  </div>
                )}
              </div>

              {/* Variants */}
              {Object.keys(groupedVariants).map(variantType => (
                <div key={variantType} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">{variantType}</h3>
                    <span className="text-sm text-gray-500">Required</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {groupedVariants[variantType].map(v => (
                      <button
                        key={v._id}
                        className={`px-5 py-3 border-2 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group ${
                          selectedVariants[variantType] === v.value
                            ? "border-blue-500 bg-blue-500 text-white shadow-lg transform scale-105"
                            : "border-gray-200 hover:border-blue-300 text-gray-700 hover:shadow-md"
                        }`}
                        onClick={() => handleVariantSelect(variantType, v.value)}
                      >
                        <span className="relative z-10">{v.value}</span>
                        {v.additionalPrice > 0 && (
                          <span className="text-sm ml-2 relative z-10">
                            + ₹{v.additionalPrice}
                          </span>
                        )}
                        {selectedVariants[variantType] === v.value && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                <div>
                  <span className="font-semibold text-gray-900 text-lg block">Quantity</span>
                  <span className="text-sm text-gray-500">Available: {product.stock || 0} units</span>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold text-gray-600 hover:text-gray-900"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="font-bold text-lg w-8 text-center text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-xl font-bold text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <CartAdd
                  userId={userId}
                  product={{
                    _id: product._id,
                    vendorId: product.vendorId?._id || "",
                    productName: product.productName,
                    variant: Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(" / "),
                    quantity,
                    price: product.price,
                    discount: product.discount || 0,
                    finalPrice: calculateTotalPrice(),
                    thumbnail: product.thumbnail || product.images?.[0]?.url || "",
                  }}
                  className="flex-1"
                />
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 px-8 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Features Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4">
             
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Secure Payment</span>
                </div>
               
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 mt-8">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: "description", label: "Product Description", icon: "" },
                { id: "details", label: "Technical Details", icon: "" },
                { id: "reviews", label: `Reviews (${reviews.length})`, icon: "" },
                { id: "shipping", label: "Shipping Info", icon: "" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-8 py-5 font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-10">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">About this product</h3>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {product.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
                  {product.attributes?.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {product.attributes.map(attr => (
                        <div key={attr._id} className="flex justify-between items-center py-4 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                          <span className="font-semibold text-gray-700">{attr.key}:</span>
                          <span className="text-gray-600 text-right">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No technical details available.</p>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <div key={review._id || index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {review.customerId?.charAt(0) || "U"}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                Customer {review.customerId?.slice(-4) || "Anonymous"}
                              </div>
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                                <span className="text-gray-500 text-sm">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          {review.isVerified && (
                            <div className="flex items-center gap-2 mt-3 text-green-600 text-sm">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified Purchase
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <div className="text-6xl mb-4">⭐</div>
                      <p className="text-gray-600 text-lg mb-4">No reviews yet</p>
                      <p className="text-gray-500">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Shipping Information</h3>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}