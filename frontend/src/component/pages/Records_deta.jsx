import React from 'react';
import { useAuth } from '../context/Auth';

const Records_deta = () => {
  const { auth } = useAuth();

  // Helper function to format date fields
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString(); // This will format the date to a readable string.
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Field</th>
                <th className="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">User Name</td>
                <td className="px-6 py-4">{auth?.user?.userName || 'N/A'}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Employee ID</td>
                <td className="px-6 py-4">{auth?.user?.emp_Id || 'N/A'}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Last Login</td>
                <td className="px-6 py-4">{formatDate(auth?.user?.lastlogin)}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Last Logout</td>
                <td className="px-6 py-4">{formatDate(auth?.user?.lastLogout)}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Created At</td>
                <td className="px-6 py-4">{formatDate(auth?.user?.createdAt)}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Updated At</td>
                <td className="px-6 py-4">{formatDate(auth?.user?.updatedAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Records_deta;
