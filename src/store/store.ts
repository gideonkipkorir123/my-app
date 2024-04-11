import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";


const store = configureStore({
  reducer: rootReducer,
  
},

);

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
