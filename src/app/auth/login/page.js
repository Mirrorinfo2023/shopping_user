'use client';

import React, { useState } from 'react';
import { MdPerson, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Login:', mobile, password);
    // TODO: Add API logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef6fb] px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        {/* Mobile Number */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-4">
          <MdPerson className="text-gray-600 text-lg" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="ml-3 w-full bg-transparent outline-none text-base text-gray-800"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl mb-4">
          <MdLock className="text-gray-600 text-lg" />
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-800 to-blue-500 py-3 rounded-full text-white font-semibold mb-4"
        >
          Log In
        </button>

        {/* Links */}
        <div className="flex justify-between text-sm text-black px-1 mb-2">
          <span className="cursor-pointer">Unblock Me</span>
          <span className="cursor-pointer">Forget Password</span>
        </div>

        {/* Divider */}
        <p className="text-sm text-gray-500 my-2">----------- OR -----------</p>

        {/* Signup link */}
        <p className="text-sm text-gray-700">
          Don&apos;t have an account?{' '}
          <span
            className="text-yellow-500 font-bold cursor-pointer"
            onClick={() => router.push('/auth/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
