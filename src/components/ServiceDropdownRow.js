'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaMoneyCheckAlt,
  FaHistory,
  FaWallet,
  FaHeadset,
  FaFileInvoiceDollar,
  FaBolt,
  FaTv,
  FaFire,
  FaPlane,
  FaShieldAlt,
  FaChartLine,
  FaHeart,
  FaShareAlt,
  FaEdit,
  FaTrash,
  FaInfoCircle,
  FaIdCard
} from "react-icons/fa";

// Services List with badges
const services = [
  { title: "Recharge", icon: <FaPhoneAlt />, link: "/recharge", badge: "5.0%" },
  { title: "BBPS", icon: <FaMoneyCheckAlt />, link: "/bbps", badge: "5.0%" },
  { title: "History", icon: <FaHistory />, link: "/transactions" },
  { title: "Wallet", icon: <FaWallet />, link: "/wallet" },
  { title: "Support", icon: <FaHeadset />, link: "/support" },
  { title: "Taxation", icon: <FaFileInvoiceDollar />, link: "/taxation" },
  { title: "Electricity", icon: <FaBolt />, link: "/electricity", badge: "5.0%" },
  { title: "DTH", icon: <FaTv />, link: "/dth", badge: "5.0%" },
  { title: "Gas", icon: <FaFire />, link: "/gas" },
  { title: "Loan", icon: <FaMoneyCheckAlt />, link: "/loan" },
  { title: "Insurance", icon: <FaShieldAlt />, link: "/insurance" },
  { title: "Pan Card", icon: <FaIdCard />, link: "/pan-card" },
];

// Dropdown Options
const serviceOptionsMap = {
  Recharge: [
    { title: "New Recharge", icon: <FaEdit />, href: "/recharge/new" },
    { title: "Recharge History", icon: <FaHistory />, href: "/recharge/history" },
  ],
  BBPS: [
    { title: "New Bill Payment", icon: <FaEdit />, href: "/bbps/new" },
    { title: "BBPS History", icon: <FaHistory />, href: "/bbps/history" },
  ],
  History: [
    { title: "All Transactions", icon: <FaHistory />, href: "/transactions" },
    { title: "Download Report", icon: <FaChartLine />, href: "/transactions/report" },
  ],
  Wallet: [
    { title: "Add Money", icon: <FaEdit />, href: "/wallet/add" },
    { title: "Send Money", icon: <FaShareAlt />, href: "/wallet/send" },
    { title: "Withdraw", icon: <FaTrash />, href: "/wallet/withdraw" },
  ],
  Support: [
    { title: "Contact Support", icon: <FaHeadset />, href: "/support/contact" },
    { title: "Raise Ticket", icon: <FaEdit />, href: "/support/ticket" },
  ],
  Taxation: [
    { title: "Apply", icon: <FaFileInvoiceDollar />, href: "/taxation/apply" },
    { title: "Reports", icon: <FaChartLine />, href: "/taxation/reports" },
  ],
  Electricity: [
    { title: "Pay Bill", icon: <FaEdit />, href: "/electricity/pay" },
    { title: "Bill History", icon: <FaHistory />, href: "/electricity/history" },
  ],
  DTH: [
    { title: "Recharge DTH", icon: <FaEdit />, href: "/dth/recharge" },
    { title: "DTH History", icon: <FaHistory />, href: "/dth/history" },
  ],
  Gas: [
    { title: "Book Cylinder", icon: <FaEdit />, href: "/gas/book" },
    { title: "Gas History", icon: <FaHistory />, href: "/gas/history" },
  ],
  Loan: [
    { title: "Apply Loan", icon: <FaEdit />, href: "/loan/apply" },
    { title: "Loan History", icon: <FaHistory />, href: "/loan/history" },
  ],
  Insurance: [
    { title: "Buy Insurance", icon: <FaEdit />, href: "/insurance/buy" },
    { title: "My Policies", icon: <FaHistory />, href: "/insurance/history" },
  ],
  "Pan Card": [
    { title: "Apply PAN", icon: <FaEdit />, href: "/pan-card/apply" },
    { title: "Check Status", icon: <FaInfoCircle />, href: "/pan-card/status" },
  ],
};

export default function ServiceDropdownRow() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => {
    setOpenDropdown(prev => (prev === title ? null : title));
  };

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {services.map((service, i) => (
          <div key={i} className="relative w-full">
            <button
              onClick={() => toggleDropdown(service.title)}
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

            {/* Dropdown Menu */}
            {openDropdown === service.title && (
              <ul className="absolute top-full mt-2 left-0 w-64 bg-white text-black rounded-md shadow-lg z-[9999]">
                {(serviceOptionsMap[service.title] || []).map((option, j) => (
                  <li key={j} className="border-b last:border-none">
                    {option.href ? (
                      <Link
                        href={option.href}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <span className="text-blue-600">{option.icon}</span>
                        {option.title}
                      </Link>
                    ) : (
                      <button
                        onClick={option.onClick}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <span className="text-blue-600">{option.icon}</span>
                        {option.title}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
