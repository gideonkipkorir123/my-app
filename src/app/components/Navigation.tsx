import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  name: string;
  email: string;
}

interface NavigationProps {
  user: User;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <Image
              src="/logo.jpg"
              alt="Loan Logo"
              width={150}
              height={32}
              layout="intrinsic"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Gideon
            </span>
          </div>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <Image
                src="/profile.jpg"
                alt="User Photo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <span className="sr-only">Open user menu</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-48 overflow-y-auto bg-white rounded-md shadow-xl z-10">
                <div className="px-4 py-2">
                  <span className="block text-sm font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'
            } md:flex`}
          id="navbar-user"
        >
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 border-t border-gray-100 md:border-0 bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="px-4 py-3">
              <Link href="/">
                <div className="block text-gray-900 dark:text-white hover:text-blue-700 cursor-pointer">
                  Home
                </div>
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link href="/about">
                <div className="block text-gray-900 dark:text-white hover:text-blue-700 cursor-pointer">
                  About
                </div>
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link href="/services">
                <div className="block text-gray-900 dark:text-white hover:text-blue-700 cursor-pointer">
                  Services
                </div>
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link href="/pricing">
                <div className="block text-gray-900 dark:text-white hover:text-blue-700 cursor-pointer">
                  Pricing
                </div>
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link href="/contact">
                <div className="block text-gray-900 dark:text-white hover:text-blue-700 cursor-pointer">
                  Contact
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
