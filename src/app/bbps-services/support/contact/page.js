'use client';

import React from 'react';
import { FaWhatsapp, FaTelegram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactSupportPage() {
  const supportOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      action: () => window.open('https://wa.me/919876543210', '_blank'),
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="text-blue-500 text-2xl" />,
      action: () => window.open('https://t.me/your_support_channel', '_blank'),
    },
    {
      name: 'Gmail',
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      action: () =>
        window.open('mailto:support@example.com?subject=Support%20Request', '_blank'),
    },
    {
      name: 'Call',
      icon: <FaPhoneAlt className="text-blue-600 text-2xl" />,
      action: () => (window.location.href = 'tel:+919876543210'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-16">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
        📞 Contact & Support
      </h1>

      <p className="text-gray-700 text-center mb-6 text-sm max-w-md mx-auto">
        If you have any queries or need assistance, feel free to reach out to us via any of the
        platforms below. Our support team is available 24/7 to help you.
      </p>

      {/* Support Boxes */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {supportOptions.map((option) => (
          <div
            key={option.name}
            onClick={option.action}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition"
          >
            {option.icon}
            <p className="mt-2 font-semibold text-gray-800">{option.name}</p>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-10 max-w-md mx-auto bg-white p-4 rounded-xl shadow text-gray-700 text-sm leading-relaxed">
        <p><strong>Support Hours:</strong> 24x7 available</p>
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Note:</strong> For urgent issues, WhatsApp and call support are recommended.</p>
      </div>
    </div>
  );
}
