'use client';

import React, { useState } from 'react';

export default function CarInsurancePage() {
  const [form, setForm] = useState({
    carNumber: '',
    make: '',
    model: '',
    fuelType: '',
    registrationYear: '',
    policyExpired: '',
    ownerName: '',
    gender: '',
    mobile: '',
    email: '',
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
      <h1 className="text-xl font-bold text-blue-700 mb-6"> Car Insurance</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4"
      >
        {/* Car Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Number</label>
          <input
            name="carNumber"
            value={form.carNumber}
            onChange={handleChange}
            placeholder="e.g. MH12XY4567"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
          <input
            name="make"
            value={form.make}
            onChange={handleChange}
            placeholder="e.g. Maruti Suzuki"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="e.g. Swift VXI"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <select
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>CNG</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Registration Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Year</label>
          <select
            name="registrationYear"
            value={form.registrationYear}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select Year</option>
            {[...Array(20)].map((_, i) => {
              const year = 2025 - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* Policy Expired */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Is Your Policy Expired?</label>
          <select
            name="policyExpired"
            value={form.policyExpired}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Owner Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Owner Full Name</label>
          <input
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            placeholder="Full Name"
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

        {/* Mobile Number */}
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
        >
          Get Car Insurance
        </button>
      </form>
    </div>
  );
}
