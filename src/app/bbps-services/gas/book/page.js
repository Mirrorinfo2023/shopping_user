'use client';

import React, { useState } from 'react';
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaIdCard,
  FaMoneyBillWave,
  FaBuilding,
} from 'react-icons/fa';

export default function LpgGasBookingPage() {
  const [provider, setProvider] = useState('');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [uniqueConsumerId, setUniqueConsumerId] = useState('');

  const handleSubmit = () => {
    if (!provider || !consumerNumber || !distributorId || !mobileNumber || !uniqueConsumerId) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(`Booking submitted for ${provider}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 pt-24 text-black">
      <h1 className="text-xl font-bold text-blue-700 mb-4">LPG Gas Booking</h1>

      <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
        {/* Provider */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Provider</label>
          <select
            className="w-full border px-3 py-2 text-sm rounded-md text-black"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="">-- Choose Provider --</option>
            <option value="Indane">Indane Gas</option>
            <option value="HP">HP Gas</option>
            <option value="Bharat">Bharat Gas</option>
          </select>
        </div>

        {/* Consumer Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Consumer Number</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your consumer number"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Distributor ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Distributor ID</label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter distributor ID"
              value={distributorId}
              onChange={(e) => setDistributorId(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Unique Consumer ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Unique Consumer ID</label>
          <div className="relative">
            <FaIdCard className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter unique consumer ID"
              value={uniqueConsumerId}
              onChange={(e) => setUniqueConsumerId(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white text-sm font-semibold py-2.5 rounded-lg transition duration-200"
        >
          Book LPG Cylinder
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 border-l-4 border-green-300 pl-3">
        ⚠️ Please ensure all details are correct. LPG booking through BBPS requires valid inputs.
      </p>
    </div>
  );
}
