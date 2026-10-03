import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: todoReducer,
});
export type RootState = ReturnType<typeof store.getState>;
//every application has one store known as single source of truth
