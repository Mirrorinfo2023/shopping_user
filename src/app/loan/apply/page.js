'use client';

import React, { useState } from 'react';

export default function LoanInfo() {
  const [step, setStep] = useState(1);

  return (
    <main className="max-w-sm mx-auto my-8 p-6 rounded-xl shadow-md bg-white font-sans text-gray-900 space-y-10">
      {step === 1 && (
        <section className="bg-pink-50 px-4 py-6 rounded-lg shadow-inner text-center">
          <div className="mb-4">
            <img
              src="https://placehold.co/160x160?text=MIRROR+Logo"
              alt="Mirror logo"
              className="mx-auto h-20 w-20 object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <h1 className="text-xl font-bold mb-1">Introducing Mirror Loans for your business!</h1>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">How to become eligible for loans</h2>

          <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-start gap-3 mb-3">
            <div className="bg-green-600 text-white w-7 h-7 flex items-center justify-center rounded font-bold text-lg">✓</div>
            <div>
              <p className="font-semibold">Task completion</p>
              <p className="text-sm">Completing all pending tasks helps you become eligible</p>
            </div>
          </div>

          <div className="bg-green-100 text-green-800 p-3 rounded-lg flex gap-3">
            <div className="bg-green-600 text-white w-7 h-7 flex items-center justify-center rounded font-bold text-lg">⏰</div>
            <div className="text-left text-sm font-semibold space-y-2">
              <p>Mandatory goals</p>
              <ul className="pl-5 list-disc text-gray-800 font-medium space-y-1">
                <li>1 month continuity</li>
                <li>₹2,000 Reward Achieved</li>
                <li>₹2,000 Redeemed</li>
                <li>Silver Rank Achievement</li>
              </ul>
            </div>
          </div>

          <p className="mt-5 text-xs italic text-gray-600">
            <span className="font-bold text-blue-500">Note:</span> Final loan approval is at the discretion of the lending partner.
          </p>

          <button
            onClick={() => setStep(2)}
            className="w-full mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-2 rounded-lg shadow"
          >
            Proceed
          </button>
        </section>
      )}

      {/* === Step 2: Second Section === */}
      {step === 2 && (
        <section className="bg-pink-50 px-4 py-6 rounded-lg shadow-inner text-center">
          <div className="mb-4">
            <img
              src="https://placehold.co/120x120?text=Coin"
              alt="Rupee Coin"
              className="mx-auto h-16 w-16 object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <h1 className="text-lg font-bold mb-4">Get a loan up to ₹5,00,000</h1>

          <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center gap-3 mb-3">
            <div className="bg-green-600 text-white w-7 h-7 flex items-center justify-center rounded font-bold text-lg">✓</div>
            <p className="text-sm font-semibold">You have some pending tasks. Lets finish the payment goals.</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-3 flex items-start gap-3 mb-3 bg-white">
            <div className="bg-green-600 text-white w-7 h-7 flex items-center justify-center rounded font-bold text-lg">✓</div>
            <div className="text-left text-sm">
              <p className="font-bold">Your Rank Score</p>
              <p>Maintain a score above 720</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-left text-sm space-y-3">
            <h3 className="font-bold">Payment goals</h3>
            <p>Achieve both goals for 6 continuous months</p>

            {[
              { label: '1 month continuity', progress: 90 },
              { label: '₹2,000 Reward Achieve', progress: 80 },
              { label: '₹2,000 Redeem Takes', progress: 75 },
              { label: 'Silver Rank Achievement', progress: 65 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-gray-600 font-bold text-xs border border-gray-500 rounded-full px-1.5 py-0.5">i</span>
                <span className="flex-1">{item.label}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs italic text-gray-600">
            <span className="font-bold text-blue-500">Note:</span> Final loan approval is at the discretion of the lending partner.
          </p>

          <button className="w-full mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-2 rounded-lg shadow">
            Take Loan
          </button>
        </section>
      )}
    </main>
  );
}
