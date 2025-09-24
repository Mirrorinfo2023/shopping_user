'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FaMotorcycle,
  FaCarSide,
  FaBus,
  FaHeartbeat,
  FaHeart,
  FaLeaf,
} from 'react-icons/fa';

const insuranceTypes = [
  { label: 'Bike', icon: <FaMotorcycle className="text-3xl text-blue-600" /> },
  { label: 'Car', icon: <FaCarSide className="text-3xl text-blue-600" /> },
  { label: 'PCV', icon: <FaBus className="text-3xl text-blue-600" /> },
  { label: 'Health', icon: <FaHeartbeat className="text-3xl text-blue-600" /> },
  { label: 'Life', icon: <FaHeart className="text-3xl text-blue-600" /> },
  { label: 'Term', icon: <FaLeaf className="text-3xl text-blue-600" /> },
];

export default function InsurancePage() {
  const router = useRouter();

  const handleClick = (type) => {
    router.push(`/insurance/list/${type}`);
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-6 pt-22">
      {/* Header */}
      <h1 className="text-xl font-bold text-blue-700 mb-4">Insurance</h1>

      {/* Grid of Insurance Options */}
      <div className="grid grid-cols-3 gap-4">
        {insuranceTypes.map((type) => (
          <div
            key={type.label}
            onClick={() => handleClick(type.label)}
            className="flex flex-col items-center justify-center bg-white border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {type.icon}
            <span className="text-sm font-medium text-gray-800 mt-2">{type.label}</span>
          </div>
        ))}
      </div>

      {/* History Section */}
      <div className="mt-6 text-base font-semibold text-gray-800">
        My Recent History
      </div>
    </div>
  );
}
