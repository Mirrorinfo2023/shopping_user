'use client';

import Image from 'next/image';
import "../globals.css";

const MirrorShopping = () => {
  const features = [
    "Cashback on every order",
    "Mirror Wallet Integration for quick payments",
    "Daily Deals & Flash Sales",
    "Loyalty Rewards System for repeat shoppers",
    "Quick Checkout with saved addresses",
    "Product Recommendations based on user interest",
    "Secure payments & order tracking",
    "Easy return and refund policy",
  ];

  const platforms = [
    "Android (Google Play Store)",
    "iOS (App Store)",
    "Web Browser",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 p-6 sm:p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Mirror Shopping
      </h1>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-12 gap-10">
        <div className="flex-1 space-y-5">
          <p className="text-lg leading-relaxed">
            <strong className="text-blue-700">Mirror Shopping</strong> brings you a seamless online shopping experience within the Mirror ecosystem. Enjoy exclusive deals, instant cashback, and a frictionless checkout process powered by the integrated Mirror Wallet.
          </p>
          <button className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 transition">
            Shop Now
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/img_6.png"
            alt="Mirror Shopping"
            width={400}
            height={250}
            className="rounded-lg shadow"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-6 max-w-4xl mx-auto text-base md:text-lg mb-10">
        <p>
          Mirror Shopping offers a curated selection of top-rated products across categories such as fashion, electronics, home essentials, beauty, and lifestyle.
        </p>
        <p>
          Earn Mirror Points on every purchase and redeem them for future discounts. With an easy-to-use interface, fast order tracking, and Mirror Wallet integration...
        </p>
        <p>
          Mirror Shopping supports both top brands and local sellers, ensuring an inclusive and community-driven commerce experience...
        </p>
      </div>

      {/* Features */}
      <Section title="Key Features" items={features} />

      {/* Platforms */}
      <Section title="Platforms Available On" items={platforms} />

      {/* Final Note */}
      <div className="text-center mt-16 max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          Start shopping with Mirror Shopping and enjoy a new way to buy, save, and earn. With each transaction, you step into a modern retail experience built for convenience, trust, and financial growth.
        </p>
        <button className="bg-blue-700 text-white px-8 py-3 font-semibold rounded-full hover:bg-blue-800 transition">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, items }) => (
  <section className="max-w-4xl mx-auto mb-14">
    <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">{title}</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((text, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-700" />
          <span className="text-gray-700">{text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default MirrorShopping;
