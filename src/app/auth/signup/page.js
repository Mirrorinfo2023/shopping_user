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
  MdArrowBack
} from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function SignupScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!form.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!form.state) newErrors.state = 'State is required';
    if (!form.city) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    console.log('Register Form:', form);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would handle registration success/failure here
      alert('Registration successful!');
      router.push('/auth/login');
    }, 2000);
  };

  const states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat'];
  const cities = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    Karnataka: ['Bengaluru', 'Mysore', 'Hubli', 'Mangalore'],
    Delhi: ['New Delhi', 'North Delhi', 'South Delhi'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara']
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <MdArrowBack className="mr-1" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 text-center flex-1 mr-4">Create Account</h2>
        </div>

        <p className="text-gray-600 text-center mb-6">Fill in your details to create an account</p>

        <div className="space-y-4">
          {/* Referral Code */}
          <div>
            <div className="flex items-center bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors">
              <MdBusiness className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={form.referralCode}
                onChange={(e) => handleChange('referralCode', e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <div className={`flex items-center bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
                <MdPerson className="text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <div className={`flex items-center bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
                <MdPerson className="text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <div className={`flex items-center bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
              <MdEmail className="text-gray-500 text-lg" />
              <input
                type="email"
                placeholder="Email ID"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <div className={`flex items-center bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
              <MdPhone className="text-gray-500 text-lg" />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div>
            <div className={`flex items-center bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
              <MdLock className="text-gray-500 text-lg" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {/* Pincode */}
          <div>
            <div className={`flex items-center bg-gray-50 border ${errors.pincode ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
              <MdLocationPin className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Pin Code"
                value={form.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-500"
                maxLength="6"
              />
            </div>
            {errors.pincode && <p className="text-red-500 text-xs mt-1 ml-1">{errors.pincode}</p>}
          </div>

          {/* State and City Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* State */}
            <div>
              <div className={`bg-gray-50 border ${errors.state ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
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
              {errors.state && <p className="text-red-500 text-xs mt-1 ml-1">{errors.state}</p>}
            </div>

            {/* City */}
            <div>
              <div className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-xl focus-within:border-blue-500 transition-colors`}>
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
              {errors.city && <p className="text-red-500 text-xs mt-1 ml-1">{errors.city}</p>}
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold mt-2 flex items-center justify-center ${
              isLoading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            } transition-all shadow-md hover:shadow-lg`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-800 transition-colors"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
        </div>

        {/* Terms and Conditions */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By creating an account, you agree to our{' '}
          <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}