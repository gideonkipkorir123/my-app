'use client'
import React, { useState } from 'react';
import * as yup from 'yup';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationSchema = yup.object().shape({
    newPassword: yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      .required('New Password is required'),
    confirmPassword: yup.string().oneOf([newPassword], 'Passwords must match')
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema.validate({ newPassword, confirmPassword }, { abortEarly: false })
      .then(() => {
        setSuccessMessage('Password reset successful');
        setErrors({});
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-bold">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <div className="text-red-600 mt-1">{errors.newPassword}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="text-red-600 mt-1">{errors.confirmPassword}</div>}
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
