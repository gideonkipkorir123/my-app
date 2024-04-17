import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/register';
import loginReducer from './slices/login';
import forgotPasswordReducer from './slices/forgotPassword';
import resetPasswordReducer from './slices/resetPassword';
import dashboardReducer from './slices/dashboard'; 

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
