'use client'
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can implement the logic to send a password reset link to the provided email address
    setMessage(`Password reset link sent to: ${email}`);
    setEmail('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4"> {/* Reduced margin-bottom from mb-8 to mb-4 */}
            <label htmlFor="email" className="block text-sm font-bold">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
          </div>
          {message && (
            <div className="text-center text-sm text-gray-600 mb-4">
              <span className="font-bold">{message}</span>
            </div>
          )}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <div className="flex justify-start">
            <span className="text-sm">Remember your password? <a href="#" className="text-primary hover:underline">Login here</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
