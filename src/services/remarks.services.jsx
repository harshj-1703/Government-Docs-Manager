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

const remarksCollectionRef = collection(db, "DocumentRemarks");

const remarksDocumentsServices = {
  getremarksFromMobile: async (mobile) => {
    try {
      const q = query(remarksCollectionRef, where("mobile", "==", mobile));
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
  getRandomremarksId: async () => {
    try {
      const querySnapshot = await getDocs(remarksCollectionRef);
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      const randomIndex = Math.floor(Math.random() * documentIds.length);
      const randomDocumentId = documentIds[randomIndex];
      return randomDocumentId;
    } catch (error) {
      console.error("Error getting random document ID:", error);
      throw error;
    }
  },
  addremarksDocuments: (newDs) => {
    return addDoc(remarksCollectionRef, newDs);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  updateremarks: (id, newDs) => {
    const userDocRef = doc(remarksCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
};

export default remarksDocumentsServices;
