import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductGridCard = ({ product, userId = "12345", onUpdate }) => {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const productId = product?._id || product?.id;
  const productName = product?.productName || product?.name || "Unnamed Product";
  const productImage = product?.images?.[0]?.url || product?.image || "/images/default-product.jpg";
  const productPrice = product?.finalPrice || product?.price || 0;
  const originalPrice = product?.price || 0;
  const rating = product?.ratings?.average || product?.rating || 0;
  const reviewCount = product?.ratings?.count || product?.reviews || 0;
  const productDescription = product?.description || product?.shortDescription || "No description available";

  // Memoized API check functions
  const checkWishlistStatus = useCallback(async () => {
    if (!productId) return;
    try {
      const response = await fetch(`/api/wishlist/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.product) {
          const isInWishlist = data.product.some(item => item._id === productId);
          setIsWishlisted(isInWishlist);
        }
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  }, [productId, userId]);

  const checkCartStatus = useCallback(async () => {
    if (!productId) return;
    try {
      const response = await fetch(`/api/cart/get/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const isProductInCart = data.data.cartItems.some(
            item => item.productId?._id === productId || item._id === productId
          );
          setIsInCart(isProductInCart);
        }
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
    }
  }, [productId, userId]);

  // Initial status check
  useEffect(() => {
    checkWishlistStatus();
    checkCartStatus();
  }, [checkWishlistStatus, checkCartStatus]);

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const calculateDiscount = () => {
    if (!originalPrice || !productPrice || originalPrice <= productPrice) return 0;
    return Math.round(((originalPrice - productPrice) / originalPrice) * 100);
  };

  const discount = calculateDiscount();

  const handleImageError = () => setImageError(true);

  // Wishlist click
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingWishlist || !productId) return;

    setLoadingWishlist(true);
    try {
      const url = isWishlisted ? '/api/wishlist/remove' : '/api/wishlist/add';
      const body = isWishlisted
        ? { productId, userId }
        : { productId, personId: userId };

      const method = isWishlisted ? 'DELETE' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        setIsWishlisted(!isWishlisted);
        onUpdate?.();
      } else {
        console.error('Wishlist update failed:', data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update wishlist. Try again.');
    } finally {
      setLoadingWishlist(false);
    }
  };

  // Cart click
  const handleCartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingCart || !productId) return;

    setLoadingCart(true);
    try {
      if (isInCart) {
        const response = await fetch('/api/cart/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId }),
        });
        const data = await response.json();
        if (data.success) {
          setIsInCart(false);
          onUpdate?.();
        }
      } else {
        const cartItem = {
          productId,
          vendorId: product?.vendorId || "default_vendor_id",
          name: productName,
          variant: product?.variants?.[0] ? `${product.variants[0]?.variantName}: ${product.variants[0]?.value}` : "Default",
          quantity: 1,
          price: product?.price || 0,
          discount: product?.discount || 0,
          finalPrice: productPrice,
          image: productImage
        };

        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, cartItems: [cartItem] }),
        });
        const data = await response.json();
        if (data.success) {
          setIsInCart(true);
          onUpdate?.();
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update cart. Try again.');
    } finally {
      setLoadingCart(false);
    }
  };

  if (!product || !productId) return null;

  return (
    <Link href={`/products/${productId}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          disabled={loadingWishlist}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {loadingWishlist ? (
            <svg className="animate-spin w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg
              className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>

        {/* Product Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Image
            src={imageError ? "/images/default-product.jpg" : productImage}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />

          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}

          {/* In Cart */}
          {isInCart && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                In Cart
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          {product?.brand && <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">{product.brand}</p>}
          <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 h-10 leading-tight">{productName}</h3>
          <h5 className="font-light text-gray-600 truncate w-full">{productDescription}</h5>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'stroke-current text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            </div>
          )}

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">{formatPrice(productPrice)}</span>
              {originalPrice > productPrice && <span className="text-xs text-gray-500 line-through">{formatPrice(originalPrice)}</span>}
            </div>

            <button
              onClick={handleCartClick}
              disabled={loadingCart}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isInCart
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
              } disabled:opacity-50`}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
            >
              {loadingCart ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isInCart ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductGridCard;
