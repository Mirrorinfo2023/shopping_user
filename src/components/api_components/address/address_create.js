'use client';

import { useState } from "react";

export default function AddressCreate() {
  const [form, setForm] = useState({
    userId: "12345",
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    landmark: "",
    addressType: "home",
    isDefault: true,
    isBillingAddress: true,
    isShippingAddress: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();  
  setLoading(true);
  setMessage("");

  const url = "/api/addresses/create"; 

  try {
    console.log("Payload:", form);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      setMessage("Address created successfully!");
    } else {
      setMessage(data.message || "Failed to create address");
    }
  } catch (err) {
    console.error(err);
    setMessage("Error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Address</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Address Line 1", name: "addressLine1" },
          { label: "Address Line 2", name: "addressLine2" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode" },
          { label: "Country", name: "country" },
          { label: "Landmark", name: "landmark" },
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Address Type</label>
          <select
            name="addressType"
            value={form.addressType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="home">Home</option>
            <option value="office">Office</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            /> Default Address
          </label>
          <label>
            <input
              type="checkbox"
              name="isBillingAddress"
              checked={form.isBillingAddress}
              onChange={handleChange}
            /> Billing Address
          </label>
          <label>
            <input
              type="checkbox"
              name="isShippingAddress"
              checked={form.isShippingAddress}
              onChange={handleChange}
            /> Shipping Address
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Address"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
