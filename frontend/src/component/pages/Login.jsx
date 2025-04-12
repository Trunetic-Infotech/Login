import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useAuth } from '../context/Auth';

const Login = () => {
      const [emp_Id, setemp_Id] = useState("");
      const [password, setPassword] = useState("");
      const {auth, setAuth} = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
 try {
      const response = await axios.post("http://localhost:3000/api/v1/user/login", {
            emp_Id,
            password,
          });

          if (response.data.success) {
            toast.success(response.data.message); // Success case
            setAuth({
              ...auth,
              user:response.data.user,
              token:response.data.token,
           })
           
            localStorage.setItem('auth', JSON.stringify(response.data)); // Optionally store user in localStorage
            navigate("/"); // Redirect to homepage after successful login
          } else {
            toast.error(response.data.message); // Error handling from backend
          }
      
 } catch (error) {
       // Error handling
       if (error.response) {
            toast.error(error.response.data.message || "An error occurred");
          } else if (error.request) {
            toast.error("No response from server");
          } else {
            toast.error("An error occurred while submitting the form");
          }
 }
      }
    
  return (
    <div>
      <div className="items-center">
      <section className="bg-gray-100 h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/register"
            className="flex items-center mb-6 text-2xl font-semibold text-red-400 dark:text-white"
          >
            Employee Login
          </Link>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <div className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Please login into an account
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Employee ID Input */}
                <div>
                  <label
                    htmlFor="EmpId"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="EmpId"
                    id="EmpId"
                    placeholder="Truneyic"
                    value={emp_Id}
                    onChange={(e) => setemp_Id(e.target.value)}
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <a
                      href="#"
                      className="text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 mt-4 text-sm font-medium text-black bg-red-500 rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login into account
                </button>

                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  if you are a new employee please?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Login
