'use client';

import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineContacts } from 'react-icons/md';

export default function RechargeForm() {
  return (
    <div className="max-w-md mx-auto pt-10 bg-[#f1f9ff] min-h-screen">
      <h3 className="text-lg font-bold text-black mb-4">
        Enter mobile number you want to recharge
      </h3>

      <div className="bg-white rounded-xl shadow-md p-4">
        {/* Mobile Number Input */}
        <label className="text-sm font-medium block mb-1 text-black sm:text-gray-700">
          Mobile Number
        </label>
        <div className="flex items-center border rounded-md px-3 py-2 mb-4">
          <FaPhoneAlt className="text-black sm:text-gray-500 mr-2" />
          <input
            type="tel"
            placeholder="+91 "
            className="flex-1 outline-none text-sm text-black sm:text-gray-700"
          />
          {/* Optional contact icon */}
          {/* <MdOutlineContacts className="text-black sm:text-gray-400 ml-2 text-lg" /> */}
        </div>

        {/* Operator & Circle */}
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label className="text-xs font-medium text-black sm:text-purple-600">
              Operator
            </label>
            <select className="w-full border mt-1 px-3 py-2 rounded-md text-sm text-black sm:text-gray-700">
              <option value="jio">Jio</option>
              <option value="airtel">Airtel</option>
              <option value="vi">VI (Vodafone Idea)</option>
              <option value="bsnl">BSNL</option>
              <option value="mtnl">MTNL</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-xs font-medium text-black">
              Circle
            </label>
            <select className="w-full border mt-1 px-3 py-2 rounded-md text-sm text-black sm:text-gray-700">
              <option>Andhra Pradesh</option>
              <option>Assam</option>
              <option>Bihar & Jharkhand</option>
              <option>Chennai</option>
              <option>Delhi</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jammu & Kashmir</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Kolkata</option>
              <option>Madhya Pradesh & Chhattisgarh</option>
              <option>Maharashtra & Goa</option>
              <option>Mumbai</option>
              <option>North East</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Tamil Nadu</option>
              <option>Uttar Pradesh (East)</option>
              <option>Uttar Pradesh (West)</option>
              <option>West Bengal</option>
            </select>
          </div>
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between border px-3 py-2 rounded-md mb-4">
          <input
            type="number"
            placeholder="Total Amount"
            className="outline-none text-sm flex-1 text-black sm:text-gray-700"
          />
         
        </div>

        {/* Submit */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm py-2 rounded-full">
          Proceed To Recharge
        </button>
      </div>

      {/* Recents */}
      <div className="bg-white mt-6 py-3 px-4 rounded-lg border text-sm font-semibold text-black">
        Recents Recharge
      </div>
    </div>
  );
}
