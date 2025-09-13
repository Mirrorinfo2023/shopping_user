'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt, FaLock, FaUser, FaQrcode } from 'react-icons/fa';

export default function SendMoney() {
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than ₹0.');
      return;
    }

    setError('');
    alert('Payment sent successfully!');
    // TODO: Replace with actual payment logic
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col pt-14">
      {/* Header */}
      <div className="bg-blue-400 text-white flex items-center px-4 py-3">
        <button onClick={() => window.history.back()} className="text-white text-lg mr-4">
          ←
        </button>
        <h1 className="text-lg font-bold">Send Money</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* QR Code */}
        <div className="flex justify-center my-4">
          <Image
            src="/qr.png"
            alt="QR Code"
            width={192}
            height={192}
            className="border rounded"
          />
        </div>

        {/* Mobile Number Input */}
        <div className="flex items-center bg-white rounded-lg p-2 mb-3 shadow-sm">
          <FaMobileAlt className="text-blue-500 mr-2" />
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="flex-1 outline-none"
            maxLength={10}
            inputMode="numeric"
          />
          <FaLock className="text-blue-500 ml-2" />
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min="1"
          step="0.01"
          className="w-full bg-white rounded-lg p-3 mb-3 shadow-sm outline-none"
        />

        {/* Message Input */}
        <div className="flex items-center bg-white rounded-lg p-2 mb-5 shadow-sm">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add Message"
            className="flex-1 outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Pay Button */}
        <button
          onClick={handlePay}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Pay Securely ₹
        </button>

        {/* Recent Payees */}
        <div className="bg-white rounded-lg mt-6 p-3 shadow-sm">
          <p className="font-semibold text-gray-700">Recents</p>
          {/* Map recent users here */}
        </div>
      </div>

      {/* Floating QR Button (Optional) */}
      {/* 
      <div className="fixed bottom-6 right-4 text-center">
        <button className="bg-blue-500 p-4 rounded-full shadow-lg text-white text-xl">
          <FaQrcode />
        </button>
        <p className="text-sm mt-1 text-gray-600">Scan</p>
      </div>
      */}
    </div>
  );
}
