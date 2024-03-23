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
          user: userDoc.data(),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
  addUser: async (newUser) => {
    return await addDoc(userCollectionRef, newUser);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  getAllNumberOfUsers: async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const totalDocumentsCount = querySnapshot.size;
    return totalDocumentsCount;
  },
  getAllNumberOfActiveUsers: async () => {
    const querySnapshot = await getDocs(
      query(userCollectionRef, where("status", "==", 1))
    );
    const totalDocumentsCount = querySnapshot.size;
    return totalDocumentsCount;
  },
  getAllNumberOfInActiveUsers: async () => {
    const querySnapshot = await getDocs(
      query(userCollectionRef, where("status", "==", 0))
    );
    const totalDocumentsCount = querySnapshot.size;
    return totalDocumentsCount;
  },
  updateUser: async (id, newUser) => {
    const userDocRef = doc(userCollectionRef, id);
    return await updateDoc(userDocRef, newUser);
  },
};

export default userService;
