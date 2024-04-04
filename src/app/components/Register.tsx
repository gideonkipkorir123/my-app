import React, { useState } from 'react';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    fullName: '',
    address: { location: '', apartmentName: '', houseNumber: '' },
    email: '',
    role: Role.USER,
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors: Record<string, string> = {};
    let isValid = true;

    // Validation logic...

    setErrors(validationErrors);

    if (isValid) {
      // Submission logic...
      console.log('Form submitted:', formData);
      setFormData({
        phoneNumber: '',
        fullName: '',
        address: { location: '', apartmentName: '', houseNumber: '' },
        email: '',
        role: Role.USER,
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-bold">Phone Number *</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-bold">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Full Name"
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-bold">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.address.location}
              onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, address: { ...prevFormData.address, location: e.target.value } }))}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Location"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="apartmentName" className="block text-sm font-bold">Apartment Name *</label>
            <input
              type="text"
              name="apartmentName"
              value={formData.address.apartmentName}
              onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, address: { ...prevFormData.address, apartmentName: e.target.value } }))}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Apartment Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="houseNumber" className="block text-sm font-bold">House Number *</label>
            <input
              type="text"
              name="houseNumber"
              value={formData.address.houseNumber}
              onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, address: { ...prevFormData.address, houseNumber: e.target.value } }))}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="House Number"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="relative mb-4">
            <label htmlFor="password" className="block text-sm font-bold">Password *</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-bold">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            disabled={!formData.phoneNumber || !formData.fullName || !formData.address.location || !formData.address.apartmentName || !formData.address.houseNumber || !formData.email || !formData.password || !formData.confirmPassword}
            className="btn btn-primary flex items-center justify-center px-6 py-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Register <FaArrowRight className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
