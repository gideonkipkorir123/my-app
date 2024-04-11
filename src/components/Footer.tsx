'use client'
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 text-center text-gray-600 bg-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-center items-center mb-2">
          <div className="h-6 w-6 mr-2 relative">
            <Image
              src="/logo.jpg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-sm font-semibold">Your Company</h1>
        </div>
        <p className="text-xs mb-1">Connect with us:</p>
        <div className="flex justify-center items-center space-x-2 mb-1">
          <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 text-xs">
            Facebook
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 text-xs">
            Twitter
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 text-xs">
            LinkedIn
          </a>
        </div>
        <p className="text-xs mb-1">Contact us:</p>
        <p className="text-xs mb-1">Phone: 123-456-7890</p>
        <p className="text-xs mb-1">Email: info@yourcompany.com</p>
        <hr className="border-gray-400 my-2" />
        <p className="text-xxs text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
