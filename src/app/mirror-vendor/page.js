'use client';

import Image from 'next/image';
import "../globals.css";

const MirrorVendors = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-blue-900">
      <header className="text-4xl font-bold text-center text-blue-700 mb-10">
        Mirror Vendors
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-xl shadow-lg p-6 mb-10">
        <div className="flex-1 space-y-4">
          <p className="text-lg leading-relaxed">
            <strong className="text-blue-700">Mirror Vendors</strong> is a robust digital marketplace platform designed to empower local businesses, independent sellers, and service providers to take their offerings online with ease. From product listing to payment management, Mirror Vendors delivers a streamlined experience with tools tailored to boost visibility and drive sales.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
            Join as Vendor
          </button>
        </div>
        <div className="flex-1">
          <Image
            src="/img_7.png"
            alt="Mirror Vendors"
            width={400}
            height={250}
            className="rounded-xl shadow-md"
          />
        </div>
      </div>

      <p className="text-base mb-4">
        With Mirror Vendors, entrepreneurs can easily launch their digital storefront without the need for technical skills or huge investments...
      </p>
      <p className="text-base mb-4">
        Vendors also gain access to detailed analytics, marketing tools, seasonal promotions, and a growing base of Mirror customers...
      </p>
      <p className="text-base mb-10">
        As part of our mission to promote local economies, we also feature a vendor spotlight program where top-performing vendors are promoted...
      </p>

      <Section title="Key Features" items={[
        "Easy product/service listing with images and descriptions",
        "Real-time order tracking and notifications",
        "Instant payment settlements to Mirror Wallet",
        "Performance dashboard with sales and engagement data",
        "Customer feedback and rating management",
        "Built-in promotions and discount tools",
        "Integrated delivery and pickup coordination",
        "Dedicated vendor support and onboarding assistance",
        "Support for bulk uploads and CSV imports",
        "Cross-platform access via mobile and web",
      ]} />

      <Section title="Vendor Benefits" items={[
        "Reach a wider audience and increase revenue",
        "Zero commission for the first 3 months",
        "Exclusive access to vendor training programs",
        "Participate in seasonal sales & events",
        "Boost visibility with featured listings",
      ]} />

      <Section title="Platforms Available On" items={[
        "Android (Google Play Store)",
        "iOS (App Store)",
        "Web Browser",
      ]} />

      <p className="text-center text-base mt-10">
        Whether you are an experienced merchant or just starting your entrepreneurial journey, Mirror Vendors offers a comprehensive platform to digitize and expand your business.
      </p>
    </div>
  );
};

const Section = ({ title, items }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">{title}</h2>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
          <span className="text-base text-blue-900">{item}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default MirrorVendors;