'use client';

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

export default function ElectricityBillPage() {
  const [operator, setOperator] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 pt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-blue-700"> Electricity Bill</h1>
        <Image
          src="/images/bbps.png"
          alt="BBPS Logo"
          width={48}
          height={48}
          className="rounded-md"
        />
      </div>

      {/* Bill Form Card */}
      <div className="bg-white rounded-2xl shadow-md p-5 space-y-5">
        {/* Operator */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Select Operator
          </label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose Operator --</option>
            <option value="MSEB">MSEB (Maharashtra)</option>
            <option value="BESCOM">BESCOM</option>
            <option value="Tata Power">Tata Power</option>
            <option value="Torrent Power">Torrent Power</option>
            <option value="Adani Electricity">Adani Electricity</option>
          </select>
        </div>

        {/* Consumer Number */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Consumer Number
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter consumer number"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Fetch Button */}
        <button
          onClick={() => alert(`Fetching bill for ${operator}`)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition duration-200"
        >
          🔍 Fetch Bill
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 border-l-4 border-blue-400 pl-3">
        ⚠️ We support most electricity billers via BBPS. Please verify your operator and consumer number before proceeding.
      </p>
    </div>
  );
}
