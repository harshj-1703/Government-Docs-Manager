import { Password } from "@mui/icons-material";
import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  where,
  doc,
  query,
} from "firebase/firestore";

const userCollectionRef = collection(db, "Users");

const userService = {
  // getAllUsers: () => {
  //     const queryRef = query(userCollectionRef, orderBy("status", "desc"));
  //     return getDocs(queryRef);
  //   },
  getUserFromMobile: async (mobile) => {
    try {
      const q = query(userCollectionRef, where("mobile", "==", mobile));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        return {
          id: userDoc.id,
          password: userDoc.data().password,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
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
