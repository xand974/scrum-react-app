import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskModel } from "../types/index";

type State = {
  openModal: boolean;
  modalData: TaskModel;
  loading: boolean;
};

const initialState: State = {
  openModal: false,
  loading: false,
  modalData: {} as TaskModel,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setModalData: (state, action: PayloadAction<TaskModel>) => {
      state.modalData = action.payload;
    },
  },
});

export const { setOpenModal, setModalData } = modalSlice.actions;

export default modalSlice.reducer;
