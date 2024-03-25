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
  limit,
  query,
} from "firebase/firestore";

const datacenterCollectionRef = collection(db, "Datacenters");

const dataCenterServices = {
  getAllDataCenters: async (page = 1, itemsPerPage = 2, searchQuery = "") => {
    try {
      const collectionRef = datacenterCollectionRef;
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
  getTotalDataCenters: async () => {
    try {
      const querySnapshot = await getDocs(datacenterCollectionRef);
      return querySnapshot.size;
    } catch (error) {
      console.error("Error", error);
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
