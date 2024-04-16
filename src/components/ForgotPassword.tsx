"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { forgotPasswordStart } from '../store/slices/forgotPassword';
import { AppDispatch } from '@/store/store';
import { forgotPasswordSchema } from './validation';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, message } = useSelector((state: RootState) => state.forgotPassword);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const onSubmit = async (formData: ForgotPasswordForm) => {
    const { email } = formData;
    dispatch(forgotPasswordStart(email));
    setSubmittedEmail(email);
  };

  useEffect(() => {
    if (message) {
      setSuccessMessage(`Password reset link sent to: ${submittedEmail}`);
      reset();
    }
  }, [message, reset, submittedEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
            )}
          </div>
          {successMessage && (
            <div className="text-green-500 text-sm mb-4" style={{ color: 'black' }}>
              {successMessage}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error.includes('not found') ? (
                <>Email not found. Please enter a valid email.</>
              ) : (
                <>Password reset failed. Please try again.</>
              )}
            </div>
          )}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
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
