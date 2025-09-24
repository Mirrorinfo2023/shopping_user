'use client';
import React, { useState } from 'react';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUserFriends,
  FaChair,
} from 'react-icons/fa';

export default function FlightBookingPage() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  const handleSubmit = () => {
    if (!fromCity || !toCity || !departureDate || passengers < 1) {
      alert('Please fill in all required fields.');
      return;
    }
    alert(`Searching flights from ${fromCity} to ${toCity}`);
  };

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-6 pt-20 text-black">
      <h1 className="text-xl font-bold text-blue-700 mb-5">Book Your Flight</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        {/* From City */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="relative">
            <FaPlaneDeparture className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="City of Departure"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* To City */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="relative">
            <FaPlaneArrival className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Destination City"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Departure Date</label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date (Optional)</label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium mb-1">Passengers</label>
          <div className="relative">
            <FaUserFriends className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              min={1}
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            />
          </div>
        </div>

        {/* Travel Class */}
        <div>
          <label className="block text-sm font-medium mb-1">Travel Class</label>
          <div className="relative">
            <FaChair className="absolute left-3 top-3 text-gray-400" />
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-md text-sm text-black"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
}
