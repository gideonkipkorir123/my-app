import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../lib/user';

interface ResetPasswordData {
  newPassword: string;
  resetPasswordToken: string;
}

export const resetPasswordStart = createAsyncThunk<void, ResetPasswordData>(
  'resetPassword/resetPasswordStart',
  async ({ newPassword, resetPasswordToken }, { rejectWithValue }) => {
    try {
      await apiService.resetUserPassword(newPassword, resetPasswordToken);
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
    } catch (error:any) {
      return rejectWithValue(error.response?.data || 'Failed to verify token');
    }
  }
);

interface ResetPasswordState {
  isLoading: boolean;
  error: string | null;
}

const initialState: ResetPasswordState = {
  isLoading: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPasswordStart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPasswordStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(verifyTokenStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyTokenStart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyTokenStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default resetPasswordSlice.reducer;
