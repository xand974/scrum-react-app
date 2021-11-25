import { createSlice } from "@reduxjs/toolkit";

export const sprintSlice = createSlice({
  name: "sprints",
  initialState: {
    sprints: [],
    sprint: [],
    pending: false,
    error: false,
    openModal: false,
    modalData: {},
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
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const {
  getSprint,
  getSprintsStart,
  getSprintsSuccess,
  getSprintsFailure,
  addTask,
  setOpenModal,
  setModalData,
} = sprintSlice.actions;

export default sprintSlice.reducer;
