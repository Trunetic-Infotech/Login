import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            {/* Logo and Branding */}
            <a href="https://flowbite.com/" className="flex items-center space-x-3 mb-4 sm:mb-0">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              <span className="text-2xl font-semibold text-white">Flowbite</span>
            </a>
            
            {/* Footer Links */}
            <ul className="flex space-x-4 sm:space-x-6">
              <li>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">About</a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Licensing</a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Divider */}
          <hr className="my-6 border-gray-700" />
          
          {/* Footer Text */}
          <div className="text-center">
            <span className="text-sm text-gray-400">
              © 2023 <a href="https://flowbite.com/" className="hover:underline text-gray-300">Flowbite™</a>. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
