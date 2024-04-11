
export interface Address {
  location?: string;
  houseNumber?: string;
  apartmentName?: string;
}

export interface User {
  _id?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  status?: boolean;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address?: Address;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  signEmailToken?: string;
  role?: string;
  profileImageURL?: string;
  frontIdURL?: string;
  backIdURL?: string;
  signatureURL?: string;
  resetPasswordToken?: string;
}

