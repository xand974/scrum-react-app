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
} from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  getSprintsFailure,
  getSprintsSuccess,
  getSprintsStart,
  getSprint as getCurrentSprint,
} from "./sprintSlice";

export const register = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", res.user.uid);
    await setDoc(docRef, {
      email,
      PhotoURL:
        "https://images.unsplash.com/photo-1598964356161-754cc07fcd36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    });
  } catch (error) {
    alert(error);
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
  }
};

export const logout = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    alert(error);
  }
};

export const getUser = async (id, setUser) => {
  try {
    const docRef = doc(db, "users", id);
    const res = await getDoc(docRef);
    setUser(res.data());
  } catch (error) {
    alert(error);
  }
};

export const createSprint = async (sprint, navigate) => {
  try {
    const docRef = collection(db, "sprints");

    await addDoc(docRef, sprint);
    navigate("/");
  } catch (error) {
    alert(error);
  }
};

export const getSprints = async (dispatch) => {
  dispatch(getSprintsStart());
  try {
    const docRef = collection(db, "sprints");
    const res = await getDocs(docRef);
    dispatch(
      getSprintsSuccess(
        res.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );
  } catch (error) {
    dispatch(getSprintsFailure());
  }
};

export const createTask = async (task, id) => {
  try {
    const docRef = collection(db, "sprints", id, "tasks");
    await addDoc(docRef, task);
    window.location.reload();
  } catch (error) {
    alert(error);
  }
};

export const getSprint = async (dispatch, id) => {
  try {
    const docRef = doc(db, "sprints", id);
    const res = await getDoc(docRef);
    dispatch(getCurrentSprint(res.data()));
  } catch (error) {
    alert(error);
  }
};

export const getTaskByState = async (id, type, setTasks) => {
  const colRef = collection(db, "sprints", id, "tasks");
  const q = query(colRef, where("state", "==", type));
  const res = await getDocs(q);
  setTasks(res.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
};

export const createReview = async (review, id) => {
  try {
    const docRef = doc(db, "sprints", id);
    await setDoc(docRef, { review: review }, { merge: true });
    window.location.reload();
  } catch (error) {
    alert(error);
  }
};