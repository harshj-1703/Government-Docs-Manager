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
  limit,
} from "firebase/firestore";

const userCollectionRef = collection(db, "Users");

const userService = {
  getAllUsers: async (page = 1, itemsPerPage = 2, searchQuery = "") => {
    try {
      const collectionRef = userCollectionRef;
      let queryRef = query(
        collectionRef,
        where("mobile", ">=", searchQuery.toUpperCase()),
        where("mobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        orderBy("mobile", "desc"),
        orderBy("createdAt", "desc")
      );

      if (page > 1) {
        const snapshot = await getDocs(
          query(queryRef, limit(itemsPerPage * (page - 1)))
        );

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const lastUserMobile = lastDoc.data().userMobile;
        const lastCreatedAt = lastDoc.data().createdAt;

        queryRef = query(
          queryRef,
          startAfter(lastUserMobile, lastCreatedAt),
          limit(itemsPerPage)
        );
      } else {
        queryRef = query(queryRef, limit(itemsPerPage));
      }

      const querySnapshot = await getDocs(queryRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("mobile", ">=", searchQuery.toUpperCase()),
          where("mobile", "<=", searchQuery.toUpperCase() + "\uf8ff")
        )
      );
      const totalDocsCount = totalDocsQuerySnapshot.size;

      return {
        documents: documents,
        totalItems: totalDocsCount,
      };
    } catch (error) {
      throw error;
    }
  },
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
