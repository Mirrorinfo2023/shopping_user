'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import routes from '@/constants/routes';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaShoppingCart,
  FaHome,
  FaShareAlt,
  FaUsers,
  FaSearch,
  FaHeart,
  FaUserCircle,
  FaUserTie,
} from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';
import { motion } from 'framer-motion';

const sampleProducts = [
  { name: 'Smart Watch', slug: 'smart-watch' },
  { name: 'Analog Watch', slug: 'analog-watch' },
  { name: 'Fitness Watch', slug: 'fitness-watch' },
  { name: 'Watch Straps', slug: 'watch-straps' },
  { name: 'Wireless Earbuds', slug: 'earbuds' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning ☀️';
  if (hour < 17) return 'Good Afternoon 🌤️';
  if (hour < 20) return 'Good Evening 🌇';
  return 'Good Night 🌙';
}

const navItems = [
  { label: 'Home', href: '/pages/home', icon: <FaHome /> },
  { label: 'Media', href: '/bbps-services/social', icon: <FaShareAlt /> },
  { label: 'Leads', href: '/bbps-services/leads', icon: <FaUsers /> },
  { label: 'Affiliates', href: '/bbps-services/affiliates', icon: <FaUserTie /> },
];

const Header = ({ cartCount = 3, wishlistCount = 2 }) => {
  const greeting = getGreeting();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const filtered = sampleProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (slug) => {
    setQuery('');
    router.push(`/products/${slug}`);
  };
const handleLogout = () => {
  // Clear login state
  localStorage.removeItem("isLoggedIn");

  // Redirect to login page and replace current history entry
  router.replace("/");

  // Optional: force reload to remove any cached state
  window.location.href = "/";
};


  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      {/* Top Bar */}
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center px-4 md:px-12 lg:px-24 py-3">
          {/* Left: Logo + Greeting */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>
            <span className="text-sm font-bold hidden sm:inline">
              <span className="text-blue-600">Good</span>{' '}
              <span className="text-orange-500">
                {greeting.split(' ')[1]}
              </span>{' '}
              {greeting.split(' ')[2] || ''}
            </span>
          </motion.div>

          {/* Middle: Search */}
          <div className="flex-1 max-w-md mx-4 relative">
            <div className="absolute left-2 top-2.5 text-blue-600">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-2 border border-blue-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
            {query && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full bg-white border rounded-md shadow mt-1 max-h-60 overflow-y-auto z-50"
              >
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
                      onClick={() => handleSelect(item.slug)}
                      className="p-2 cursor-pointer text-sm text-black"
                    >
                      {item.name}
                    </motion.li>
                  ))
                ) : (
                  <li className="p-2 text-sm text-gray-600">
                    No results found.
                  </li>
                )}
              </motion.ul>
            )}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link href="/wishlist" title="Wishlist">
                <div className="relative text-pink-600 cursor-pointer hover:scale-110 transition-transform">
                  <FaHeart className="text-xl" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link href="/cart" title="Cart">
                <div className="relative text-blue-600 cursor-pointer hover:scale-110 transition-transform">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Profile */}
            <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
              <Link href="/profile" title="Profile">
                <FaUserCircle className="text-blue-600 text-xl cursor-pointer" />
              </Link>
            </motion.div>

            {/* Become Seller */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/bbps-services/seller" title="Become a Seller">
                <div className="flex items-center gap-1 px-2 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white text-sm cursor-pointer transition-colors">
                  <FaUserTie className="text-sm" />
                  <span className="hidden sm:inline">Become Seller</span>
                </div>
              </Link>
            </motion.div>

            {/* Login */}
            {/* Login / Logout */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <span
                onClick={handleLogout}
                className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer"
              >
                <MdLogin className="text-xl" />
                Logout
              </span>
            </motion.div>

          </div>
        </div>
      </div>

    {/* Bottom Nav Bar */}
<nav className="flex justify-around items-center py-2 px-4 md:px-12 lg:px-24 bg-white shadow-inner border-t border-gray-200 text-gray-700 font-medium text-sm">
  {navItems.map((item) => {
    const isActive = pathname === item.href;
    return (
      <Link key={item.href} href={item.href}>
        <div className="flex flex-col items-center cursor-pointer group relative px-3 py-1">
          {/* Icon */}
          <div className={`text-xl transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-600`}>
            {item.icon}
          </div>
          {/* Label */}
          <span className={`text-xs transition-colors duration-300 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'} group-hover:text-blue-600`}>
            {item.label}
          </span>
          {/* Bottom line on hover or active */}
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-transform duration-300
            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-center`}>
          </span>
        </div>
      </Link>
    );
  })}
</nav>


    </header>
  );
};

export default Header;
