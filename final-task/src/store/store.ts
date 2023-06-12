import { userSlice } from "./features/userSlice";
import { proteinsSlice } from "./features/proteinsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    proteins: proteinsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch, useAppSelector, store };