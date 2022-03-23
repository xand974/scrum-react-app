import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskModel, SprintModel } from "../types/index";

type State = {
  sprints: SprintModel[];
  sprint: SprintModel;
  pending: boolean;
  error: boolean;
  openModal: boolean;
  modalData: any;
};

const initialState: State = {
  sprints: [],
  sprint: {} as SprintModel,
  pending: false,
  error: false,
  openModal: false,
  modalData: {},
};

export const sprintSlice = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    getSprintsStart: (state) => {
      state.pending = true;
    },
    getSprintsSuccess: (state, action: PayloadAction<SprintModel[]>) => {
      state.sprints = action.payload;
    },
    getSprintsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getSprint: (state, action) => {
      state.sprint = action.payload;
    },
    addTask: (
      state,
      action: PayloadAction<{ name: string; task: TaskModel }>
    ) => {
      const sprintFound = state.sprints?.find(
        (s: any) => s.name === action.payload.name
      );
      sprintFound?.tasks?.push(action.payload.task);
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
