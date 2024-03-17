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
  limit,
  doc,
  startAfter,
  query,
} from "firebase/firestore";

const userQueriesCollectionRef = collection(db, "UserQueries");

const userQueriesDocumentsServices = {
  getAllQueries: async (page = 1, itemsPerPage = 2, searchQuery = "") => {
    try {
      const collectionRef = userQueriesCollectionRef;
      let queryRef = query(
        collectionRef,
        where("mobile", ">=", searchQuery.toUpperCase()),
        where("mobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        orderBy("mobile", "desc"),
        orderBy("createdAt", "desc")
      );

      if (page > 1) {
        const snapshot = await getDocs(
          query(queryRef, limit(itemsPerPage * (page - 1)))
        );

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const lastUserMobile = lastDoc.data().mobile;
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

      // const filteredDocuments = documents.filter(
      //   (doc) => !doc.data.checkedByDCMNumber.includes(mobile)
      // );

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("mobile", ">=", searchQuery.toUpperCase()),
          where("mobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
          where("status", "==", 1)
        )
      );
      const totalDocsCount = totalDocsQuerySnapshot.size;
      // const filteredCounts = totalDocsQuerySnapshot.docs.filter(
      //   (doc) => !doc.data().checkedByDCMNumber.includes(mobile)
      // );

      return {
        documents: documents,
        totalItems: totalDocsCount,
      };
    } catch (error) {
      throw error;
    }
  },
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
