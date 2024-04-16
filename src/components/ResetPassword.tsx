"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { resetPasswordStart } from '../store/slices/resetPassword';
import { verifyTokenStart } from '../store/slices/resetPassword';
import { passwordValidationSchema } from './validation';
import { AppDispatch } from '@/store/store';

const ResetPassword: React.FC<{ resetPasswordToken: string }> = ({ resetPasswordToken }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: verificationLoading, error: verificationError } = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { error: resetError } = useSelector((state: RootState) => state.resetPassword);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(passwordValidationSchema),
  });

  const onSubmit = (data: { newPassword: string }) => {
    const { newPassword } = data;

    dispatch(resetPasswordStart({ newPassword, resetPasswordToken: resetPasswordToken }));
  };

  React.useEffect(() => {
    dispatch(verifyTokenStart(resetPasswordToken));
  }, [dispatch, resetPasswordToken]);

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      {verificationLoading && <div>Loading...</div>}
      {verificationError && <div className="text-red-600 mb-4">{verificationError}</div>}
      {resetError && <div className="text-red-600 mb-4">{resetError}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-bold">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            {...register('newPassword')}
            className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
            placeholder="Enter new password"
          />
          {errors.newPassword && <div className="text-red-600 mt-1">{errors.newPassword.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
            placeholder="Confirm new password"
          />
          {/* Only show validation error for confirmPassword */}
          {errors.confirmPassword && <div className="text-red-600 mt-1">{errors.confirmPassword.message}</div>}
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
