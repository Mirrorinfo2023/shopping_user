'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { 
  FaWallet, 
  FaMoneyBillWave, 
  FaShieldAlt, 
  FaLock, 
  FaArrowLeft,
  FaCheck,
  FaRocket,
  FaAward,
  FaTruck,
  FaStar,
  FaClock
} from "react-icons/fa";
import { 
  IoCard, 
  IoQrCode, 
  IoSparkles,
  IoLogoApple,
  IoLogoGoogle
} from "react-icons/io5";
import { 
  RiVisaFill, 
  RiMastercardFill, 
  RiPaypalFill 
} from "react-icons/ri";
import { 
  SiPaytm, 
  SiGooglepay, 
  SiPhonepe 
} from "react-icons/si";
import Image from "next/image";

const PaymentMethod = ({ method, selectedMethod, onSelect, isPopular, isFastest }) => (
  <div
    className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group backdrop-blur-sm ${
      selectedMethod === method.id
        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-25 shadow-lg shadow-blue-100 scale-[1.02]"
        : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
    }`}
    onClick={() => onSelect(method.id)}
  >
    {isPopular && (
      <div className="absolute -top-2 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
        ⭐ MOST POPULAR
      </div>
    )}
    {isFastest && (
      <div className="absolute -top-2 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
        🚀 FASTEST
      </div>
    )}
    
    <div className="flex items-center">
      <div className={`p-3 rounded-xl mr-4 transition-colors ${
        selectedMethod === method.id 
          ? "bg-blue-500 text-white" 
          : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
      }`}>
        <div className="text-2xl">{method.icon}</div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900">{method.name}</h3>
          {selectedMethod === method.id && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <FaCheck className="text-white text-xs" />
            </div>
          )}
        </div>
        {method.description && (
          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
        )}
        {method.benefits && (
          <div className="flex gap-2 mt-2">
            {method.benefits.map((benefit, index) => (
              <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {benefit}
              </span>
            ))}
          </div>
        )}
        {method.offer && (
          <div className="mt-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-3 py-2">
            <span className="text-amber-700 text-sm font-semibold">🎁 {method.offer}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const CartItem = ({ item }) => (
  <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
      <Image
        src={item.image || "/app_logo.png"} 
        alt={item.name || "Product image"}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
        {item.quantity}
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
      {item.variant && (
        <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
      )}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-gray-600">
          ₹{item.price.toFixed(2).toLocaleString('en-IN')} × {item.quantity}
        </span>
        {item.finalPrice < item.price && (
          <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">
            Save ₹{(item.price - item.finalPrice).toFixed(2)}
          </span>
        )}
      </div>
    </div>
    
    <div className="text-right">
      <div className="font-semibold text-gray-900">
        ₹{((item.finalPrice || item.price) * item.quantity).toFixed(2).toLocaleString('en-IN')}
      </div>
      {item.finalPrice < item.price && (
        <div className="text-sm text-gray-400 line-through">
          ₹{(item.price * item.quantity).toFixed(2).toLocaleString('en-IN')}
        </div>
      )}
    </div>
  </div>
);

const CheckoutPayment = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("paymentCart") || localStorage.getItem("checkoutCart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const paymentMethods = [
    { 
      id: 'upi', 
      name: "UPI Payment", 
      description: "Instant UPI transaction", 
      icon: <IoQrCode />,
      benefits: ["Instant", "Secure"],
    },
    { 
      id: 'cod', 
      name: "Cash on Delivery", 
      description: "Pay when your order is delivered", 
      icon: <FaMoneyBillWave />,
      benefits: ["Pay Later", "Convenient"]
    },
  ];

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((acc, item) => acc + ((item.price - (item.finalPrice || item.price)) * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.18;
  const total = subtotal - discount ;

  const handlePay = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem("paymentCart", JSON.stringify(cartItems));
    localStorage.setItem("paymentTotal", total.toFixed(2));
    router.replace('/checkout/payment-success');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
              <FaArrowLeft className="text-lg" />
            </div>
            <span className="font-semibold">Back to Checkout</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
              Secure Payment
            </h1>
            <p className="text-gray-600">Complete your purchase securely</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 rounded-2xl px-4 py-2 shadow-sm backdrop-blur-sm">
            <FaShieldAlt className="text-green-500" />
            <span className="font-semibold text-gray-900">100% Secure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
          

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaWallet className="text-blue-500" />
                Select Payment Method
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <PaymentMethod
                    key={method.id}
                    method={method}
                    selectedMethod={selectedMethod}
                    onSelect={setSelectedMethod}
                    isPopular={index === 0}
                    isFastest={index === 0}
                  />
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">We Accept</h4>
                <div className="grid grid-cols-6 gap-3 opacity-70">
                  <SiPaytm className="text-2xl text-blue-400" />
                  <SiGooglepay className="text-2xl text-green-400" />
                  <SiPhonepe className="text-2xl text-purple-500" />
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items ({cartItems.length})</h2>
              
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🛒</div>
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Order Summary</h2>

              <div className="space-y-4 bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2).toLocaleString('en-IN')}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold">Discount</span>
                    <span className="text-green-600 font-bold">- ₹{discount.toFixed(2).toLocaleString('en-IN')}</span>
                  </div>
                )}
                
            
                
                <hr className="border-gray-300 my-2" />
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Savings Highlight */}
              {discount > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-semibold">🎉 You save</span>
                    <span className="text-green-600 font-bold">₹{discount.toFixed(2).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePay}
                disabled={isLoading || cartItems.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaLock className="text-lg" />
                    Pay ₹{total.toFixed(2).toLocaleString('en-IN')}
                    <IoSparkles className="text-lg group-hover:animate-pulse" />
                  </div>
                )}
              </button>

              {/* Security Assurance */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <FaLock className="text-green-500" />
                  <span>Secure SSL Encryption • Your data is safe</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-full">
                  <FaStar className="text-white text-sm" />
                </div>
                <h4 className="font-bold text-gray-900">Need Help?</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">Our support team is here to help you</p>
              <button className="w-full bg-white text-blue-600 border border-blue-200 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;