'use client';

import React, { useState } from 'react';
import { FaRupeeSign, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

const allTransactions = [
  {
    id: 1,
    type: 'Send',
    name: 'Rahul Sharma',
    avatar: '/user1.jpg',
    date: '2025-06-30',
    time: '10:12 AM',
    amount: 200,
  },
  {
    id: 2,
    type: 'Add',
    name: 'Wallet Top-Up',
    avatar: '/wallet.png',
    date: '2025-06-29',
    time: '03:45 PM',
    amount: 1000,
  },
  {
    id: 3,
    type: 'Receive',
    name: 'Anjali Mehra',
    avatar: '/user2.jpg',
    date: '2025-06-29',
    time: '09:30 AM',
    amount: 300,
  },
  {
    id: 4,
    type: 'Send',
    name: 'Electricity Bill',
    avatar: '/electricity.png',
    date: '2025-06-28',
    time: '07:22 PM',
    amount: 750,
  },
];

export default function MoneyHistoryScreen() {
  const [selectedTab, setSelectedTab] = useState('All');

  const filtered =
    selectedTab === 'All'
      ? allTransactions
      : allTransactions.filter((t) => t.type === selectedTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-14">
      <h2 className="text-xl font-bold mb-4"> {selectedTab} Money History</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {['All', 'Send', 'Add', 'Receive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              selectedTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filtered.map((tx) => (
          <div
            key={tx.id}
            className="bg-white p-4 rounded-xl shadow flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border">
                <Image
                  src={tx.avatar}
                  alt={tx.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{tx.name}</h3>
                <p className="text-xs text-gray-500">
                  {tx.date} | {tx.time}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p
                className={`flex items-center font-bold ${
                  tx.type === 'Send'
                    ? 'text-red-600'
                    : tx.type === 'Receive'
                    ? 'text-green-600'
                    : 'text-blue-600'
                }`}
              >
                {tx.type === 'Send' && <FaArrowUp className="mr-1" />}
                {tx.type === 'Receive' && <FaArrowDown className="mr-1" />}
                {tx.type === 'Add' && <FaPlus className="mr-1" />}
                ₹{tx.amount}
              </p>
              <p className="text-xs text-gray-400">{tx.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
