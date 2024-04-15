import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../types';
import apiService from '@/lib/user';


// Define your async thunk for registration
export const registerStart = createAsyncThunk<User, User>(
  'registration/registerStart',
  async (formData: User, { rejectWithValue }) => {
    try {
      const registeredUser = await apiService.registerUser(formData);

      console.log('User registered:', registeredUser);

      return registeredUser;
    } catch (error) {
      // Handle registration failure
      console.error('Registration failed:', error);

      // You can use rejectWithValue to provide additional error information to the reducer
      return rejectWithValue('Registration failed'); // Optionally, pass custom error message or data
    }
  }
);
interface RegistrationState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  user: null,
  isLoading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    // You can define other reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(registerStart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerStart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(registerStart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Registration failed'; 
    });
  },
});

export default registrationSlice.reducer;
