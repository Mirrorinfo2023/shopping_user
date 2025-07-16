"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const BuyNowPage = () => {
  const product = {
    name: "Men Solid Round Neck Elastane Red T-Shirt",
    brand: "SOLSTICE",
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    price: 292,
    originalPrice: 999,
    discount: "70% off",
    deliveryDate: "Mon, 8 Jul",
  };

  const [address, setAddress] = useState({
    name: "Sachin Shelke",
    street: "123, Business Street, Pune",
    state: "Maharashtra, 411001",
    phone: "+91 9876543210",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    alert(`Order placed successfully!\n\nPayment: ${paymentMethod}\nDelivering to: ${address.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-16">
      <h1 className="text-2xl font-bold mb-6">Buy Now</h1>

      {/* Product Summary */}
      <div className="flex gap-4 border rounded-lg p-4 mb-6 bg-white shadow-sm">
        <Image src={product.image} alt="product" width={120} height={120} className="rounded object-cover" />
        <div>
          <h2 className="font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-600">Brand: {product.brand}</p>
          <div className="mt-1 flex gap-2 items-center">
            <span className="font-bold text-blue-600 text-lg">₹{product.price}</span>
            <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
            <span className="text-green-600 text-sm">{product.discount}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Delivery by <strong>{product.deliveryDate}</strong></p>
        </div>
      </div>

      {/* Editable Address */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Delivery Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleAddressChange}
            placeholder="Full Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            placeholder="Phone Number"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="Street Address"
            className="border p-2 rounded col-span-full"
          />
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="State, Zip Code"
            className="border p-2 rounded col-span-full"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="flex flex-col gap-2 text-sm">
          {["UPI", "Card", "COD"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method === "UPI" && "UPI (PhonePe, GPay, Paytm)"}
              {method === "Card" && "Credit / Debit Card"}
              {method === "COD" && "Cash on Delivery"}
            </label>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Details</h3>
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>₹{product.originalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">− ₹{product.originalPrice - product.price}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>₹{product.price}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default BuyNowPage;
