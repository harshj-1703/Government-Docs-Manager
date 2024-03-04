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
  getrejectedDocumentsFromMobile: async (mobile) => {
    try {
      const q = query(
        rejectedDocumentsCollectionRef,
        where("mobile", "==", mobile)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        return {
          id: userDoc.id,
          user: userDoc.data(),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
  getRandomrejectedDocumentsId: async () => {
    try {
      const querySnapshot = await getDocs(rejectedDocumentsCollectionRef);
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      const randomIndex = Math.floor(Math.random() * documentIds.length);
      const randomDocumentId = documentIds[randomIndex];
      return randomDocumentId;
    } catch (error) {
      console.error("Error getting random document ID:", error);
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
};

export default rejectedDocumentsServices;
