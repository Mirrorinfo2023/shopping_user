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
  { title: "Recharge", icon: <FaPhoneAlt />, link: "/bbps-services/recharge", badge: "5.0%" },
  { title: "BBPS", icon: <FaMoneyCheckAlt />, link: "/bbps-services/bbps", badge: "5.0%" },
  { title: "History", icon: <FaHistory />, link: "/bbps-services/transactions" },
  { title: "Wallet", icon: <FaWallet />, link: "/bbps-services/wallet" },
  { title: "Support", icon: <FaHeadset />, link: "/bbps-services/support" },
  { title: "Taxation", icon: <FaFileInvoiceDollar />, link: "/bbps-services/taxation" },
  { title: "Electricity", icon: <FaBolt />, link: "/bbps-services/electricity", badge: "5.0%" },
  { title: "DTH", icon: <FaTv />, link: "/bbps-services/dth", badge: "5.0%" },
  { title: "Gas", icon: <FaFire />, link: "/bbps-services/gas" },
  { title: "Loan", icon: <FaMoneyCheckAlt />, link: "/bbps-services/loan" },
  { title: "Insurance", icon: <FaShieldAlt />, link: "/bbps-services/insurance" },
  { title: "PanCard", icon: <FaIdCard />, link: "/bbps-services/pan-card" },
];

// Dropdown Options
const serviceOptionsMap = {
  Recharge: [
    { title: "New Recharge", icon: <FaEdit />, href: "/bbps-services/recharge/new" },
    { title: "Recharge History", icon: <FaHistory />, href: "/bbps-services/recharge/history" },
  ],
  BBPS: [
    { title: "New Bill Payment", icon: <FaEdit />, href: "/bbps-services/bbps/new" },
    { title: "BBPS History", icon: <FaHistory />, href: "/bbps-services/bbps/history" },
  ],
  History: [
    { title: "All Transactions", icon: <FaHistory />, href: "/bbps-services/transactions" },
    { title: "Download Report", icon: <FaChartLine />, href: "/bbps-services/transactions/report" },
  ],
  Wallet: [
    { title: "Add Money", icon: <FaEdit />, href: "/bbps-services/wallet/add" },
    { title: "Send Money", icon: <FaShareAlt />, href: "/bbps-services/wallet/send" },
    { title: "Withdraw", icon: <FaTrash />, href: "/bbps-services/wallet/withdraw" },
  ],
  Support: [
    { title: "Contact Support", icon: <FaHeadset />, href: "/bbps-services/support/contact" },
    { title: "Raise Ticket", icon: <FaEdit />, href: "/bbps-services/support/ticket" },
  ],
  Taxation: [
    { title: "Apply", icon: <FaFileInvoiceDollar />, href: "/bbps-services/taxation/apply" },
    { title: "Reports", icon: <FaChartLine />, href: "/bbps-services/taxation/reports" },
  ],
  Electricity: [
    { title: "Pay Bill", icon: <FaEdit />, href: "/bbps-services/electricity/pay" },
    { title: "Bill History", icon: <FaHistory />, href: "/bbps-services/electricity/history" },
  ],
  DTH: [
    { title: "Recharge DTH", icon: <FaEdit />, href: "/bbps-services/dth/recharge" },
    { title: "DTH History", icon: <FaHistory />, href: "/bbps-services/dth/history" },
  ],
  Gas: [
    { title: "Book Cylinder", icon: <FaEdit />, href: "/bbps-services/gas/book" },
    { title: "Gas History", icon: <FaHistory />, href: "/bbps-services/gas/history" },
  ],
  Loan: [
    { title: "Apply Loan", icon: <FaEdit />, href: "/bbps-services/loan/apply" },
    { title: "Loan History", icon: <FaHistory />, href: "/bbps-services/loan/history" },
  ],
  Insurance: [
    { title: "Buy Insurance", icon: <FaEdit />, href: "/bbps-services/insurance/buy" },
    { title: "My Policies", icon: <FaHistory />, href: "/bbps-services/insurance/history" },
  ],
  PanCard: [
    { title: "Apply PAN", icon: <FaEdit />, href: "/bbps-services/pan-card/apply" },
    { title: "Check Status", icon: <FaInfoCircle />, href: "/bbps-services/pan-card/status" },
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
