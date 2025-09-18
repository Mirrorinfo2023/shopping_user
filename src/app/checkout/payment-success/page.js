'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-gray-800 dark:text-white p-5">
      <FaCheckCircle className="text-green-500 text-8xl mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/pages/home')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Go to Home
        </button>

        <button
          onClick={() => router.push('/view-categories')}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
