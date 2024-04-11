
import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from '../store/slices/userSlices';

const rootReducer = combineReducers({
  registration: registrationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
