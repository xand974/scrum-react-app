import { createSlice } from "@reduxjs/toolkit";

export const sprintSlice = createSlice({
  name: "sprints",
  initialState: {
    sprints: [],
    sprint: [],
    pending: false,
    error: false,
  },
  reducers: {
    getSprintsStart: (state) => {
      state.pending = true;
    },
    getSprintsSuccess: (state, action) => {
      state.sprints = action.payload;
    },
    getSprintsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getSprint: (state, action) => {
      state.sprint = action.payload;
    },
    addTask: (state, action) => {
      state.sprint
        .find((s) => s.name === action.payload.name)
        .tasks.push(action.payload.task);
    },
  },
});

export const {
  getSprint,
  getSprintsStart,
  getSprintsSuccess,
  getSprintsFailure,
  addTask,
} = sprintSlice.actions;

export default sprintSlice.reducer;
