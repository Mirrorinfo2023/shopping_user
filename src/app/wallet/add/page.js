'use client';

import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function AddMoneyWizard() {
    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [utr, setUtr] = useState('');
    const [paymentMode, setPaymentMode] = useState('UPI');
    const [proof, setProof] = useState(null);

    const goNext = () => setStep(step + 1);
    const goBack = () => setStep(step - 1);

    const handleFileChange = (e) => {
        setProof(e.target.files[0]);
    };

    return (
        <div className="min-h-screen pt-10 bg-sky-50">
            <h1 className="text-xl font-bold text-blue-700 mb-4">Add Money</h1>

            {step === 1 && (
               <div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full border p-2 rounded mb-2"
                    />
                    <div className="flex gap-2 mb-4">
                        {[500, 1000, 2500, 5000].map((val) => (
                            <button
                                key={val}
                                className="bg-green-100 px-3 py-1 rounded"
                                onClick={() => setAmount(val.toString())}
                            >
                                ₹{val}
                            </button>
                        ))}
                    </div>
                    <button
                        className="bg-blue-500 text-white rounded px-4 py-2"
                        onClick={goNext}
                        disabled={!amount}
                    >
                        Proceed
                    </button>
                </div>
            )}

            {step === 2 && (
                

                 <div>
                    <p className="font-semibold text-lg mb-2">Select Add Money Method</p>
                    {['UPI-1', 'UPI-2', 'UPI-3', 'Manual', 'Affiliate To Wallet'].map((method) => (
                        <div key={method} className="bg-white shadow p-4 rounded mb-2 flex justify-between items-center">
                            <span>{method}</span>
                            <input
                                type="radio"
                                name="method"
                                checked={selectedMethod === method}
                                onChange={() => setSelectedMethod(method)}
                            />
                        </div>
                    ))}
                    <button
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
                        onClick={goNext}
                        disabled={!selectedMethod}
                    >
                        Add Money
                    </button>
                </div>

            )}

            {step === 3 && (
                <div>
                    <Image src="/qr.png" alt="QR Code" width={200} height={200} className="mx-auto mb-4" />
                    <div className="text-center mb-4">
                        <p className="text-lg font-bold">mirrorhub@hdfcbank</p>
                    </div>
                    <div className="bg-white rounded p-4 shadow mb-4">
                        <p><b>Bank:</b> IndusInd Bank</p>
                        <p><b>Acc No:</b> 259112421742</p>
                        <p><b>IFSC:</b> INDB0000173</p>
                    </div>
                    <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={goNext}>
                        Add Money Request
                    </button>
                </div>
            )}

            {step === 4 && (
                <div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full border p-2 rounded mb-2"
                    />

                    <input
                        type="number"
                        value={utr}
                        onChange={(e) => setUtr(e.target.value)}
                        placeholder="UTR No."
                        className="w-full border p-2 rounded mb-2"
                    />

                    <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-full border p-2 rounded mb-2"
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="UPI">UPI</option>
                        <option value="IMPS">IMPS</option>
                        <option value="NEFT">NEFT</option>
                    </select>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded mb-2"
                    />

                    <p className="text-gray-700 mb-4 font-medium">
                        <strong>Amount:</strong> ₹{amount}
                    </p>

                    <button
                        className={`w-full bg-blue-500 text-white rounded px-4 py-2 ${!amount || !utr || !paymentMode || !proof ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={goNext}
                        disabled={!amount || !utr || !paymentMode || !proof}
                    >
                        Submit Request
                    </button>
                </div>
            )}

            {step === 5 && (
                <div className="text-center">
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">Request Successful</h2>
                    <p>Your money is on its way and will be added to your wallet within one working day.</p>
                    <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4" onClick={() => setStep(1)}>
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
