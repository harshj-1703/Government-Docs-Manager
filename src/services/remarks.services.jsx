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
  getremarksFromDocumentId: async (docId) => {
    try {
      const q = query(remarksCollectionRef, where("documentId", "==", docId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        return documents;
      } else {
        return null;
      }
    } catch (error) {
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
