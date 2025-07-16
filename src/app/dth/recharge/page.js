'use client';

import React, { useState } from 'react';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import Image from 'next/image';

const dthOperators = [
  'Airtel Digital Tv',
  'Dish Tv',
  'Sun Direct',
  'Tata Play',
  'Videocon D2h',
];

export default function DTHRechargeScreen() {
  const [operator, setOperator] = useState(dthOperators[0]);
  const [consumerNumber, setConsumerNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecharge = () => {
    if (!consumerNumber || !amount) {
      alert('Please enter all fields.');
      return;
    }
    alert(`Recharging ${operator} for ₹${amount}`);
  };

  return (
    <div className="bg-[#f3f9ff] min-h-screen px-4 pt-16 pb-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 font-bold text-lg cursor-pointer"
        >
          <FaArrowLeft />
          DTH Recharge
        </div>
        <div className="text-sm text-blue-500 font-medium cursor-pointer">
          Help
        </div>
      </div>

      {/* Image */}
      <div className="w-full flex justify-center mb-6">
        <Image
          src="/dth-banner.png"
          alt="DTH Recharge"
          width={208}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Recharge Form */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        {/* Operator */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Operator</label>
          <select
            className="w-full border px-3 py-2 rounded-md text-sm text-black"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            {dthOperators.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>

        {/* Consumer Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Consumer Number</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter consumer number"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              className="w-full text-sm outline-none text-black"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            placeholder="Enter recharge amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm text-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRecharge}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
          Proceed To Recharge
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] mt-6 text-center text-gray-500">
        Disclaimer: We support most types of recharges, but please verify your operator and consumer ID before payment.
      </p>
    </div>
  );
}
