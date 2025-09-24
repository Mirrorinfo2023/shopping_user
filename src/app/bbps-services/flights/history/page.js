'use client';

import React from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';

const flightBookings = [
  {
    id: 'FL10009876',
    date: '28 June 2025, 08:15 AM',
    passenger: 'Sachin Shelke',
    from: 'Mumbai (BOM)',
    to: 'Delhi (DEL)',
    amount: '₹4,250.00',
    status: 'CONFIRMED',
    pnr: 'PNR12345DEL',
    ob: '₹8000.00',
    cb: '₹3750.00',
  },
  {
    id: 'FL10009812',
    date: '12 June 2025, 07:30 PM',
    passenger: 'Chaitanya S.',
    from: 'Pune (PNQ)',
    to: 'Bangalore (BLR)',
    amount: '₹3,800.00',
    status: 'CANCELLED',
    pnr: 'PNR99887BLR',
    ob: '₹11800.00',
    cb: '₹8000.00',
  },
];

export default function FlightHistoryScreen() {
  return (
    <div className="min-h-screen bg-[#eef6fb] p-4 pt-16">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Flight Booking History</h2>

      <div className="space-y-4">
        {flightBookings.map((item, index) => (
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
              <FaPlaneDeparture className="text-blue-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{item.passenger}</h3>
                <p className="text-sm text-gray-700">
                  {item.from} → {item.to}
                </p>
                <p className="text-xs text-gray-500">PNR: {item.pnr}</p>
              </div>
            </div>

            {/* Status and Amount */}
            <div className="flex justify-between items-center text-sm font-semibold">
              <span
                className={`${
                  item.status === 'CONFIRMED'
                    ? 'text-green-600'
                    : 'text-orange-500'
                }`}
              >
                {item.status}
              </span>
              <span className="text-blue-700">{item.amount}</span>
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
