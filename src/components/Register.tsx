import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../store/slices/register";
import { RootState } from "../store/rootReducer";
import { registrationSchema, FormData, Role } from "./validation";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { getAllCountries, Country } from "../lib/user";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);


  const [countries, setCountries] = useState<Country[]>([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      role: Role.USER,
      countryCode: "",
      phoneNumber: ""
    },
  });
  const registrationState = useSelector(
    (state: RootState) => state.registration
  );
  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    try {
      const { countryCode, confirmPassword, ...formData } = data;
      console.log(formData)

      await dispatch(registerStart(formData));
      // when the user successfully registers
      setRegistrationSuccess(true);

      setServerError(null);

      reset()
    } catch (error: any) {
      console.error('Registration failed:', error.message);
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


  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    setValue("countryCode", selectedCountryCode);

    let phoneNumber = watch("phoneNumber");

    phoneNumber = phoneNumber.replace(/^\+|\s+/g, '');

    if (phoneNumber) {

      if (phoneNumber.startsWith('0')) {

        phoneNumber = `+${selectedCountryCode}${phoneNumber.substring(1)}`;
      } else {

        phoneNumber = `+${selectedCountryCode}${phoneNumber}`;
      }
    } else {

      phoneNumber = `+${selectedCountryCode}`;
    }

    setValue("phoneNumber", phoneNumber);
  };
  const getErrorMessage = (error: string): string => {
    const lowercaseError = error.toLowerCase();

    if (lowercaseError.includes('email') && lowercaseError.includes('exists')) {
      return 'This email address is already registered. Please use a different email.';
    } else if (lowercaseError.includes('phone') && lowercaseError.includes('exists')) {
      return 'This phone number is already registered. Please use a different phone number.';
    }

    return 'Registration failed. Please try again.';
  };


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* handle server errors and dispaly them to the user */}
          {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
          {/* Display success message upon successful registration */}
          {registrationSuccess && (
            <p className="text-green-500 mb-2">Registration successful! You can now log in.</p>
          )}
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
          {/* Country Code Field */}
          <div className="mb-4">
            <label htmlFor="countryCode" className="block text-sm font-bold">
              Country Code *
            </label>
            <select
              {...register('countryCode')}
              onChange={handleCountryCodeChange}
              className="input-sm mb-2 px-2 py-1 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              style={{ maxWidth: '200px' }}
            >
              <option value="">Select Country Code</option>
              {countries.map((country) => (
                <option key={country.alpha2Code} value={country.callingCodes?.[0]}>
                  {`(+${country.callingCodes?.[0]}) ${country.name}`}
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <span className="error block mt-1 text-red-500 text-sm">
                {errors.countryCode.message}
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
              {...register('phoneNumber')}
              className="input mb-2 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <span className="error block mt-1 text-red-500 text-sm">{errors.phoneNumber.message}</span>
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
        {/* error handling */}
        {registrationState.error && (
          <div className="error-container">
            <p className="text-red-500 mb-2">Oops! Something went wrong.</p>
            <p className="text-sm text-red-500">
              {getErrorMessage(registrationState.error)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;

