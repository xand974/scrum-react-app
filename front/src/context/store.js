import { configureStore } from "@reduxjs/toolkit";
import sprintSlice from "./sprintSlice";

export default configureStore({
  reducer: {
    sprints: sprintSlice,
  },
});
