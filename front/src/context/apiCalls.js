import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
