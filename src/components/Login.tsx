'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      'Invalid domain'
    ),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });

  const validateForm = useCallback(async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsFormValid(true);
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      setIsFormValid(false);
    }
  }, [formData]);

  useEffect(() => {
    // Validate the form only if all fields are touched
    if (Object.values(touchedFields).every(field => field)) {
      validateForm();
    }
  }, [formData, touchedFields, validateForm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

    // Mark the field as touched when user types something
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    // Mark the field as touched when user leaves the field
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [name]: true,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Here you can proceed with the login process since the form is valid
      // For now, let's just reset the form and display a success message
      setErrors({});
      setFormData({ email: '', password: '' });
      setIsFormValid(false); // Reset form validity
      setTouchedFields({ email: false, password: false }); // Reset touched fields
      alert('Login successful!');
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex justify-center text-black">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary"
              placeholder="Email"
            />
            {touchedFields.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:border-primary pr-12"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
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
            {touchedFields.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className={`bg-red-500 text-white text-sm font-bold py-3 px-8 rounded-md focus:outline-none 
              ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600 focus:bg-red-600'}`}
              disabled={!isFormValid}
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm text-primary hover:underline focus:outline-none"
              onClick={() => {} /* Handle Forgot Password */}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
