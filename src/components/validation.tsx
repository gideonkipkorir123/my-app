import * as yup from 'yup';

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
});