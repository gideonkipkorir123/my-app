import axios from 'axios';
import dotenv from 'dotenv';
import { User } from '../../types';

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL as string;

const apiService = {
  async registerUser(userData: User) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/register`, userData);
      return response.data.user;
    } catch (error:any) {
      throw new Error(error.response?.data?.error || 'Failed to register user');
    }
  },

  // Add more service functions here as needed
  async loginUser(email: string, password: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error:any) {
      console.error('Error logging in user:', error.message || error);
      throw new Error(`Error logging in user: ${error.message}`);
    }
  },

  // Add more service functions as needed
  async getUserProfile() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error:any) {
      console.error('Error fetching user profile:', error.message || error);
      throw new Error(`Error fetching user profile: ${error.message}`);
    }
  },
};

export default apiService;
