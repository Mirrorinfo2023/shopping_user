'use client';

import { useState, useEffect } from "react";

export default function AddressList({ userId = "12345" }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchAddresses = async () => {
    setLoading(true);
    setMessage("");

    const url = `/api/addresses/getbyid/${userId}`;
    console.log("Fetching addresses from:", url);

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Raw response:", res);
      const data = await res.json();
      console.log("Response JSON:", data);

      if (res.ok && data.success) {
        setAddresses(data.address);
      } else {
        setMessage(data.message || "Failed to fetch addresses");
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Addresses</h1>

      {loading && <p>Loading addresses...</p>}
      {message && <p className="text-red-500">{message}</p>}

      {!loading && addresses.length === 0 && <p>No addresses found.</p>}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr._id} className="border border-gray-300 rounded p-4">
            <p><strong>Name:</strong> {addr.fullName}</p>
            <p><strong>Phone:</strong> {addr.phone}</p>
            <p><strong>Email:</strong> {addr.email}</p>
            <p><strong>Address:</strong> {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}</p>
            <p><strong>Landmark:</strong> {addr.landmark}</p>
            <p><strong>Type:</strong> {addr.addressType}</p>
            <p><strong>Default:</strong> {addr.isDefault ? "Yes" : "No"}</p>
            <p><strong>Billing:</strong> {addr.isBillingAddress ? "Yes" : "No"}</p>
            <p><strong>Shipping:</strong> {addr.isShippingAddress ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
