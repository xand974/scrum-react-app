import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { NavigateFunction } from "react-router";
import { auth, db } from "../firebase";
import {
  getSprintsFailure,
  getSprintsSuccess,
  getSprintsStart,
  getSprint as getCurrentSprint,
} from "./sprintSlice";
import { AppDispatch } from "./store";
import { SprintModel, TaskModel, UserModel } from "../types/index";

export const register = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", res.user.uid);
    await setDoc(docRef, {
      email,
      PhotoURL:
        "https://images.unsplash.com/photo-1598964356161-754cc07fcd36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    });
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logout = async (navigate: NavigateFunction) => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    throw error;
  }
};

export const getUser = async (
  id: string,
  setUser: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const docRef = doc(db, "users", id);
    const res = await getDoc(docRef);
    setUser(res.data());
  } catch (error) {
    throw error;
  }
};

export const createSprint = async (
  sprint: SprintModel,
  navigate: NavigateFunction
) => {
  try {
    const docRef = collection(db, "sprints");

    await addDoc(docRef, sprint);
    navigate("/");
  } catch (error) {
    throw error;
  }
};

export const getSprints = async (dispatch: AppDispatch) => {
  dispatch(getSprintsStart());
  try {
    const docRef = collection(db, "sprints");
    const q = query(docRef, orderBy("createdAt", "desc"));
    const res = await getDocs(q);
    const sprints = res.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as SprintModel),
    }));
    dispatch(getSprintsSuccess(sprints));
  } catch (error) {
    dispatch(getSprintsFailure());
  }
};

export const createTask = async (task: TaskModel, id: string) => {
  try {
    const docRef = collection(db, "sprints", id, "tasks");
    await addDoc(docRef, task);
    window.location.reload();
  } catch (error) {
    throw error;
  }
};

export const getSprint = async (dispatch: AppDispatch, id: string) => {
  try {
    const docRef = doc(db, "sprints", id);
    const res = await getDoc(docRef);
    dispatch(getCurrentSprint(res.data()));
  } catch (error) {
    throw error;
  }
};

export const getTaskByState = async (
  id: string,
  type: string,
  setTasks: React.Dispatch<React.SetStateAction<any>>
) => {
  const colRef = collection(db, "sprints", id, "tasks");
  const q = query(colRef, where("state", "==", type));
  const res = await getDocs(q);
  setTasks(
    res.docs.map((doc) => ({ id: doc.id, ...(doc.data() as TaskModel) }))
  );
};

export const createReview = async (review: string, id: string) => {
  try {
    const docRef = doc(db, "sprints", id);
    await setDoc(docRef, { review: review }, { merge: true });
    window.location.reload();
  } catch (error) {
    throw error;
  }
};

export const getUserWithJob = async (
  item: TaskModel,
  setUsers: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    let users: any[] = [];
    const userDocRef = collection(db, "users");
    if (!item.team) return;
    const arr = await Promise.all(
      item.team.map((job: string) => {
        return getDocs(query(userDocRef, where("job", "==", job)));
      })
    );
    arr.map((a: any) => {
      return a.forEach((item: any) => {
        let currentId = item.id;
        let obj = { ...(item.data() as UserModel), id: currentId };
        users.push(obj);
      });
    });
    setUsers(users);
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
    const docRef = doc(db, "sprints", sprintId, "tasks", taskId);
    await updateDoc(docRef, task);
    window.location.reload();
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (sprintId: string, taskId: string) => {
  try {
    const docRef = doc(db, "sprints", sprintId, "tasks", taskId);
    await deleteDoc(docRef);
    window.location.reload();
  } catch (error) {
    throw error;
  }
};
