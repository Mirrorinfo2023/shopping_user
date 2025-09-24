'use client';

import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';

const insuranceHistory = [
  {
    id: 'INS100347',
    date: '27 June 2025, 11:45 AM',
    insurer: 'LIC of India',
    policyNo: 'LIC-PA-7894211',
    name: 'Sachin Shelke',
    type: 'Life Insurance',
    premium: '₹1,200.00',
    status: 'Paid',
    ob: '₹13,200.00',
    cb: '₹12,000.00',
  },
  {
    id: 'INS100212',
    date: '15 May 2025, 09:20 AM',
    insurer: 'Star Health',
    policyNo: 'STAR-HE-347182',
    name: 'Chaitanya S.',
    type: 'Health Insurance',
    premium: '₹950.00',
    status: 'Failed',
    ob: '₹14,150.00',
    cb: '₹14,150.00',
  },
];

export default function InsuranceHistoryScreen() {
  return (
    <div className="min-h-screen bg-[#eef6fb] p-4 pt-16">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Insurance Payment History</h2>

      <div className="space-y-4">
        {insuranceHistory.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Order No #{item.id}</span>
              <span>{item.date}</span>
            </div>

            {/* Info */}
            <div className="flex gap-3 items-start mb-2">
              <FaHeartbeat className="text-orange-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-700">
                  {item.type} – {item.insurer}
                </p>
                <p className="text-xs text-gray-500">Policy No: {item.policyNo}</p>
              </div>
            </div>

            {/* Status and Amount */}
            <div className="flex justify-between items-center text-sm font-semibold">
              <span
                className={`${
                  item.status === 'Paid'
                    ? 'text-green-600'
                    : 'text-orange-500'
                }`}
              >
                {item.status}
              </span>
              <span className="text-blue-700">{item.premium}</span>
            </div>

            {/* Balance */}
            <div className="mt-1 flex justify-between text-xs text-gray-500 border-t pt-1">
              <span>OB: {item.ob}</span>
              <span>CB: {item.cb}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
