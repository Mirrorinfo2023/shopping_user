'use client';
import React from 'react';

const applications = [
  {
    serviceType: 'GST Registration',
    applicantInfo: {
      fullName: 'Sachin Shelke',
      mobile: '9876543210',
      address: 'Pune, Maharashtra',
    },
    documents: {
      'Business Name': 'Mayway Business',
      'PAN Card Number': 'ABCDE1234F',
      'Upload PAN Card': { name: 'pancard.jpg' },
      'Aadhaar Number': '1234-5678-9012',
      'Upload Aadhaar Card': { name: 'aadhaar.jpg' },
      'Upload Electricity Bill': { name: 'bill.pdf' },
    },
    status: 'Pending',
  },
  {
    serviceType: 'Shop Act License',
    applicantInfo: {
      fullName: 'Rahul Patil',
      mobile: '9123456789',
      address: 'Nashik, Maharashtra',
    },
    documents: {
      'Owner Name': 'Rahul Patil',
      'Shop Address': 'Main Street, Nashik',
      'Owner Aadhaar Number': '9876-5432-1098',
      'Upload Owner Aadhaar Card': { name: 'rahul_aadhaar.pdf' },
      'Owner PAN Number': 'FGHIJ9876L',
      'Upload Owner PAN Card': { name: 'rahul_pan.jpg' },
      'Upload Owner Photo': { name: 'rahul_photo.png' },
      'Upload Rent Agreement / NOC': { name: 'noc.pdf' },
    },
    status: 'Approved',
  },
  {
    serviceType: 'FSSAI License',
    applicantInfo: {
      fullName: 'Anjali Deshmukh',
      mobile: '9988776655',
      address: 'Nagpur, Maharashtra',
    },
    documents: {
      'Business Type': 'Catering',
      'PAN Number': 'ZXYW1234R',
      'Upload PAN Card': { name: 'fssai_pan.jpg' },
      'Upload Photo ID Proof': { name: 'id_proof.pdf' },
      'Upload Electricity Bill': { name: 'elec_bill.jpeg' },
      'Upload Declaration Form': { name: 'declaration.docx' },
      'Upload Proof of Premises': { name: 'proof_premises.pdf' },
    },
    status: 'Rejected',
  },
  {
    serviceType: 'LLP Registration',
    applicantInfo: {
      fullName: 'Meena Joshi',
      mobile: '8899001122',
      address: 'Mumbai, Maharashtra',
    },
    documents: {
      'Partners Detail': 'Meena Joshi, Amit Sharma',
      'Upload Address Proof': { name: 'address_proof.jpg' },
      'Upload Digital Signature (DSC)': { name: 'dsc_file.zip' },
      'Partner PAN Number': 'LMNOP6789T',
      'Upload PAN of Partners': { name: 'partner_pan.pdf' },
      'Upload Consent of Partners': { name: 'consent_letter.jpg' },
    },
    status: 'Pending',
  },
  {
    serviceType: 'Udyam (MSME) Registration',
    applicantInfo: {
      fullName: 'Sunil Kale',
      mobile: '9001234567',
      address: 'Aurangabad, Maharashtra',
    },
    documents: {
      'Business Name': 'Sunil Electronics',
      'Owner Aadhaar Number': '1111-2222-3333',
      'Upload Aadhaar Card of Owner': { name: 'sunil_aadhaar.pdf' },
      'PAN Number of Owner': 'GHJKL4321Z',
      'Upload PAN Card of Owner': { name: 'sunil_pan.jpg' },
      'Upload Cancelled Cheque': { name: 'cancelled_cheque.jpeg' },
    },
    status: 'Approved',
  },
];


const statusColor = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function TaxationReports() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-16">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Submitted Taxation Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-blue-600">
                  {app.serviceType}
                </h3>

                {/* Status Badge */}
                {app.status && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${statusColor[app.status]}`}
                  >
                    {app.status}
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <strong>Applicant:</strong> {app.applicantInfo.fullName}
                </p>
                <p>
                  <strong>Mobile:</strong> {app.applicantInfo.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {app.applicantInfo.address}
                </p>
              </div>

              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Documents & Details:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {Object.entries(app.documents).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong>{' '}
                      {typeof value === 'object' && value?.name
                        ? value.name
                        : value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
