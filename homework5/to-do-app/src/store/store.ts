import { taskSlice } from "./features/tasksSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch, useAppSelector, store };
