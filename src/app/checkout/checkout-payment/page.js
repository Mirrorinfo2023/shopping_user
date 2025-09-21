'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";

const PaymentMethod = ({ method, selectedMethod, onSelect }) => (
  <div
    className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${
      selectedMethod === method.id
        ? "border-blue-600 bg-blue-50 dark:bg-gray-800"
        : "border-gray-300 hover:border-blue-400"
    }`}
    onClick={() => onSelect(method.id)}
  >
    <div className="text-2xl mr-3">{method.icon}</div>
    <div>
      <h3 className="font-semibold">{method.name}</h3>
      {method.description && <p className="text-sm text-gray-500">{method.description}</p>}
    </div>
  </div>
);

const CheckoutPayment = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("checkoutCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const paymentMethods = [
    { id: 'cod', name: "Cash on Delivery", description: "Pay when your order is delivered", icon: <FaMoneyBillWave /> },
    { id: 'upi', name: "UPI Payment", description: "Pay securely using UPI", icon: <FaWallet /> },
  ];

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((acc, item) => acc + ((item.price - (item.finalPrice || item.price)) * item.quantity), 0);
  const total = subtotal - discount; // removed shipping/protect fee

  const handlePay = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    // Save cart for next page
    localStorage.setItem("paymentCart", JSON.stringify(cartItems));
    localStorage.setItem("paymentTotal", total.toFixed(2));
    router.replace('/checkout/payment-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-white p-5 pt-20">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethod
              key={method.id}
              method={method}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">

            {/* Show savings message only once */}
            {discount > 0 && (
              <p className="text-green-600 text-sm font-medium">
                You will save ₹{discount.toFixed(2).toLocaleString('en-IN')} on this order
              </p>
            )}

            <div className="flex justify-between">
              <span>Sub total ({cartItems.length} {cartItems.length > 1 ? "items" : "item"})</span>
              <span>₹{subtotal.toFixed(2).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>− ₹{discount.toFixed(2).toLocaleString('en-IN')}</span>
            </div>

            <hr className="my-2 border-gray-300 dark:border-gray-700" />

            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{total.toFixed(2).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
             Pay Now ₹{total.toFixed(2).toLocaleString('en-IN')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
