"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store/rootReducer';
import { loginvalidationSchema } from './validation';
import { loginStart } from '@/store/slices/login';
import { AppDispatch } from '@/store/store';
import Link from 'next/link';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginvalidationSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      await dispatch(loginStart({ email, password }));
      alert('Login successful!');
      reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginState = useSelector((state: RootState) => state.login);

  return (
    <div className="flex justify-center text-black">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email *
            </label>
            <input
              {...register('email')}
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
              placeholder="Email"
            />
            {errors.email && (
              <div className="error" style={{ color: 'red' }}>
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password *
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary pr-12"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {password ? (
                  <FaEyeSlash
                    className="text-gray-400 cursor-pointer"
                    onClick={handleTogglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="text-gray-400 cursor-pointer"
                    onClick={handleTogglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="error" style={{ color: 'red' }}>
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md focus:outline-none hover:bg-red-600"
              disabled={!email || !password || isSubmitting}
            >
              {isSubmitting
                ? 'Submitting...'
                : loginState.isLoading
                ? 'Logging in...'
                : 'Login'}
            </button>
            <Link href="/forgotPassword">Forgot Password</Link>
          </div>
          {loginState.error && (
            <div className="error" style={{ color: 'red', textAlign: 'center' }}>
              {loginState.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
