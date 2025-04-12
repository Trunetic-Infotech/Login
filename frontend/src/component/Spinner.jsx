import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      navigate('/login');
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="mb-6 text-xl text-gray-800">
        <h3 className="font-semibold">Redirecting in {count} seconds...</h3>
      </div>
      <div className="relative">
        <div className="w-24 h-24 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-800 font-semibold">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
