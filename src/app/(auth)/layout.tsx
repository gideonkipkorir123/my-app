"use client"
import React, { ReactNode } from 'react';
import './Layout.css';
import { usePathname } from 'next/navigation'; // Assuming you have a custom usePathname hook

interface LayoutProps {
  children: ReactNode;
  login: ReactNode;
  register: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  login,
  register,
}) => {
  const pathname = usePathname(); // Assuming usePathname is a custom hook to get the current pathname

  // Determine if the user is on the login or register page
  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';

  return (
    <div className="layout-container">
      {children}

      <div className="button-container">
        {/* Conditionally render buttons based on the current page */}
        {isRegisterPage && (
          <button
            className="button"
            onClick={() => window.location.href = '/login'} 
          >
            Login
          </button>
        )}

        {isLoginPage && (
          <button
            className="button"
            onClick={() => window.location.href = '/register'} 
          >
            Register
          </button>
        )}
      </div>

      <div className="component-container">
        {/* Conditionally render login or register component based on the current page */}
        {isLoginPage && (
          <div className="login-container">{login}</div>
        )}

        {isRegisterPage && (
          <div className="register-container">{register}</div>
        )}
      </div>
    </div>
  );
};

export default Layout;
