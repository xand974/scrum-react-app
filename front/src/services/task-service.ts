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
  sprintName: string,
  task: TaskModel,
  id: string,
  dispatch: AppDispatch
) => {
  try {
    if (!task.id) {
      task.id = Math.random().toString(36).slice(2);
    }
    dispatch(setLoading(true));
    const docRef = doc(db, "sprints", id);
    await setDoc(docRef, { tasks: arrayUnion(task) }, { merge: true });
    dispatch(setAddTask({ sprintName: sprintName, task }));
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
  task: TaskModel,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    const docRef = doc(db, "sprints", sprintId);
    const res = await getDoc(docRef);
    const sprint = { id: res.id, ...res.data() } as SprintModel;
    const newTasks = setNewTask(sprint, task);
    await updateDoc(docRef, { tasks: newTasks });
    dispatch(setUpdateTask(task));
    dispatch(setLoading(false));
    dispatch(setOpenModal(false));
  } catch (error) {
    throw error;
  }
};

const setNewTask = (sprint: SprintModel, task: TaskModel) => {
  const newTasks =
    sprint.tasks?.map((item) => {
      if (item.id === task.id) {
        return { ...item, ...task };
      }
      return item;
    }) ?? [];
  return newTasks;
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
