'use client';

import React from 'react';
import Image from 'next/image';

const MirrorBusiness = () => {
  const keyFeatures = [
    "All-in-one service portal (Recharge, BBPS, PAN, AEPS)",
    "Attractive commission structure",
    "Referral bonuses & rewards",
    "User-friendly business dashboard",
    "24/7 transaction support",
    "Training & marketing support",
    "Real-time reporting and analytics",
    "Instant settlement for transactions",
  ];

  const benefits = [
    "Start your own business with zero investment",
    "Expand your earning potential through referrals",
    "Operate digitally from anywhere",
    "Serve your local community with digital solutions",
    "Get access to tools and support to grow",
    "No technical knowledge required to start",
    "Flexibility to work on your own schedule",
    "Become part of a growing digital revolution",
  ];

  const platforms = [
    "Android (Google Play Store)",
    "iOS (App Store)",
    "Web Browser",
    "Windows (PWA/Desktop App)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-4 sm:px-6 md:px-10 py-8 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-10">
        Mirror Business
      </h1>

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 transition hover:shadow-xl">
        <div className="flex-1 space-y-5">
          <p className="text-lg leading-relaxed">
            <strong className="text-orange-600">Mirror Business</strong> empowers individuals and small businesses to earn by offering digital services like recharge, bill payments, wallet loading, and more.
            Be your own boss by becoming a Mirror Business Partner and grow your network while earning commissions.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-semibold transition duration-300 shadow-md">
            Join Now
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/img_4.png"
            alt="Mirror Business"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 space-y-6 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
        <p>Mirror Business is an inclusive platform designed for entrepreneurs, shopkeepers, and individuals looking to earn from their smartphones or desktops.</p>
        <p>Our mission is to make entrepreneurship accessible to everyone by providing the tools and support needed to build a successful digital business.</p>
        <p>We believe that digital empowerment is the key to economic freedom. Whether you’re in a metro city or a rural village, Mirror Business enables you to earn and grow.</p>
      </div>

      {/* Key Features */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">Key Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keyFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">{`0${idx + 1}. ${feature}`}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Join */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">Why Join Mirror Business?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Platforms */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">Platforms Available On</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((platform, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">{platform}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center mt-20">
        <p className="text-lg mb-6 font-medium">
          Ready to take control of your income? Mirror Business gives you everything you need to launch your digital journey today.
        </p>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-full font-semibold shadow-md transition duration-300">
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default MirrorBusiness;
