'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';

const transactions = [
  {
    id: 1,
    type: 'Recharge',
    icon: '💸',
    title: 'Mobile Recharge',
    description: 'Airtel prepaid recharge',
    date: '2025-06-30',
    time: '10:24 AM',
    amount: 149,
    status: 'Success',
  },
  {
    id: 2,
    type: 'Electricity',
    icon: '🔌',
    title: 'Electricity Bill',
    description: 'MSEB monthly payment',
    date: '2025-06-29',
    time: '04:42 PM',
    amount: 860,
    status: 'Failed',
  },
  {
    id: 3,
    type: 'DTH',
    icon: '📺',
    title: 'DTH Recharge',
    description: 'Tata Sky',
    date: '2025-06-28',
    time: '11:15 AM',
    amount: 350,
    status: 'Pending',
  },
];

export default function AllTransactionHistory() {
  const [filter, setFilter] = useState('All');

  const filteredTransactions =
    filter === 'All'
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen p-4 bg-gray-50 pt-20">
      <h2 className="text-xl font-bold mb-4"> All Transaction History</h2>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {['All', 'Success', 'Failed', 'Pending'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions found.</p>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              {/* Left: Logo + Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{tx.title}</h3>
                  <p className="text-sm text-gray-500">{tx.description}</p>
                  <p className="text-xs text-gray-400">
                    {tx.date} | {tx.time}
                  </p>
                </div>
              </div>

              {/* Right: Amount & Status */}
              <div className="text-right">
                <p className="text-blue-600 font-bold flex items-center justify-end">
                  <FaRupeeSign className="mr-1" />
                  {tx.amount}
                </p>
                <div className="text-sm flex items-center justify-end mt-1">
                  {tx.status === 'Success' && (
                    <span className="text-green-600 flex items-center gap-1">
                      <FaCheckCircle /> Success
                    </span>
                  )}
                  {tx.status === 'Failed' && (
                    <span className="text-orange-600 flex items-center gap-1">
                      <FaTimesCircle /> Failed
                    </span>
                  )}
                  {tx.status === 'Pending' && (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <FaClock /> Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
