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

const rejectedDocumentsCollectionRef = collection(db, "RejectedDocuments");

const rejectedDocumentsServices = {
  getRejectedDocumentFromId: async (id) => {
    const docRef = doc(db, "RejectedDocuments", id);
    try {
      const doc = await getDoc(docRef);
      // console.log(doc.data());
      return doc.data();
    } catch (error) {
      throw error;
    }
  },
  addrejectedDocuments: (newDs) => {
    return addDoc(rejectedDocumentsCollectionRef, newDs);
  },
  updaterejectedDocuments: (id, newDs) => {
    const userDocRef = doc(rejectedDocumentsCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
};

export default rejectedDocumentsServices;
