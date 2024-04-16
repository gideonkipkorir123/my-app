import * as yup from 'yup';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface Address {
  location: string;
  apartmentName: string;
  houseNumber: string;
}

export interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
  phoneNumber: string;
  role: Role;
  countryCode: string;
}

export const registrationSchema: yup.ObjectSchema<FormData> = yup.object().shape({
  fullName: yup.string().trim().min(3, 'Full name must be at least 3 characters').max(30, 'Full name cannot exceed 30 characters').required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  address: yup.object().shape({
    location: yup.string().required('Location is required'),
    apartmentName: yup.string().required('Apartment name is required'),
    houseNumber: yup.string().required('House number is required'),
  }).required('Address is required'),
  phoneNumber: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]+$/, 'Invalid phone number format').required('Phone number is required'),
  role: yup.mixed<Role>().oneOf(Object.values(Role)).required('Role is required'),
  countryCode: yup.string().required('Country code is required'),
});
export const loginvalidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
});
export const passwordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?=.{8,})/,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match'),
});