import { configureStore } from "@reduxjs/toolkit";
import sprintSlice from "./sprintSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    sprints: sprintSlice,
    modal: modalSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
