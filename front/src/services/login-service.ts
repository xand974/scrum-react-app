import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router";
import { auth, db } from "../firebase";

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
