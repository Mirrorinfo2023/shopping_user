'use client';
import React from 'react';
import { FaRupeeSign, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const CashbackCard = ({ badgeText, imageUrl, title, subtitle }) => {
  const fallbackImage = '/default-icon.png'; // Make sure this image exists in public/

  return (
    <div className="w-56 bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center border border-blue-100 hover:shadow-md transition-shadow flex-shrink-0">
      {/* Badge */}
      <div className="self-end bg-blue-600 text-white text-xs px-2 py-1 rounded-md mb-2">
        {badgeText}
      </div>

      {/* Image */}
      <div className="w-[80px] h-[80px] bg-blue-50 rounded-full mb-4 flex items-center justify-center overflow-hidden border border-blue-100">
        <Image
          src={imageUrl || fallbackImage}
          alt={title}
          width={80}
          height={80}
          className="object-cover rounded-full"
        />
      </div>

      {/* Title */}
      <h3 className="font-medium text-blue-900 mb-1 text-base">{title}</h3>

      {/* Subtitle */}
      <p className="text-sm text-blue-600">{subtitle}</p>
    </div>
  );
};

const CategoryRow = ({ title, items }) => {
  return (
    <div className="mb-8">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
          View All
        </button>
      </div>

      {/* Cards Row */}
      <div className="flex space-x-5 overflow-x-auto pb-3 scrollbar-hide">
        {items.map((item, index) => (
          <CashbackCard
            key={index}
            badgeText={item.badgeText}
            imageUrl={item.imageUrl}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

const InvoiceUpload = () => {
  // Sample data
  const jewelleryItems = [
    { badgeText: 'CB 5%', title: 'Mirror', subtitle: 'Earn upto 5%', imageUrl: '' },
    { badgeText: 'CB 4%', title: 'Mirror', subtitle: 'Earn upto 4%', imageUrl: '' },
    { badgeText: 'CB 3%', title: 'Salty', subtitle: 'Earn upto 5%', imageUrl: '' },
    { badgeText: 'CB 4%', title: 'Giva', subtitle: 'Earn upto 4%', imageUrl: '' },
  ];

  const groceryItems = [
    { badgeText: 'CB 6%', title: 'Mirror', subtitle: 'Earn upto 6%', imageUrl: '' },
    { badgeText: 'CB 60RS', title: 'Mirror', subtitle: 'Earn upto 60RS', imageUrl: '' },
    { badgeText: 'CB 6%', title: 'Happi', subtitle: 'Earn upto 6%', imageUrl: '' },
    { badgeText: 'CB 6%', title: 'Organic India', subtitle: 'Earn upto 6%', imageUrl: '' },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-blue-50 min-h-screen pt-10">
      {/* Earnings Card */}
      <div className="border border-cyan-400 rounded-xl p-4 mb-6 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <FaRupeeSign className="text-orange-500 text-xl" />
          </div>
          <div>
            <p className="text-orange-500 font-semibold">₹ 0</p>
            <p className="text-sm font-medium text-gray-800">My Total Earning</p>
          </div>
        </div>
        <FaChevronRight className="text-gray-600 text-xl" />
      </div>

      {/* Upload Invoice Button */}
      <button className="w-full bg-blue-600 text-white text-2xl font-bold mb-6 py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
        Upload Invoice
      </button>

      {/* Category Sections */}
      <CategoryRow title="Jewellery" items={jewelleryItems} />
      <CategoryRow title="Grocery" items={groceryItems} />
    </div>
  );
};

export default InvoiceUpload;
