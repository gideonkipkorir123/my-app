import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../store/slices/userSlices";
import { RootState } from "../store/rootReducer";
import { registrationSchema, FormData } from "./validation";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import apiService from "@/lib/user";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(registrationSchema),
  });
  const registrationState = useSelector(
    (state: RootState) => state.registration
  );
  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmPassword, ...formDataWithoutConfirmPassword } = data;
      console.log("formDataWithoutConfirmPassword", formDataWithoutConfirmPassword);
      await dispatch(registerStart(formDataWithoutConfirmPassword));
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      
    }
  };
  
  const handleChange =
    (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      register(fieldName);
    };

  const handleAddressChange =
    (fieldName: keyof FormData["address"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      register(`address.${fieldName}`);
    };

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-bold">
              Full Name *
            </label>
            <input
              type="text"
              {...register("fullName")}
              onChange={handleChange("fullName")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email *
            </label>
            <input
              type="text"
              {...register("email")}
              onChange={handleChange("email")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Email"
            />
            {errors.email && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
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
            </div>
            {errors.password && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Address Fields */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-bold">
              Location *
            </label>
            <input
              type="text"
              {...register("address.location")}
              onChange={handleAddressChange("location")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Location"
            />
            {errors.address?.location && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.address.location.message}
              </span>
            )}
          </div>

          {/* Apartment Name Field */}
          <div className="mb-4">
            <label htmlFor="apartmentName" className="block text-sm font-bold">
              Apartment Name *
            </label>
            <input
              type="text"
              {...register("address.apartmentName")}
              onChange={handleAddressChange("apartmentName")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Apartment Name"
            />
            {errors.address?.apartmentName && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.address.apartmentName.message}
              </span>
            )}
          </div>

          {/* House Number Field */}
          <div className="mb-4">
            <label htmlFor="houseNumber" className="block text-sm font-bold">
              House Number *
            </label>
            <input
              type="text"
              {...register("address.houseNumber")}
              onChange={handleAddressChange("houseNumber")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="House Number"
            />
            {errors.address?.houseNumber && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.address.houseNumber.message}
              </span>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-bold">
              Phone Number *
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              onChange={handleChange("phoneNumber")}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center px-6 py-3 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Register <FaArrowRight className="ml-2" />
          </button>
        </form>

        {/* Loading State */}
        {registrationState.isLoading && <p>Loading...</p>}
        {/* Error State */}
        {registrationState.error && (
          <p className="text-red-500 mt-4">Error: {registrationState.error}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
function watch(arg0: string) {
  throw new Error("Function not implemented.");
}
