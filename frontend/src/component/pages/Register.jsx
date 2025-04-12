import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import { toast } from "react-toastify";

const Register = () => {
  const [emp_Id, setemp_Id] = useState('');
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Basic validation before sending request
    // if (!emp_Id || !name || !email || !password || !answer) {
    //   toast.error("All fields are required!");
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/sign', {
        emp_Id,
        userName,
        email,
        password,
        answer
      });

      if (response.data) {
        toast.success(response.data.message); // Success case
        navigate("/login")
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
  };

  return (
    <div className="items-center">
      <section className="bg-gray-100 h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/register"
            className="flex items-center mb-6 text-2xl font-semibold text-red-400 dark:text-white"
          >
            For new Employee
          </Link>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <div className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create an account
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
                    onChange={(e) => setemp_Id(e.target.value)} // Added onChange handler
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>
                {/* Employee Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)} // Added onChange handler
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employee email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Added onChange handler
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>
                {/* Security Question Dropdown */}
                <div>
                  <label
                    htmlFor="answer"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Security Question
                  </label>
                  <select
                    name="answer"
                    id="answer"
                    // value={answer} // Set value here
                    // onChange={(e) => setAnswer(e.target.value)} // Add the onChange handler
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  >
                    <option value="">Select Question</option>
                    <option value="1">Link 1</option>
                    <option value="2">Link 2</option>
                    <option value="3">Link 3</option>
                  </select>
                </div>
                {/* Answer Input */}
                <div>
                  <label
                    htmlFor="Answer"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Answer
                  </label>
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    placeholder="Enter Your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)} // Added onChange handler
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
                    onChange={(e) => setPassword(e.target.value)} // Added onChange handler
                    required
                    className="w-full p-2.5 mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500"
                  />
                </div>
                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                   
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
                  Create an account
                </button>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Register
