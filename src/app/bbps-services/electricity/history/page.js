'use client';
import React from 'react';
import Image from 'next/image';

const transactions = [
  {
    id: '10000749042',
    date: '07 May 2025, 09:14 AM',
    type: 'Recharge',
    number: '9146954496',
    provider: 'Vodafone Idea',
    amount: '179.00',
    status: 'SUCCESS',
    traxId: 'S25050709144012700927',
    debit: '₹175.42',
    ob: '₹321.34',
    cb: '₹145.92',
  },
  {
    id: '10000748811',
    date: '06 May 2025, 10:55 AM',
    type: 'Recharge',
    number: '9112421742',
    provider: 'Vodafone Idea',
    amount: '199.00',
    status: 'SUCCESS',
    traxId: 'S250506105509893B01B1',
    debit: '₹195.02',
    ob: '₹516.36',
    cb: '₹321.34',
  },
  {
    id: '10000748689',
    date: '05 May 2025, 04:27 PM',
    type: 'wallet',
    amount: '₹500',
    credit: true,
    ob: '₹16.36',
    cb: '₹516.36',
  },
  {
    id: '10000748459',
    date: '03 May 2025, 09:30 AM',
    type: 'Recharge',
    amount: '₹342.02',
  },
];

export default function RechargeHistory() {
  return (
    <div className="min-h-screen bg-[#eef6fb] p-4 pt-16">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Electric History</h2>

      <div className="space-y-4">
        {transactions.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Order No #{item.id}</span>
              <span>{item.date}</span>
            </div>

            <div className="mb-2">
              <h3 className="font-bold text-gray-800">
                {item.type === 'wallet' ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/mirror_logo.png"
                      alt="wallet"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                    <span>wallet</span>
                  </div>
                ) : (
                  item.type
                )}
              </h3>

              {item.number && (
                <p className="text-sm text-gray-700">
                  Number: {item.number} | {item.provider} <br />
                  Amount: ₹{item.amount}{' '}
                  {item.status && (
                    <span className="text-green-600 font-medium">
                      {item.status}
                    </span>
                  )}
                </p>
              )}

              {item.traxId && (
                <p className="text-xs text-gray-500 break-all">
                  Trax ID: {item.traxId}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span
                className={`font-semibold ${
                  item.credit ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {item.credit ? 'Credit' : 'Debit'}
              </span>

              <span
                className={`font-bold text-right ${
                  item.credit ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {item.credit ? item.amount : item.debit || item.amount}
              </span>
            </div>

            {(item.ob || item.cb) && (
              <div className="mt-1 flex justify-between text-xs text-gray-500 border-t pt-1">
                <span>OB: {item.ob || '—'}</span>
                <span>CB: {item.cb || '—'}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
