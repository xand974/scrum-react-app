import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TaskModel, SprintModel } from "../types/index";
import { AppDispatch } from "../context/store";
import {
  removeTask,
  setAddTask,
  setLoading,
  setUpdateTask,
} from "../context/sprintSlice";
import { setDoc } from "firebase/firestore";
import { setOpenModal } from "../context/modalSlice";

export const createTask = async (
  sprint: SprintModel,
  task: TaskModel,
  id: string,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    const docRef = doc(db, "sprints", id);
    await setDoc(docRef, { tasks: arrayUnion(task) }, { merge: true });
    dispatch(setAddTask({ sprintName: sprint.name, task }));
    dispatch(setLoading(false));
  } catch (error) {
    throw error;
  }
};

/**
 * update Task
 * @param {string} sprintId
 * @param {TaskModel} task
 * @param {string} taskId
 */
export const updateTask = async (
  sprintId: string,
  task: Partial<TaskModel>,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    const docRef = doc(db, "sprints", sprintId);
    await updateDoc(docRef, { tasks: task });
    dispatch(setUpdateTask(task));
    dispatch(setLoading(false));
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (
  sprintId: string,
  taskId: string,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    dispatch(setLoading(true));
    const docRef = doc(db, "sprints", sprintId);
    const sprint = (await (await getDoc(docRef)).data()) as SprintModel;
    await updateDoc(docRef, {
      tasks: sprint.tasks?.filter((item) => item.id !== taskId),
    });
    dispatch(removeTask(taskId));
    dispatch(setOpenModal(false));
    dispatch(setLoading(false));
  } catch (error) {
    throw error;
  }
};
