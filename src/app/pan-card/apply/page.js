'use client';
import React, { useState } from 'react';

export default function PanCardApplyForm() {
  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    gender: '',
    aadhar: '',
    mobile: '',
    email: '',
    address: '',
    photo: null,
    signature: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">PAN Card Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium">Father Name</label>
            <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="block text-sm font-medium">Aadhar Number</label>
            <input type="text" name="aadhar" value={form.aadhar} onChange={handleChange} required className="w-full border px-3 py-2 rounded" maxLength={12} />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required className="w-full border px-3 py-2 rounded" maxLength={10} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email (optional)</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows="3" required className="w-full border px-3 py-2 rounded"></textarea>
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium">Upload Passport Photo (JPEG/PNG)</label>
            <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Upload Signature */}
          <div>
            <label className="block text-sm font-medium">Upload Signature (JPEG/PNG)</label>
            <input type="file" name="signature" accept="image/*" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
