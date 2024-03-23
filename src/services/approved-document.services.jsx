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
  getApprovedDocumentFromId: async (id) => {
    const docRef = doc(db, "ApprovedDocuments", id);
    try {
      const doc = await getDoc(docRef);
      // console.log(doc.data());
      return doc.data();
    } catch (error) {
      throw error;
    }
  },
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
  getapprovedDocumentsFromDocIdAndUserMobile: async (docId, userMobile) => {
    try {
      const q = query(
        approvedDocumentsCollectionRef,
        where("docId", "==", docId),
        where("userMobile", "==", userMobile)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        return {
          id: userDoc.id,
          doc: userDoc.data(),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
  getTotalApprovedDocuments: async () => {
    const querySnapshot = await getDocs(approvedDocumentsCollectionRef);
    const totalCounts = querySnapshot.size;
    return totalCounts;
  },
  addapprovedDocuments: (newDs) => {
    return addDoc(approvedDocumentsCollectionRef, newDs);
  },
  updateapprovedDocuments: (id, newDs) => {
    const userDocRef = doc(approvedDocumentsCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
};

export default approvedDocumentsServices;
