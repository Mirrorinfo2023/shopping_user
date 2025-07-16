'use client';

import React, { useState } from 'react';

export default function TermInsurancePage() {
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    mobile: '',
    email: '',
    income: '',
    aadhaar: '',
    coverAmount: '',
    insureFor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted:\n' + JSON.stringify(form, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 pt-14">
      <h1 className="text-xl font-bold text-blue-700 mb-6"> Term Insurance</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            maxLength={10}
            placeholder="10-digit number"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹)</label>
          <input
            name="income"
            value={form.income}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 500000"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Aadhaar Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number</label>
          <input
            name="aadhaar"
            value={form.aadhaar}
            onChange={handleChange}
            maxLength={12}
            placeholder="12-digit Aadhaar"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Cover Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Amount (₹)</label>
          <input
            name="coverAmount"
            value={form.coverAmount}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 1000000"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Who to Insure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Who would you like to insure?
          </label>
          <select
            name="insureFor"
            value={form.insureFor}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select</option>
            <option>Myself</option>
            <option>Me + My Spouse</option>
            <option>Me + My Spouse + Children</option>
            <option>More Family Members</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
        >
          Get Term Insurance
        </button>
      </form>
    </div>
  );
}
