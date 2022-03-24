import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NavigateFunction } from "react-router";
import { db } from "../firebase";
import { SprintModel } from "../types/index";
import { AppDispatch } from "../context/store";
import { setDoc } from "firebase/firestore";
import {
  getSprintsFailure,
  getSprintsStart,
  getSprintsSuccess,
  getSprint as getCurrentSprint,
} from "../context/sprintSlice";

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

export const getSprint = async (dispatch: AppDispatch, id: string) => {
  try {
    const docRef = doc(db, "sprints", id);
    const res = await getDoc(docRef);

    dispatch(getCurrentSprint(res.data() as SprintModel));
  } catch (error) {
    throw error;
  }
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
