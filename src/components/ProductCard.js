import Image from 'next/image';
import {
  FaHeart,
  FaShoppingCart,
  FaShareAlt,
  FaClipboardList,
} from 'react-icons/fa';

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    name = '',
    description = '',
    price = 0,
    originalPrice = null,
    image = '',
    wishlistCount = 0,
    cartCount = 0,
    orderCount = 0,
    shareCount = 0,
  } = product;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  // Icon with optional count shown beside the icon
  const IconButton = ({ icon: Icon, title, colorClass, count }) => (
    <div
      className="flex items-center gap-1 text-sm cursor-pointer group"
      title={title}
    >
      <button
        className={`${colorClass} text-lg transition-transform group-hover:scale-110`}
      >
        <Icon />
      </button>
      {count > 0 && (
        <span className="font-semibold text-gray-700 text-xs">{count}</span>
      )}
    </div>
  );

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-lg transition duration-200 transform hover:-translate-y-1 w-full relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-orange-600 text-white text-[11px] font-bold px-2 py-[2px] rounded-tr-md rounded-br-md shadow-sm">
            {discount}% OFF
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-40 rounded-md overflow-hidden mb-2 bg-gray-50">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-md font-sans"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-semibold text-gray-800 truncate font-sans" title={name}>
        {name}
      </h3>
      <p
        className="text-xs text-gray-500 mb-2 line-clamp-2 font-sans"
        title={description}
      >
        {description}
      </p>

      {/* Price */}
      <div className="mt-1">
        {originalPrice > price && (
          <span className="text-xs text-gray-400 line-through mr-1">
            ₹{originalPrice}
          </span>
        )}
        <span className="text-blue-600 font-bold text-base">₹{price}</span>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-600 px-4 md:px-6 lg:px-10">
        <IconButton
          icon={FaHeart}
          title="Wishlist"
          colorClass="text-orange-500"
          count={wishlistCount}
        />
        <IconButton
          icon={FaShoppingCart}
          title="Cart"
          colorClass="text-blue-600"
          count={cartCount}
        />
        <IconButton
          icon={FaShareAlt}
          title="Share"
          colorClass="text-gray-500"
          count={shareCount}
        />
      </div>

    </div>
  );
}
