'use client';
import React, { useState } from 'react';

const services = {
  'GST Registration': [
    { label: 'Business Name', type: 'text' },
    { label: 'PAN Card Number', type: 'text' },
    { label: 'Upload PAN Card', type: 'file' },
    { label: 'Aadhaar Number', type: 'text' },
    { label: 'Upload Aadhaar Card', type: 'file' },
    { label: 'Upload Electricity Bill', type: 'file' },
    { label: 'Upload Passport Size Photo', type: 'file' },
    { label: 'Upload Cancelled Cheque', type: 'file' },
  ],
  'Shop Act License': [
    { label: 'Owner Name', type: 'text' },
    { label: 'Shop Address', type: 'text' },
    { label: 'Owner Aadhaar Number', type: 'text' },
    { label: 'Upload Owner Aadhaar Card', type: 'file' },
    { label: 'Owner PAN Number', type: 'text' },
    { label: 'Upload Owner PAN Card', type: 'file' },
    { label: 'Upload Owner Photo', type: 'file' },
    { label: 'Upload Rent Agreement / NOC', type: 'file' },
  ],
  'FSSAI License': [
    { label: 'Business Type', type: 'text' },
    { label: 'PAN Number', type: 'text' },
    { label: 'Upload PAN Card', type: 'file' },
    { label: 'Upload Photo ID Proof', type: 'file' },
    { label: 'Upload Electricity Bill', type: 'file' },
    { label: 'Upload Declaration Form', type: 'file' },
    { label: 'Upload Proof of Premises', type: 'file' },
  ],
  'LLP Registration': [
    { label: 'Partners Detail', type: 'text' },
    { label: 'Upload Address Proof', type: 'file' },
    { label: 'Upload Digital Signature (DSC)', type: 'file' },
    { label: 'Partner PAN Number', type: 'text' },
    { label: 'Upload PAN of Partners', type: 'file' },
    { label: 'Upload Consent of Partners', type: 'file' },
  ],
  'Udyam (MSME) Registration': [
    { label: 'Business Name', type: 'text' },
    { label: 'Owner Aadhaar Number', type: 'text' },
    { label: 'Upload Aadhaar Card of Owner', type: 'file' },
    { label: 'PAN Number of Owner', type: 'text' },
    { label: 'Upload PAN Card of Owner', type: 'file' },
    { label: 'Upload Cancelled Cheque', type: 'file' },
  ],
  'Import Export Code (IEC)': [
    { label: 'Business Name', type: 'text' },
    { label: 'PAN Number', type: 'text' },
    { label: 'Upload PAN Card of Business', type: 'file' },
    { label: 'Upload Address Proof', type: 'file' },
    { label: 'Upload Cancelled Cheque', type: 'file' },
    { label: 'Upload Photo ID', type: 'file' },
  ],
  'Trademark Registration': [
    { label: 'Applicant Name', type: 'text' },
    { label: 'PAN Number', type: 'text' },
    { label: 'Upload PAN Card', type: 'file' },
    { label: 'Upload Logo (Optional)', type: 'file' },
    { label: 'Upload Power of Attorney (TM-48)', type: 'file' },
    { label: 'Upload User Affidavit', type: 'file' },
  ],
  'Professional Tax Registration': [
    { label: 'Business Name', type: 'text' },
    { label: 'Owner PAN Number', type: 'text' },
    { label: 'Upload PAN Card of Owner', type: 'file' },
    { label: 'Upload Business Address Proof', type: 'file' },
    { label: 'Owner Aadhaar Number', type: 'text' },
    { label: 'Upload Aadhaar Card of Owner', type: 'file' },
    { label: 'Upload Cancelled Cheque', type: 'file' },
  ],
};

export default function TaxationServicesScreen() {
  const [selectedService, setSelectedService] = useState('');
  const [commonData, setCommonData] = useState({
    fullName: '',
    photo: null,
    mobile: '',
    address: '',
  });
  const [serviceData, setServiceData] = useState({});

  const handleCommonChange = (field, value) => {
    setCommonData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (label, value) => {
    setServiceData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = () => {
    const allData = {
      serviceType: selectedService,
      applicantInfo: commonData,
      documents: serviceData,
    };
    alert('Form Submitted:\n' + JSON.stringify(allData, null, 2));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 pt-16">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Taxation Services Application</h2>

      {/* Common Info Section */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
        <h3 className="text-md font-semibold text-blue-700 mb-2">Applicant Information</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={commonData.fullName}
          onChange={(e) => handleCommonChange('fullName', e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleCommonChange('photo', e.target.files[0])}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={commonData.mobile}
          onChange={(e) => handleCommonChange('mobile', e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />

        <textarea
          placeholder="Full Address"
          value={commonData.address}
          onChange={(e) => handleCommonChange('address', e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* Service Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Service Type</label>
        <select
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setServiceData({});
          }}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="">-- Choose Service --</option>
          {Object.keys(services).map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Fields */}
      {selectedService && (
        <div className="bg-white rounded-xl p-4 shadow space-y-4">
          <h3 className="text-md font-semibold mb-2 text-blue-600">
            {selectedService} - Required Documents
          </h3>

          {services[selectedService].map(({ label, type }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              {type === 'file' ? (
                <input
                  type="file"
                  onChange={(e) => handleServiceChange(label, e.target.files[0])}
                  className="w-full border px-3 py-2 rounded-md text-sm"
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  value={serviceData[label] || ''}
                  onChange={(e) => handleServiceChange(label, e.target.value)}
                  className="w-full border px-3 py-2 rounded-md text-sm"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}
