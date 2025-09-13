
'use client';

import React from "react";
import { useRouter } from 'next/navigation';

const Input = ({ label, required = false, type = "text", placeholder = "" }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
 const handleProceed = () => {
    router.push('/checkout-payment');
  };

const AddressSection = ({ title }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
    <Input label="Contact person name" required />
    <Input label="Phone" required type="tel" placeholder="+1" />
    <Input label="Email" required type="email" />
    <Input label="Address type" placeholder="Permanent" />
    <Input label="Country" required />
    <Input label="City" required />
    <Input label="Zip code" required />
    <Input label="Address" required />
    <p className="text-xs text-gray-500 mt-2">
      Note: You need to select address from your selected country
    </p>
    <Input label="Search here" placeholder="Type to search..." />
  </div>
);

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Shipping Address */}
          <AddressSection title="Shipping Address" />

          {/* Billing Address */}
          <AddressSection title="Billing Address" />
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sub total</span>
              <span>250.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>12.50</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount on product</span>
              <span> 0.00</span>
            </div>
            <hr className="my-2 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>262.50</span>
            </div>
          </div>
           <button
        onClick={handleProceed}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Proceed to Payment
      </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
