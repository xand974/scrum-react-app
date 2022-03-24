import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskModel, SprintModel } from "../types/index";

type State = {
  sprints: SprintModel[];
  sprint: SprintModel;
  pending: boolean;
  error: boolean;
  loading: boolean;
};

const initialState: State = {
  loading: false,
  sprints: [],
  sprint: {} as SprintModel,
  pending: false,
  error: false,
};

export const sprintSlice = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    getSprintsStart: (state) => {
      state.pending = true;
    },
    getSprintsSuccess: (state, action: PayloadAction<SprintModel[]>) => {
      state.sprints = [...action.payload];
    },
    getSprintsFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getSprint: (state, action) => {
      state.sprint = action.payload;
    },
    setAddTask: (
      state,
      action: PayloadAction<{ sprintName: string; task: TaskModel }>
    ) => {
      if (state.sprint?.tasks) {
        state.sprint.tasks = [...state.sprint.tasks, action.payload.task];
      } else {
        state.sprint.tasks = [{ ...action.payload.task }];
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.sprint.tasks = state.sprint.tasks?.filter(
        (task) => task.id !== action.payload
      );
    },
    // TODO gérer la fonction update en évitant de muter les données
    setUpdateTask: (state, action: PayloadAction<Partial<TaskModel>>) => {
      const taskFound = state.sprint.tasks?.find(
        (task) => task.id === action.payload.id
      );
      if (taskFound)
        state.sprint.tasks?.map((task) => [{ ...task }, { ...action.payload }]);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getSprint,
  getSprintsStart,
  getSprintsSuccess,
  getSprintsFailure,
  setAddTask,
  removeTask,
  setLoading,
  setUpdateTask,
} = sprintSlice.actions;

export default sprintSlice.reducer;
