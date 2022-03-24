import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TaskModel, SprintModel } from "../types/index";
import { AppDispatch } from "../context/store";
import { removeTask, setAddTask } from "../context/sprintSlice";
import { setDoc } from "firebase/firestore";
import { setOpenModal } from "../context/modalSlice";

export const createTask = async (
  sprint: SprintModel,
  task: TaskModel,
  id: string,
  dispatch: AppDispatch
) => {
  try {
    const docRef = doc(db, "sprints", id);
    await setDoc(docRef, { tasks: arrayUnion(task) }, { merge: true });
    dispatch(setAddTask({ sprintName: sprint.name, task }));
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
  task: any,
  taskId: string
) => {
  try {
    const docRef = doc(db, "sprints", sprintId);
    await updateDoc(docRef, { tasks: task });
    window.location.reload();
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (
  sprintId: string,
  taskId: string,
  dispatch: AppDispatch
) => {
  try {
    const docRef = doc(db, "sprints", sprintId);
    await updateDoc(docRef, { tasks: arrayRemove({ id: taskId }) });
    dispatch(removeTask(taskId));
    dispatch(setOpenModal(false));
  } catch (error) {
    throw error;
  }
};
