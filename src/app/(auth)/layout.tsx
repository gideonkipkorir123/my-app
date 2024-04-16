"use client"
import React, { useState } from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  forgotPassword: React.ReactNode;
  login: React.ReactNode;
  register: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  forgotPassword,
  login,
  register,
}) => {
  const [activeComponent, setActiveComponent] = useState<string>('');

  return (
    <div className="layout-container">
      {children}

      <div className="button-container">
        <button className="button" onClick={() => setActiveComponent('login')}>
          Show Login
        </button>
        <button className="button" onClick={() => setActiveComponent('register')}>
          Show Register
        </button>
        <button
          className="button"
          onClick={() => setActiveComponent('forgotPassword')}
        >
          Forgot Password
        </button>
      </div>

      <div className="component-container">
        {activeComponent === 'forgotPassword' && (
          <div className="forgot-password-container">{forgotPassword}</div>
        )}
        {activeComponent === 'login' && (
          <div className="login-container">{login}</div>
        )}
        {activeComponent === 'register' && (
          <div className="register-container">{register}</div>
        )}
      </div>
    </div>
  );
};

export default Layout;
