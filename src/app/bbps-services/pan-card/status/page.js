'use client';
import React from 'react';

const panStatus = {
  appId: 'PAN20250630001',
  name: 'Sachin Shelke',
  submittedOn: '30 June 2025, 10:24 AM',
  status: 'Under Review',
  remarks: 'Your application is being processed. Expected in 3–5 days.',
};

export default function PanStatusScreen() {
  const statusColor = {
    'Under Review': 'text-yellow-600 bg-yellow-100',
    Approved: 'text-green-700 bg-green-100',
    Rejected: 'text-red-600 bg-red-100',
  }[panStatus.status];

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-10">
      <div className="max-w-md mx-auto bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-bold text-blue-700 mb-4">PAN Card Application Status</h2>

        <div className="text-sm space-y-2">
          <p><strong>Application ID:</strong> {panStatus.appId}</p>
          <p><strong>Applicant Name:</strong> {panStatus.name}</p>
          <p><strong>Submitted On:</strong> {panStatus.submittedOn}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`inline-block px-2 py-1 rounded ${statusColor}`}>
              {panStatus.status}
            </span>
          </p>
          {panStatus.remarks && (
            <p className="text-gray-600 mt-2">
              <strong>Remarks:</strong> {panStatus.remarks}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
