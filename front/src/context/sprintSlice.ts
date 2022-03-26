import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskModel, SprintModel } from "../types/index";

type State = {
  sprints: SprintModel[];
  pending: boolean;
  error: boolean;
  loading: boolean;
};

const initialState: State = {
  loading: false,
  sprints: [],
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
    setAddTask: (
      state,
      action: PayloadAction<{ sprintName: string; task: TaskModel }>
    ) => {
      const sprints = state.sprints.map((sprint) => {
        if (sprint.name === action.payload.sprintName) {
          return {
            ...sprint,
            tasks: [...(sprint.tasks ?? []), action.payload.task],
          };
        }
        return sprint;
      });
      return { ...state, sprints };
    },
    removeTask: (state, action: PayloadAction<string>): State => {
      const sprints = state.sprints.map((sprint) => {
        const newTasks =
          sprint.tasks?.filter((task) => task.id !== action.payload) ?? [];
        return { ...sprint, tasks: [...newTasks] };
      });
      return { ...state, sprints };
    },
    setUpdateTask: (state, action: PayloadAction<TaskModel>) => {
      const sprints = state.sprints.map((sprint) => {
        const newTasks =
          sprint.tasks?.map((task) => {
            if (task.id === action.payload.id)
              return { ...task, ...action.payload };
            return task;
          }) ?? [];
        return { ...sprint, tasks: [...newTasks] };
      });

      return { ...state, sprints };
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  getSprintsStart,
  getSprintsSuccess,
  getSprintsFailure,
  setAddTask,
  removeTask,
  setLoading,
  setUpdateTask,
} = sprintSlice.actions;

export default sprintSlice.reducer;
