'use client';

import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

const services = [
  'Website Development',
  'Software Development',
  'Domain and Hosting',
  'Application development (Android/iOS)',
  'Taxation',
  'Legal',
];

export default function LeadsPage() {
  return (
    <div className="min-h-screen p-4 bg-white pt-10">
      {/* Total Earnings */}
      <div className="border border-cyan-400 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <FaRupeeSign className="text-orange-500 text-xl" />
          </div>
          <div>
            <p className="text-orange-500 font-semibold">₹ 0</p>
            <p className="text-sm font-medium text-black">My Total Earning</p>
          </div>
        </div>
        <p className="text-black text-xl font-bold">›</p>
      </div>

      {/* Paid Earnings */}
      <div className="border border-cyan-400 rounded-xl p-4 mb-4">
        <p className="text-orange-500 font-semibold">₹ 0</p>
        <p className="text-sm font-medium text-black">Paid Earnings</p>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-cyan-300 rounded-xl p-4 text-center shadow-sm"
          >
            <p className="font-semibold text-black text-sm mb-1">{service}</p>
            <p className="text-green-600 font-semibold text-sm">Earn Upto 100 Rs</p>
          </div>
        ))}
      </div>
    </div>
  );
}
