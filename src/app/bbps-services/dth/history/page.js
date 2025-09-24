'use client';

import React from 'react';
import {
  FaBolt,
  FaTint,
  FaFire,
  FaWifi,
  FaTv,
  FaWallet,
} from 'react-icons/fa';

const history = [
  {
    id: '10000749042',
    date: '07 May 2025, 09:14 AM',
    service: 'Recharge',
    number: '9146954496',
    provider: 'Vodafone Idea',
    amount: '₹175.42',
    actualAmount: '₹179.00',
    status: 'SUCCESS',
    traxId: 'S25050709144012700927',
    type: 'debit',
    ob: '₹321.34',
    cb: '₹145.92',
    icon: <FaBolt className="text-yellow-500 text-xl" />,
  },
  {
    id: '10000748811',
    date: '06 May 2025, 10:55 AM',
    service: 'Recharge',
    number: '9112421742',
    provider: 'Vodafone Idea',
    amount: '₹195.02',
    actualAmount: '₹199.00',
    status: 'SUCCESS',
    traxId: 'S250506105509893B01B1',
    type: 'debit',
    ob: '₹516.36',
    cb: '₹321.34',
    icon: <FaBolt className="text-yellow-500 text-xl" />,
  },
  {
    id: '10000748689',
    date: '05 May 2025, 04:27 PM',
    service: 'wallet',
    provider: 'Mirror',
    amount: '₹500',
    type: 'credit',
    ob: '₹16.36',
    cb: '₹516.36',
    icon: <FaWallet className="text-green-500 text-xl" />,
  },
  {
    id: '10000748459',
    date: '03 May 2025, 09:30 AM',
    service: 'Recharge',
    provider: 'Unknown',
    amount: '₹342.02',
    type: 'debit',
  },
];

export default function BBPSHistoryList() {
  return (
    <div className="min-h-screen bg-[#eaf4fc] p-4 pt-16">
      <h2 className="text-lg font-bold mb-4 text-gray-800">DTH History</h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-md border border-gray-200"
          >
            {/* Top Row */}
            <div className="flex justify-between text-[12px] text-gray-500 mb-2 font-semibold">
              <span>Order No #{item.id}</span>
              <span>{item.date}</span>
            </div>

            {/* Service & Details */}
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1">{item.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-[15px]">
                  {item.service === 'wallet' ? 'wallet' : item.service}
                </h3>

                {item.number && (
                  <p className="text-sm text-gray-800">
                    Number: {item.number} | {item.provider} <br />
                    Amount: {item.actualAmount}{' '}
                    <span className="text-green-600 font-medium">
                      {item.status}
                    </span>
                  </p>
                )}

                {item.traxId && (
                  <p className="text-xs text-gray-500 break-all">
                    Trax ID: {item.traxId}
                  </p>
                )}
              </div>
            </div>

            {/* Debit or Credit */}
            <div className="flex justify-between text-sm font-semibold">
              <span
                className={`${
                  item.type === 'credit' ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {item.type === 'credit' ? 'Credit' : 'Debit'}
              </span>
              <span
                className={`${
                  item.type === 'credit' ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {item.amount}
              </span>
            </div>

            {/* OB and CB */}
            {(item.ob || item.cb) && (
              <div className="mt-2 flex justify-between text-xs text-gray-500 border-t pt-1">
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
