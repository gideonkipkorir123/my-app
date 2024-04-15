import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/register';
import loginReducer from '../store/slices/login';

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
