'use client';

import React, { useState } from 'react';

export default function BecomeSellerPage() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    shopName: '',
    city: '',
    pincode: '',
    category: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    console.log('Seller Data:', form);
    // You can later send this to Firebase or an API
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 pb-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Become a Seller</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
           Thank you! Your seller and product information has been submitted.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">🧑 Seller Information</h2>
            {[
              { label: 'Full Name', name: 'name' },
              { label: 'Mobile Number', name: 'mobile', type: 'tel' },
              { label: 'Email Address', name: 'email', type: 'email' },
              { label: 'Shop Name', name: 'shopName' },
              { label: 'City', name: 'city' },
              { label: 'Pincode', name: 'pincode' },
              { label: 'Shop Category (e.g. electronics)', name: 'category' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">📦 Product Information</h2>
            {[
              { label: 'Product Name', name: 'productName' },
              { label: 'Product Description', name: 'productDescription' },
              { label: 'Product Price (₹)', name: 'productPrice', type: 'number' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}

            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image (optional)
              </label>
              <input
                type="file"
                name="productImage"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Submit Seller Request
          </button>
        </form>
      )}
    </div>
  );
}
