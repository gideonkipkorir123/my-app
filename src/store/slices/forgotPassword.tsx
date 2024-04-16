import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../lib/user';

// Async thunk for password reset request
export const forgotPasswordStart = createAsyncThunk<void, string>(
  'forgotPassword/forgotPasswordStart',
  async (email, { rejectWithValue }) => {
    try {
      await apiService.requestPasswordReset(email);
    } catch (error) {
      console.error('Password reset request failed:', error);
      return rejectWithValue('Password reset request failed');
    }
  }
);

export interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

// Initial state for the slice
const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  message: null,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(forgotPasswordStart.fulfilled, (state) => {
      state.isLoading = false;
      state.message = 'Password reset link sent successfully';
    });
    builder.addCase(forgotPasswordStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Password reset failed';
    });
  },
});

// Export the reducer and actions
export const { resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
