'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const userId = "12345"; // Example logged-in user UUID

const CheckoutUI = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showChangeAddressModal, setShowChangeAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });
  const router = useRouter();

  const handlePayment = () => {
    // Save cart data to localStorage to use in payment page
    localStorage.setItem('paymentCart', JSON.stringify(cartItems));
    localStorage.setItem('paymentTotal', total.toFixed(2));

    // Navigate to payment page
    router.push('/checkout/checkout-payment');
  };
  // Fetch cart and addresses
  useEffect(() => {
    const storedCart = localStorage.getItem("checkoutCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    fetchAddresses();
  }, []);

  // Fetch addresses for user
  const fetchAddresses = () => {
    fetch(`https://secure1.mirrorhub.in/api/addresses/getbyid/${userId}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const allAddresses = data.address;
          setAddresses(allAddresses);

          const defaultAddr = allAddresses.find(a => a.isDefault) ||
            allAddresses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          setSelectedAddress(defaultAddr);
        }
      });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((acc, item) => acc + ((item.price - (item.finalPrice || item.price)) * item.quantity), 0);
  const total = subtotal - discount;

  // Add or update address
  const handleSaveAddress = () => {
    const apiUrl = editingAddress
      ? `https://secure1.mirrorhub.in/api/addresses/update/${editingAddress._id}`
      : 'https://secure1.mirrorhub.in/api/addresses/create';

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newAddress, userId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchAddresses();
          setShowAddAddress(false);
          setEditingAddress(null);
          setNewAddress({
            fullName: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
          });
        } else {
          alert(data.message || "Failed to save address");
        }
      });
  };

  // Delete address
  const handleDeleteAddress = (addressId) => {
    fetch(`https://secure1.mirrorhub.in/api/addresses/remove/${addressId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => { if (data.success) fetchAddresses(); });
  };

  // Select address and update default
  const handleSelectAddress = async (addr) => {
    setSelectedAddress(addr);

    for (let a of addresses) {
      await fetch(`https://secure1.mirrorhub.in/api/addresses/update/${a._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...a, isDefault: a._id === addr._id })
      });
    }

    fetchAddresses();
    setShowChangeAddressModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 flex flex-col lg:flex-row gap-6">

      {/* Left Column */}
      <div className="flex-1 space-y-6">

        {/* Saved / Selected Address */}
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <div className="flex gap-2">
              {addresses.length > 1 && (
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setShowChangeAddressModal(true)}
                >
                  Change Address
                </button>
              )}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => { setShowAddAddress(true); setEditingAddress(null); }}
              >
                Add New
              </button>
            </div>
          </div>
          {selectedAddress ? (
            <div className="text-sm text-gray-700">
              <p>{selectedAddress.fullName}, {selectedAddress.phone}</p>
              <p>{selectedAddress.addressLine1}, {selectedAddress.addressLine2}</p>
              <p>{selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}</p>
              <p>{selectedAddress.country}</p>
            </div>
          ) : (
            <p className="text-gray-500">No address selected.</p>
          )}
        </div>

        {/* Cart Items */}
        <div className="bg-white p-4 rounded shadow border border-gray-200 space-y-4">
          {cartItems.length > 0 ? cartItems.map(item => (
            <div key={item._id} className="flex gap-4">
              <Image src={item.image} alt={item.productName} width={80} height={80} className="rounded" />
              <div className="flex-1">
                <p className="font-semibold">{item.productId?.productName || item.name}</p>
                <p className="text-gray-500 text-sm">{item.variant}</p>
                <p className="text-gray-400 text-xs">Seller: {item.seller || 'Unknown'}</p>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="line-through text-gray-400 text-sm">₹{item.price.toLocaleString()}</span>
                  <span className="font-bold text-lg">₹{(item.finalPrice || item.price).toLocaleString()}</span>
                </div>
                {/* Removed Protect Promise Fee line */}
              </div>
            </div>
          )) : <p className="text-gray-500">Cart is empty.</p>}
        </div>
      </div>

      {/* Right Column - Price Details */}
      <div className="w-full lg:w-1/3 flex flex-col space-y-4">
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <h2 className="font-semibold text-lg mb-4">PRICE DETAILS</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Price ({cartItems.length} item)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>− ₹{discount.toLocaleString()}</span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="text-green-600 text-sm mt-1">
            You will save ₹{discount.toFixed(2).toLocaleString('en-IN')} on this order
          </p>        
          </div>
      </div>

      {/* Place Order button fixed bottom */}
       <div className="fixed bottom-0 left-0 w-full lg:w-auto lg:right-0 bg-white p-4 border-t border-gray-200 flex justify-center lg:justify-end">
      <button
        onClick={handlePayment}
        className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600 transition"
      >
        Process to Pay ₹{Number(total.toFixed(2)).toLocaleString('en-IN')}
      </button>
    </div>

      {/* Add / Edit Address Modal */}
      {showAddAddress && (
        <div
          className="fixed inset-0 flex justify-center items-start z-50 pt-10  bg-opacity-140"
          onClick={() => { setShowAddAddress(false); setEditingAddress(null); }}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-semibold text-lg mb-4">{editingAddress ? "Edit Address" : "Add Address"}</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => { setShowAddAddress(false); setEditingAddress(null); }}
            >
              ✕
            </button>
            <div className="space-y-2">
              {["fullName", "phone", "addressLine1", "addressLine2", "city", "state", "pincode", "country"].map(field => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border border-gray-300 p-2 rounded"
                  value={newAddress[field]}
                  onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                />
              ))}
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={handleSaveAddress}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Change Address Modal */}
      {showChangeAddressModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setShowChangeAddressModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-semibold text-lg mb-4">Select Address</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowChangeAddressModal(false)}
            >
              ✕
            </button>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {addresses.map(addr => (
                <div
                  key={addr._id}
                  className={`p-2 border rounded flex justify-between items-center ${selectedAddress?._id === addr._id ? 'border-blue-500' : 'border-gray-300'}`}
                >
                  <div>
                    <p className="font-semibold">{addr.fullName}, {addr.phone}</p>
                    <p>{addr.addressLine1}, {addr.addressLine2}</p>
                    <p>{addr.city}, {addr.state}, {addr.pincode}</p>
                    <p>{addr.country}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="text-blue-600 hover:underline text-sm" onClick={() => handleSelectAddress(addr)}>Select</button>
                    <button
                      className="text-green-600 hover:underline text-sm"
                      onClick={() => { setEditingAddress(addr); setNewAddress(addr); setShowAddAddress(true); setShowChangeAddressModal(false); }}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline text-sm"
                      onClick={() => { handleDeleteAddress(addr._id); if (selectedAddress?._id === addr._id) setSelectedAddress(null); }}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutUI;
