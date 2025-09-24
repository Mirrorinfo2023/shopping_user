'use client';

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const bbpsCategories = [
  {
    title: 'Utility Bills',
    services: ['Electricity Bill', 'Water Bill', 'Gas Bill', 'Municipal Tax', 'Landline'],
  },
  {
    title: 'Recharge Services',
    services: ['DTH Recharge', 'Mobile Postpaid', 'Broadband', 'FASTag Recharge'],
  },
  {
    title: 'Finance & Others',
    services: ['Loan Repayment', 'Insurance Premium', 'Cable TV'],
  },
];

export default function BbpsServiceSelector() {
  const [query, setQuery] = useState('');
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const allServices = bbpsCategories.flatMap((cat) =>
    cat.services.map((service) => ({ category: cat.title, title: service }))
  );

  const filtered = query
    ? allServices.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase())
      )
    : showAllDropdown
    ? allServices
    : [];

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setShowAllDropdown(false);
    setQuery('');
  };

  const handlePay = (e) => {
    e.preventDefault();
    alert(`Bill paid for ${selectedService}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-16 text-black">
      <h2 className="text-lg font-bold mb-3 text-black">BBPS Service Selector</h2>

      {/* Search input with trailing icon */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search your service..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowAllDropdown(false);
            setSelectedService(null);
          }}
          className="w-full border border-black rounded-md px-4 py-2 pr-10 text-black placeholder-black"
        />
        <button
          onClick={() => {
            setShowAllDropdown((prev) => !prev);
            setQuery('');
            setSelectedService(null);
          }}
          className="absolute right-2 top-2 text-black hover:text-gray-700"
        >
          <FaChevronDown />
        </button>

        {/* Dropdown */}
        {filtered.length > 0 && (
          <ul className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow z-10 divide-y">
            {filtered.map((item, index) => (
              <li
                key={index}
                className="p-3 text-sm cursor-pointer hover:bg-blue-50 text-black"
                onClick={() => handleServiceClick(item.title)}
              >
                {item.title}{' '}
                <span className="text-xs text-black">({item.category})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bill payment form box */}
      {selectedService && (
        <div className="bg-white border rounded-md shadow-md p-4 max-w-md mx-auto">
          <h3 className="text-md font-semibold mb-4 text-black">
            Enter details for: <span className="text-blue-600">{selectedService}</span>
          </h3>
          <form onSubmit={handlePay} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Enter Consumer Number"
              className="w-full px-4 py-2 border rounded text-black placeholder-black"
            />
            <input
              type="number"
              required
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border rounded text-black placeholder-black"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
