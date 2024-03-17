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

const userQueriesCollectionRef = collection(db, "UserQueries");

const userQueriesDocumentsServices = {
  getUserQueryFromId: async (id) => {
    const docRef = doc(db, "UserQueries", id);
    try {
      const doc = await getDoc(docRef);
      // console.log(doc.data());
      return doc.data();
    } catch (error) {
      throw error;
    }
  },
  adduserQueriesDocuments: (newDs) => {
    return addDoc(userQueriesCollectionRef, newDs);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  updateuserQueries: (id, newDs) => {
    const userDocRef = doc(userQueriesCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
};

export default userQueriesDocumentsServices;
