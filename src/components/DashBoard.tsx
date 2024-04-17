import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { RootState } from "../store/rootReducer"; // Update the path to RootState
import {
  toggleUserDropdown,
  toggleMobileMenu,
  toggleServicesDropdown,
} from "../store/slices/dashboard";
import Link from "next/link";

const DashBoardComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isUserDropdownOpen, isMobileMenuOpen, isServicesDropdownOpen } =
    useSelector((state: RootState) => state.dashboard);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleUserDropdown());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, userMenuRef]);

  const toggleUserDropdownHandler = () => {
    dispatch(toggleUserDropdown());
  };

  const toggleMobileMenuHandler = () => {
    dispatch(toggleMobileMenu());
  };

  const toggleServicesDropdownHandler = () => {
    dispatch(toggleServicesDropdown());
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo.jpg" alt="Flowbite Logo" width={160} height={40} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isUserDropdownOpen}
              onClick={toggleUserDropdownHandler}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src="/profile.jpg"
                alt="user photo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {/* Dropdown menu for User */}
            {isUserDropdownOpen && (
              <div
                ref={userMenuRef}
                className="absolute top-full right-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
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
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenuHandler}
          >
            <span className="sr-only">Toggle main menu</span>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMobileMenuOpen ? "w-full" : "hidden"
          } md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <button
                type="button"
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                  isServicesDropdownOpen ? "text-blue-700" : ""
                }`}
                onClick={toggleServicesDropdownHandler}
              >
                <span>Services</span>
                <FaChevronDown
                  className={`ml-1 h-4 w-4 ${
                    isServicesDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {/* Dropdown menu for Services */}
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Service 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Service 2
                      </Link>
                    </li>
                    {/* Add more services here */}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
            {/* Additional links for loan app */}
            <li>
              <Link
                href="/register"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardComponent;
