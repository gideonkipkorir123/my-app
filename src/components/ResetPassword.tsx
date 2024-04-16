import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { resetPasswordStart } from '../store/slices/resetPassword';
import { passwordValidationSchema } from './validation';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

interface ResetPasswordProps {
  resetPasswordToken: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ resetPasswordToken }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoading, error, resetSuccess } = useSelector((state: RootState) => state.resetPassword);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: yupResolver(passwordValidationSchema),
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmedPassword = e.target.value;
    setPasswordsMatch(newPassword === confirmedPassword);
    setConfirmPasswordTouched(true);
  };

  const onSubmit = (data: { newPassword: string }) => {
    const { newPassword } = data;
    if (resetPasswordToken) {
      dispatch(resetPasswordStart({ newPassword, resetPasswordToken }));
    } else {
      console.error('Reset password token not found.');
    }
  };

  useEffect(() => {
    if (resetSuccess) {
      reset();
      setIsSubmitted(true);

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [resetSuccess, reset, router]);

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      {isLoading && <p>Loading...</p>}
      {error && !isLoading && <div className="text-red-600 mb-4">{error}</div>}
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
            onChange={handleConfirmPasswordChange}
            className={`input mb-2 px-4 py-3 rounded-md border ${
              confirmPasswordTouched && !passwordsMatch ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-black focus:outline-none focus:border-primary`}
            placeholder="Confirm new password"
          />
          {confirmPasswordTouched && !passwordsMatch && (
            <div className="text-red-600 mt-1">Passwords do not match</div>
          )}
          {errors.confirmPassword && <div className="text-red-600 mt-1">{errors.confirmPassword.message}</div>}
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          disabled={isLoading || resetSuccess}
        >
          Reset Password
        </button>
      </form>
      {isSubmitted && resetSuccess && (
        <div className="text-green-600 mt-4">Password reset successful! Redirecting to login page...</div>
      )}
    </div>
  );
};

export default ResetPassword;
