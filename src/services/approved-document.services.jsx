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

const approvedDocumentsCollectionRef = collection(db, "ApprovedDocuments");

const approvedDocumentsServices = {
  getapprovedDocumentsFromMobile: async (mobile) => {
    try {
      const q = query(
        approvedDocumentsCollectionRef,
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
  getRandomapprovedDocumentsId: async () => {
    try {
      const querySnapshot = await getDocs(approvedDocumentsCollectionRef);
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      const randomIndex = Math.floor(Math.random() * documentIds.length);
      const randomDocumentId = documentIds[randomIndex];
      return randomDocumentId;
    } catch (error) {
      console.error("Error getting random document ID:", error);
      throw error;
    }
  },
  addapprovedDocuments: (newDs) => {
    return addDoc(approvedDocumentsCollectionRef, newDs);
  },
  updateapprovedDocuments: (id, newDs) => {
    const userDocRef = doc(approvedDocumentsCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
};

export default approvedDocumentsServices;
