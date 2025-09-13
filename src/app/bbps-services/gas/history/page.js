'use client';

import React from 'react';
import { FaFire } from 'react-icons/fa';

const gasBookings = [
  {
    id: 'GB100012345',
    date: '30 June 2025, 10:45 AM',
    provider: 'Indane Gas',
    consumerNo: 'IND-90345678',
    amount: '₹980.00',
    status: 'SUCCESS',
    traxId: 'GAS2506301045IND9034',
    type: 'debit',
    ob: '₹1200.00',
    cb: '₹220.00',
  },
  {
    id: 'GB100012344',
    date: '15 June 2025, 01:20 PM',
    provider: 'HP Gas',
    consumerNo: 'HP-78783456',
    amount: '₹950.00',
    status: 'FAILED',
    traxId: 'GAS2506151320HP7878',
    type: 'debit',
    ob: '₹1170.00',
    cb: '₹1170.00',
  },
];

export default function GasBookingHistory() {
  return (
    <div className="min-h-screen bg-[#eef5f9] p-4 pt-16">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Gas Booking History</h2>

      <div className="space-y-4">
        {gasBookings.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow border border-gray-200">
            {/* Top Row */}
            <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
              <span>Order No #{item.id}</span>
              <span>{item.date}</span>
            </div>

            {/* Main Info */}
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1">
                <FaFire className="text-orange-500 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 font-bold text-sm">{item.provider}</h3>
                <p className="text-sm text-gray-700">
                  Consumer No: {item.consumerNo} <br />
                  Amount: {item.amount}{' '}
                  <span
                    className={`font-medium ml-2 ${
                      item.status === 'SUCCESS'
                        ? 'text-green-600'
                        : item.status === 'FAILED'
                        ? 'text-orange-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <p className="text-xs text-gray-500 break-all">Trax ID: {item.traxId}</p>
              </div>
            </div>

            {/* Debit Info */}
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-orange-600">Debit</span>
              <span className="text-orange-600">{item.amount}</span>
            </div>

            {/* OB and CB */}
            {(item.ob || item.cb) && (
              <div className="mt-1 flex justify-between text-xs text-gray-500 border-t pt-1">
                <span>OB: {item.ob}</span>
                <span>CB: {item.cb}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
