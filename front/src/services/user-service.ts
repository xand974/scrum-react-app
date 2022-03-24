import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { TaskModel, UserModel } from "../types/index";

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
