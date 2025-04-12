import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/Auth';

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/deta');
        if (response.data) {
          toast.success(response.data.message);
          setAuth(response?.data?.user); // Make sure the response data matches this structure
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        setError('Failed to fetch data');
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Download data as an Excel file
  const downloadHandler = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/download-excel', {
        responseType: 'arraybuffer', // Ensures binary response is handled
      });

      if (response.status === 200) {
        const file = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = 'users.xlsx'; // Set the desired file name
        link.click();
        toast.success('File downloaded successfully!');
      } else {
        toast.error('Failed to download the file');
      }
    } catch (error) {
      toast.error('Error downloading the file');
      console.error(error);
    }
  };

  if (loading) return <p className="text-center text-xl font-bold">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h2>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={downloadHandler}
          className="p-3 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition-all duration-300 ease-in-out"
        >
          Download Excel Sheet
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto text-left text-gray-600">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3 border-b">User ID</th>
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Last Login</th>
              <th className="px-6 py-3 border-b">Created At</th>
              <th className="px-6 py-3 border-b">Last Logout</th>
            </tr>
          </thead>
          <tbody>
            {/* Render user data if available */}
            {auth.length > 0 ? (
              auth.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-all duration-200 ease-in-out">
                  <td className="px-6 py-4 border-b">{user.emp_Id}</td>
                  <td className="px-6 py-4 border-b">{user.userName}</td>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 border-b">
                    {user.lastlogin ? new Date(user.lastlogin).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {user.lastLogout ? new Date(user.lastLogout).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 border-b text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
