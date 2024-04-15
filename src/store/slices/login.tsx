import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../types';
import apiService, { LoginResponse } from '../../lib/user';

export const loginStart = createAsyncThunk<User, { email: string; password: string }>(
  'login/loginStart',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { session }: LoginResponse = await apiService.loginUser(email, password);

      console.log('User logged in:', session.user);

      return session.user;
    } catch (error) {
      console.error('Login failed:', error);

      return rejectWithValue('Login failed');
    }
  }
);

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginStart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload; 
    });
    builder.addCase(loginStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Login failed';
    });
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
