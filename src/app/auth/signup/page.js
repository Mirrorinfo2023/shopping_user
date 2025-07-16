'use client';

import React, { useState } from 'react';
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdLocationPin,
  MdBusiness,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function SignupScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form, setForm] = useState({
    referralCode: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    pincode: '',
    state: '',
    city: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log('Register Form:', form);
    // TODO: Add validation and API call here
  };

  const states = ['Maharashtra', 'Karnataka', 'Delhi'];
  const cities = {
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bengaluru', 'Mysore'],
    Delhi: ['New Delhi'],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef6fb] px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">New Signup</h2>

        {/* Referral Code */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdBusiness className="text-gray-600 text-lg" />
          <input
            type="text"
            placeholder="Referral Code"
            value={form.referralCode}
            onChange={(e) => handleChange('referralCode', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* First Name */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdPerson className="text-gray-600 text-lg" />
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* Last Name */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdPerson className="text-gray-600 text-lg" />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* Email */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdEmail className="text-gray-600 text-lg" />
          <input
            type="email"
            placeholder="Email ID"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* Mobile Number */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdPhone className="text-gray-600 text-lg" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdLock className="text-gray-600 text-lg" />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="ml-2 text-gray-600"
          >
            {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        </div>

        {/* Pincode */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <MdLocationPin className="text-gray-600 text-lg" />
          <input
            type="text"
            placeholder="Pin Code"
            value={form.pincode}
            onChange={(e) => handleChange('pincode', e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* State */}
        <div className="bg-gray-100 px-4 py-3 rounded-xl mb-3">
          <select
            value={form.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full bg-transparent outline-none text-base text-gray-800"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="bg-gray-100 px-4 py-3 rounded-xl mb-4">
          <select
            value={form.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full bg-transparent outline-none text-base text-gray-800"
            disabled={!form.state}
          >
            <option value="">Select City</option>
            {form.state &&
              cities[form.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-blue-800 to-blue-500 py-3 rounded-full text-white font-semibold"
        >
          Register
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-yellow-500 font-semibold cursor-pointer"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
