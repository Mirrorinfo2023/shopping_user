'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentMethodPage() {
  const router = useRouter();
  const [method, setMethod] = useState('stripe');

  const handleProceed = () => {
    router.push('/confirmation');
  };

  const subtotal = 250.0;
  const tax = 12.5;
  const shipping = 0.0;
  const discount = 0.0;
  const total = subtotal + tax + shipping - discount;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Steps */}
      <nav className="flex items-center text-sm text-gray-600 space-x-2 mb-8">
        <span>Cart</span>
        <span>›</span>
        <span>Shipping & Billing</span>
        <span>›</span>
        <span>Payment</span>
        <span>›</span>
        <span className="font-semibold text-gray-900">Payment Method</span>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Payment Options */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline text-sm mb-4"
          >
            ‹ Go back
          </button>

          <h1 className="text-2xl font-bold mb-4">Select a payment method to proceed</h1>

          <form>
            {/* Pay via Online */}
            <fieldset className="mb-6">
              <legend className="text-lg font-semibold mb-3">Pay via online</legend>
              <p className="text-sm text-gray-500 mb-4">(Faster & secure way to pay)</p>

              <label className="flex items-center mb-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={method === 'stripe'}
                  onChange={() => setMethod('stripe')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Stripe</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="sslcommerz"
                  checked={method === 'sslcommerz'}
                  onChange={() => setMethod('sslcommerz')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">SSL Commerz</span>
              </label>
            </fieldset>

            {/* Pay Offline */}
            <fieldset className="mb-6">
              <legend className="text-lg font-semibold">Pay offline</legend>
              <label className="flex items-center mt-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="offline"
                  checked={method === 'offline'}
                  onChange={() => setMethod('offline')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Cash on Delivery / Bank Transfer</span>
              </label>
            </fieldset>

            <button
              type="button"
              onClick={handleProceed}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded font-semibold"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Sub total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount on product</span>
              <span>– ${discount.toFixed(2)}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
