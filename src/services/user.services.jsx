import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  orderBy,
  doc,
  query,
} from "firebase/firestore";

const userCollectionRef = collection(db, "Users");

const userService = {
  // getAllUsers: () => {
  //     const queryRef = query(userCollectionRef, orderBy("status", "desc"));
  //     return getDocs(queryRef);
  //   },
  addUser: (newUser) => {
    return addDoc(userCollectionRef, newUser);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  updateUser: (id, newUser) => {
    const userDocRef = doc(userCollectionRef, id);
    return updateDoc(userDocRef, newUser);
  },
};

export default userService;