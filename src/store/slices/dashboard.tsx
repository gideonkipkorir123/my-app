import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  isUserDropdownOpen: boolean;
  isMobileMenuOpen: boolean;
  isServicesDropdownOpen: boolean;
}

const initialState: DashboardState = {
  isUserDropdownOpen: false,
  isMobileMenuOpen: false,
  isServicesDropdownOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleUserDropdown(state) {
      state.isUserDropdownOpen = !state.isUserDropdownOpen;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleServicesDropdown(state) {
      state.isServicesDropdownOpen = !state.isServicesDropdownOpen;
    },
  },
});

export const { toggleUserDropdown, toggleMobileMenu, toggleServicesDropdown } = dashboardSlice.actions;
export default dashboardSlice.reducer;
