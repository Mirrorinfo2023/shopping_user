'use client';

import React, { useState } from "react";
import { 
  FaPhoneAlt, FaMoneyCheckAlt, FaHistory, FaWallet, FaHeadset, 
  FaFileInvoiceDollar, FaBolt, FaTv, FaFire, FaPlane, FaShieldAlt, 
  FaIdCard 
} from "react-icons/fa";

// Services List with optional badges
const services = [
  { title: "Recharge", icon: <FaPhoneAlt />, badge: "5.0%" },
  { title: "BBPS", icon: <FaMoneyCheckAlt />, badge: "5.0%" },
  { title: "History", icon: <FaHistory /> },
  { title: "Wallet", icon: <FaWallet /> },
  { title: "Support", icon: <FaHeadset /> },
  { title: "Taxation", icon: <FaFileInvoiceDollar /> },
  { title: "Electricity", icon: <FaBolt />, badge: "5.0%" },
  { title: "DTH", icon: <FaTv />, badge: "5.0%" },
  { title: "Gas", icon: <FaFire /> },
  { title: "Loan", icon: <FaMoneyCheckAlt /> },
  { title: "Insurance", icon: <FaShieldAlt /> },
  { title: "PanCard", icon: <FaIdCard /> },
];

export default function ServiceDropdownRow() {
  const [comingSoon, setComingSoon] = useState(false);
  const [clickedService, setClickedService] = useState("");

  const handleClick = (title) => {
    setClickedService(title);
    setComingSoon(true);

    // Hide after 2 seconds
    setTimeout(() => setComingSoon(false), 2000);
  };

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {services.map((service, i) => (
          <div key={i} className="relative w-full">
            <button
              onClick={() => handleClick(service.title)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 w-full text-sm flex items-center justify-center gap-1 relative"
            >
              {service.icon} {service.title}

              {/* Badge */}
              {service.badge && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-tr-md rounded-bl-md shadow-sm">
                    {service.badge}
                  </div>
                </div>
              )}
            </button>

            {/* Coming Soon Popup */}
            {comingSoon && clickedService === service.title && (
              <div className="absolute top-0 left-full ml-2 bg-orange-500 text-white px-3 py-1 rounded shadow-lg text-sm whitespace-nowrap z-50">
                Coming Soon!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
