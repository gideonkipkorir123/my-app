import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../lib/user';

interface ResetPasswordData {
  newPassword: string;
  resetPasswordToken: string;
}

interface ResetPasswordState {
  isLoading: boolean;
  error: string | null;
  resetSuccess: boolean; // Add resetSuccess property
}

const initialState: ResetPasswordState = {
  isLoading: false,
  error: null,
  resetSuccess: false, // Initialize resetSuccess to false
};

export const resetPasswordStart = createAsyncThunk<void, ResetPasswordData>(
  'resetPassword/resetPasswordStart',
  async ({ newPassword, resetPasswordToken }, { rejectWithValue }) => {
    try {
      await apiService.resetUserPassword(newPassword, resetPasswordToken);
      return; // No payload needed for successful reset
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to reset password');
    }
  }
);

export const verifyTokenStart = createAsyncThunk<void, string>(
  'resetPassword/verifyTokenStart',
  async (token, { rejectWithValue }) => {
    try {
      await apiService.verifyToken(token);
      return; // No payload needed for successful token verification
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to verify token');
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetSuccess = false; // Reset resetSuccess state on start
    });
    builder.addCase(resetPasswordStart.fulfilled, (state) => {
      state.isLoading = false;
      state.resetSuccess = true; // Set resetSuccess to true on successful reset
    });
    builder.addCase(resetPasswordStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.resetSuccess = false; 
    });

    builder.addCase(verifyTokenStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetSuccess = false; 
    });
    builder.addCase(verifyTokenStart.fulfilled, (state) => {
      state.isLoading = false;
      state.resetSuccess = true; 
    });
    builder.addCase(verifyTokenStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.resetSuccess = false; 
    });
  },
});

export default resetPasswordSlice.reducer;
