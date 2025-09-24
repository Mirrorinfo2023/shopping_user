'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FaMapMarkerAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCreditCard,
  FaLock,
  FaAward,
  FaRocket
} from "react-icons/fa";
import { IoSparkles, IoLocation, IoWallet } from "react-icons/io5";

const userId = "12345";

const CheckoutUI = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showChangeAddressModal, setShowChangeAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((acc, item) => acc + ((item.price - (item.finalPrice || item.price)) * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.18;
  const total = subtotal - discount + shipping ;

  useEffect(() => {
    const storedCart = localStorage.getItem("checkoutCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`https://secure1.mirrorhub.in/api/addresses/getbyid/${userId}`);
      const data = await response.json();
      if (data.success) {
        const allAddresses = data.address;
        setAddresses(allAddresses);
        const defaultAddr = allAddresses.find(a => a.isDefault) || allAddresses[0];
        setSelectedAddress(defaultAddr);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handlePayment = () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      localStorage.setItem('paymentCart', JSON.stringify(cartItems));
      localStorage.setItem('paymentTotal', total.toFixed(2));
      router.push('/checkout/checkout-payment');
    }, 1000);
  };

  const handleSaveAddress = async () => {
    try {
      const apiUrl = editingAddress
        ? `https://secure1.mirrorhub.in/api/addresses/update/${editingAddress._id}`
        : 'https://secure1.mirrorhub.in/api/addresses/create';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAddress, userId })
      });

      const data = await response.json();
      if (data.success) {
        fetchAddresses();
        setShowAddAddress(false);
        setEditingAddress(null);
        setNewAddress({
          fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'India'
        });
      } else {
        alert(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await fetch(`https://secure1.mirrorhub.in/api/addresses/remove/${addressId}`, { 
        method: 'POST' 
      });
      const data = await response.json();
      if (data.success) {
        fetchAddresses();
        if (selectedAddress?._id === addressId) {
          setSelectedAddress(addresses.find(addr => addr._id !== addressId) || null);
        }
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSelectAddress = async (addr) => {
    setSelectedAddress(addr);
    
    // Update default address
    try {
      for (let a of addresses) {
        await fetch(`https://secure1.mirrorhub.in/api/addresses/update/${a._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...a, isDefault: a._id === addr._id })
        });
      }
      fetchAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
    }
    
    setShowChangeAddressModal(false);
  };

  const AddressCard = ({ address, isSelected, onSelect, onEdit, onDelete }) => (
    <div 
      className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
        isSelected 
          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-25 shadow-lg shadow-blue-100' 
          : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
      }`}
      onClick={() => onSelect(address)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-full mt-1 ${
            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <IoLocation className="text-sm" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
              {address.isDefault && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-1">{address.phone}</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {address.addressLine1}, {address.addressLine2}<br/>
              {address.city}, {address.state} - {address.pincode}<br/>
              {address.country}
            </p>
          </div>
        </div>
        
        {isSelected && (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-3">
            <FaCheck className="text-white text-xs" />
          </div>
        )}
      </div>
      
      {!isSelected && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(address); }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <FaEdit className="text-xs" />
            Edit
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(address._id); }}
            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
          >
            <FaTrash className="text-xs" />
            Delete
          </button>
        </div>
      )}
    </div>
  );

  const CartItemCard = ({ item }) => (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg">
        <Image 
          src={item.image || "/placeholder.png"} 
          alt={item.productName || "Product"} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {item.quantity}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg truncate">
          {item.productName || item.name}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{item.variant}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-gray-400 line-through text-sm">
            ₹{item.price.toLocaleString()}
          </span>
          <span className="font-bold text-gray-900 text-lg">
            ₹{(item.finalPrice || item.price).toLocaleString()}
          </span>
          {item.finalPrice < item.price && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Save ₹{(item.price - item.finalPrice).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
          >
            <div className="p-3 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all">
              <FaArrowLeft className="text-lg" />
            </div>
            <span className="font-semibold text-lg">Back to Cart</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
              Checkout
            </h1>
            <p className="text-gray-600 text-lg">Complete your order with confidence</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm">
            <FaShieldAlt className="text-green-500 text-xl" />
            <span className="font-semibold text-gray-900">Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Shipping Address Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Shipping Address</h2>
                    <p className="text-gray-600">Where should we deliver your order?</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {addresses.length > 1 && (
                    <button 
                      onClick={() => setShowChangeAddressModal(true)}
                      className="px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                    >
                      Change
                    </button>
                  )}
                  <button 
                    onClick={() => { setShowAddAddress(true); setEditingAddress(null); }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
                  >
                    <FaPlus className="text-sm" />
                    Add New
                  </button>
                </div>
              </div>

              {selectedAddress ? (
                <AddressCard
                  address={selectedAddress}
                  isSelected={true}
                  onSelect={() => {}}
                  onEdit={(addr) => { setEditingAddress(addr); setNewAddress(addr); setShowAddAddress(true); }}
                  onDelete={handleDeleteAddress}
                />
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                  <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No address selected</p>
                  <button 
                    onClick={() => setShowAddAddress(true)}
                    className="mt-3 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Add your first address
                  </button>
                </div>
              )}
            </div>

            {/* Cart Items Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
                    <FaTruck className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Order Items</h2>
                    <p className="text-gray-600">{cartItems.length} items in your cart</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <CartItemCard key={item._id || index} item={item} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-sm sticky top-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h2>
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  ₹{total.toLocaleString()}
                </div>
                <p className="text-gray-600">Total amount including taxes</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 bg-white/50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-green-600 font-semibold">Discount</span>
                    <span className="text-green-600 font-bold">- ₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
              
                
                
                
                <hr className="border-gray-200 my-2" />
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Savings Highlight */}
              {discount > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-semibold">🎉 You save</span>
                    <span className="text-green-600 font-bold text-xl">₹{discount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedAddress || cartItems.length === 0 || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <FaLock className="text-lg" />
                    <span className="text-lg">Pay Securely</span>
                    <IoSparkles className="text-lg group-hover:animate-pulse" />
                  </div>
                )}
              </button>

              {/* Security Assurance */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
                  <FaShieldAlt className="text-green-500" />
                  <span>256-bit Secure • SSL Encrypted • Trusted by Millions</span>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>

      {/* Add/Edit Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-10 pb-10 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20 relative my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h2>
              <button 
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => { setShowAddAddress(false); setEditingAddress(null); }}
              >
                <span className="text-2xl text-gray-500">×</span>
              </button>
            </div>

            <div className="space-y-4">
              {['fullName', 'phone', 'addressLine1', 'addressLine2', 'city', 'state', 'pincode', 'country'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={newAddress[field]}
                    onChange={(e) => setNewAddress({...newAddress, [field]: e.target.value})}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={handleSaveAddress}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300"
            >
              {editingAddress ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </div>
      )}

      {/* Change Address Modal */}
      {showChangeAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4" onClick={() => setShowChangeAddressModal(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl border border-white/20 max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
              <button 
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setShowChangeAddressModal(false)}
              >
                <span className="text-2xl text-gray-500">×</span>
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {addresses.map(addr => (
                <AddressCard
                  key={addr._id}
                  address={addr}
                  isSelected={selectedAddress?._id === addr._id}
                  onSelect={handleSelectAddress}
                  onEdit={(addr) => { setEditingAddress(addr); setNewAddress(addr); setShowAddAddress(true); setShowChangeAddressModal(false); }}
                  onDelete={handleDeleteAddress}
                />
              ))}
            </div>

            <button 
              onClick={() => { setShowAddAddress(true); setShowChangeAddressModal(false); }}
              className="w-full mt-6 border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add New Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutUI;