"use client";

import React from "react";
import routes from '../../constants/routes';
import Link from "next/link"; 

import Shopping from "./Shopping";
import ServiceDropdownRow from "@/components/ServiceDropdownRow";
import {
  FaPhoneAlt,
  FaMoneyCheckAlt,
  FaHistory,
  FaWallet,
  FaHeadset,
  FaQrcode,
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
  FaIdCard,
} from "react-icons/fa";
import ReviewForm from "@/components/api_components/review/create_review";



function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning ☀️";
  if (hour < 17) return "Good Afternoon 🌤️";
  if (hour < 20) return "Good Evening 🌇";
  return "Good Night 🌙";
}

const services = [
  { title: "Recharge", icon: <FaPhoneAlt />, link: "/recharge" },
  { title: "BBPS", icon: <FaMoneyCheckAlt />, link: "/bbps" },
  { title: "Transactions", icon: <FaHistory />, link: "/transactions" },
  { title: "Wallet", icon: <FaWallet />, link: "/wallet" },
  { title: "Support", icon: <FaHeadset />, link: "/support" },
  { title: "Scan & Pay", icon: <FaQrcode />, link: "/scan-pay" },
  { title: "Electricity", icon: <FaBolt />, link: "/electricity" },
  { title: "DTH", icon: <FaTv />, link: "/dth" },
  { title: "Gas", icon: <FaFire />, link: "/gas" },
  { title: "Flights", icon: <FaPlane />, link: "/flights" },
  { title: "Insurance", icon: <FaShieldAlt />, link: "/insurance" },
  { title: "Pan Card", icon: <FaIdCard />, link: "/pan-card" },
];

const serviceOptionsMap = {
  Recharge: [
    { title: "View Recharge History", icon: <FaHistory />, href: "/recharge/history" },
    { title: "New Recharge", icon: <FaEdit />, href: "/recharge/new" },
    { title: "Favorite Plans", icon: <FaHeart />, href: "/recharge/favorites" },
    { title: "Recharge Reports", icon: <FaChartLine />, href: "/recharge/reports" },
    { title: "Share Recharge", icon: <FaShareAlt />, onClick: () => alert("Share Recharge link") },
    { title: "Delete Saved Number", icon: <FaTrash />, onClick: () => alert("Deleting saved number...") },
  ],
  BBPS: [
    { title: "View Billers", icon: <FaInfoCircle />, href: "/bbps/billers" },
    { title: "New Bill Payment", icon: <FaEdit />, href: "/bbps/new" },
    { title: "BBPS History", icon: <FaHistory />, href: "/bbps/history" },
    { title: "Favorite Billers", icon: <FaHeart />, href: "/bbps/favorites" },
    { title: "BBPS Reports", icon: <FaChartLine />, href: "/bbps/reports" },
    { title: "Share BBPS", icon: <FaShareAlt />, onClick: () => alert("Share BBPS feature") },
  ],
};

export default function HomeScreen() {
  // const [cartCount, setCartCount] = useState(3); 
  const greeting = getGreeting();
  const rowsData = services.map((s) => ({
    title: s.title,
    icon: s.icon,
    options: serviceOptionsMap[s.title] || [],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-orange-500 text-white p-6 font-mon pt-14">
      {/* <div className="flex justify-between items-center text-4xl font-extrabold tracking-tight animate-fadeIn drop-shadow-lg">
        {greeting}

        <div className="flex items-center gap-4">
          <Link href={routes.cart}>
            <div className="relative inline-block">
              <div className="text-sm font-semibold text-white bg-blue-500 px-4 py-1.5 rounded-full shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer flex items-center gap-1">
                🛒 Cart
              </div>

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                3
              </span>
            </div>
          </Link>


          <Link href={routes.login}>
            <div className="text-base font-semibold text-white bg-orange-500 px-4 py-1 rounded-full shadow hover:bg-orange-600 cursor-pointer">
              Login
            </div>
          </Link>

        </div>
      </div> */}

            {/* <Link href={routes.login}>
            <div className="text-base font-semibold text-white bg-orange-500 px-4 py-1 rounded-full shadow hover:bg-orange-600 cursor-pointer">
              Login
            </div>
          </Link> */}

      <div className="flex justify-between items-center mt-2">
        <div className="text-xl opacity-90 font-medium">
          Welcome to Mirror Services
        </div>

        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          Wallet Points: <span className="font-bold">125</span>
        </div>

      </div>
      <div className="mt-6">
  <ReviewForm 
    productId="6887a99231f4d4401ebbb90a" 
    customerId="12345" 
  />
</div>



      <ServiceDropdownRow />


      <div className="mt-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
          Unlock More Power. Scale Your Business.
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 font-medium mb-6 max-w-2xl mx-auto">
          Access advanced features, real-time reports, and premium tools — all in one seamless dashboard experience.
        </p>
        {/* <Link
          href={routes.dashboard}
          className="inline-block bg-orange-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-orange-700 transition duration-300"
        >
          Go to Dashboard →
        </Link> */}
      </div>



      {/* <Link href="/productpage">
            <div className="text-sm font-semibold text-white bg-blue-500 px-4 py-1.5 rounded-full shadow-md hover:bg-blue-600 transition duration-200 cursor-pointer flex items-center gap-1">
               product
            </div>
          </Link> */}

      <div>
        {/* <h1 className="text-2xl font-bold text-center my-4">Mirror Shopping</h1> */}
        <Shopping />
      </div>


      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-3">🔥 Trending Offers</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white text-orange-600 p-4 rounded-lg shadow flex-1 min-w-[200px]">
            Get 10% cashback on Recharge
          </div>
          <div className="bg-white text-orange-600 p-4 rounded-lg shadow flex-1 min-w-[200px]">
            Book Flights & Save ₹500
          </div>
          <div className="bg-white text-orange-600 p-4 rounded-lg shadow flex-1 min-w-[200px]">
            Pay Electricity Bill & Win Gifts
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-3">💬 What Our Users Say</h2>
        <div className="bg-white text-gray-800 p-4 rounded-lg shadow mb-4">
          <p>Mirror Services made my daily payments super easy</p>
          <strong>- Maruti V.</strong>
        </div>
        <div className="bg-white text-gray-800 p-4 rounded-lg shadow">
          <p>Recharge, bills, wallet  all in one place. Love the simplicity</p>
          <strong>- Priya S.</strong>
        </div>
      </section>

      <div className="mt-10 text-center">
        <h3 className="text-lg mb-2 font-semibold text-white">
          Need Help?
        </h3>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full">
          Contact Support
        </button>
      </div>

      <footer className="mt-10 text-center text-sm opacity-75">
        © 2025 Mirror Services • All rights reserved.
      </footer>
    </div>
  );
}
