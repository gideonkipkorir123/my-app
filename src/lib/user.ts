import axios from 'axios';
import { User } from '../../types';

export interface Country {
  alpha2Code: string;
  name: string;
  callingCodes: string[];
  flagSvg: string;
}

const API_URL = 'https://restcountries.com/v2/all';

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(API_URL);
    const countriesData = response.data as any[];

    const formattedCountries: Country[] = countriesData.map((countryData: any) => {
      const { alpha2Code, name, callingCodes, flags } = countryData;
      const flagSvg = flags?.svg;
      return {
        alpha2Code,
        name,
        callingCodes: callingCodes || [],
        flagSvg: flagSvg || '',
      };
    });

    return formattedCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export interface Session {
  sessionId: string;
  user: User;
  valid: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  session: Session;
}

const BACKEND_URL = 'http://localhost:3500';

const apiService = {
  async registerUser(userData: User): Promise<User> {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, userData);
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to register user');
    }
  },

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      const responseData = response.data;

      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      sessionStorage.setItem('sessionId', responseData.session.sessionId);

      return responseData;
    } catch (error: any) {
      console.error('Error logging in user:', error.message || error);
      throw new Error(`Error logging in user: ${error.message}`);
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await axios.post<void>(`${BACKEND_URL}/auth/forgotPassword`, { email });
      return response.data;
    } catch (error: any) {
      console.error('Error initiating password reset:', error.message || error);
      throw new Error(`Error initiating password reset: ${error.message}`);
    }
  },

  async resetUserPassword(newPassword: string, resetPasswordToken: string): Promise<void> {
    try {
      const response = await axios.post<void>(`${BACKEND_URL}/auth/resetPassword`, {
        newPassword,
        resetPasswordToken,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error resetting password:', error.message || error);
      throw new Error(`Error resetting password: ${error.message}`);
    }
  },

  async getUserProfile(id: string): Promise<User> {
    try {
      const sessionId = sessionStorage.getItem('sessionId');

      if (!sessionId) {
        throw new Error('Session ID not found');
      }

      const response = await axios.get<User>(`${BACKEND_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
          sessionId,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message || error);
      throw new Error(`Error fetching user profile: ${error.message}`);
    }
  },

  async verifyToken(resetPasswordToken: string): Promise<any> {
    try {
      const response = await axios.post<any>(`${BACKEND_URL}/auth/verifyToken`, { resetPasswordToken });
      return response.data;
    } catch (error: any) {
      console.error('Error verifying resetPasswordToken:', error.message || error);
      throw new Error(`Error verifying resetPasswordToken: ${error.message}`);
    }
  },
};

export default apiService;
