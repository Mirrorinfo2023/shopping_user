'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  { label: 'Home', href: '/', icon: <FaHome /> },
  { label: 'Media', href: '/social', icon: <FaShareAlt /> },
  { label: 'Leads', href: '/leads', icon: <FaUsers /> },
  { label: 'Affiliates', href: '/affiliates', icon: <FaUserTie /> },
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

  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      {/* Top Bar */}
      <div className="w-full">
        <div className="flex flex-wrap justify-between items-center px-4 md:px-12 lg:px-24 py-3">
          {/* Left: Logo + Greeting */}
          <div className="flex items-center gap-2">
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
              <span className="text-orange-500">{greeting.split(' ')[1]}</span>{' '}
              {greeting.split(' ')[2] || ''}
            </span>
          </div>

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
              className="w-full pl-8 pr-2 py-2 border border-blue-300 rounded-md text-sm"
            />
            {query && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow mt-1 max-h-60 overflow-y-auto z-50">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(item.slug)}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-sm text-gray-600">No results found.</li>
                )}
              </ul>
            )}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link href="/wishlist" title="Wishlist">
              <div className="relative text-pink-600 cursor-pointer">
                <FaHeart className="text-xl" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart" title="Cart">
              <div className="relative text-blue-600 cursor-pointer">
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Profile */}
            <Link href="/profile" title="Profile">
              <FaUserCircle className="text-blue-600 text-xl cursor-pointer" />
            </Link>

            {/* Become Seller */}
            <Link href="/seller" title="Become a Seller">
              <div className="flex items-center gap-1 px-2 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white text-sm cursor-pointer">
                <FaUserTie className="text-sm" />
                <span className="hidden sm:inline">Become Seller</span>
              </div>
            </Link>

            {/* Login */}
            <Link href="/auth/login" passHref title="Login">
  <span className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
    <MdLogin className="text-xl" />
    Login
  </span>
</Link>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="flex justify-around items-center gap-2 py-2 px-4 md:px-12 lg:px-24 bg-blue-100 text-blue-700 font-medium text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-blue-700 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
