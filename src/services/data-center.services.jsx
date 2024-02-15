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

const datacenterCollectionRef = collection(db, "Datacenters");

const dataCenterServices = {
  // getAllUsers: () => {
  //     const queryRef = query(datacenterCollectionRef, orderBy("status", "desc"));
  //     return getDocs(queryRef);
  //   },
  getDataCenterFromMobile: async (mobile) => {
    try {
      const q = query(datacenterCollectionRef, where("mobile", "==", mobile));
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
  getRandomDataCenterId: async () => {
    try {
      const querySnapshot = await getDocs(datacenterCollectionRef);
      const documentIds = querySnapshot.docs.map((doc) => doc.id);
      const randomIndex = Math.floor(Math.random() * documentIds.length);
      const randomDocumentId = documentIds[randomIndex];
      return randomDocumentId;
    } catch (error) {
      console.error("Error getting random document ID:", error);
      throw error;
    }
  },
  addDataCenter: (newDs) => {
    return addDoc(datacenterCollectionRef, newDs);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  updateDataCenter: (id, newDs) => {
    const userDocRef = doc(datacenterCollectionRef, id);
    return updateDoc(userDocRef, newDs);
  },
};

export default dataCenterServices;
