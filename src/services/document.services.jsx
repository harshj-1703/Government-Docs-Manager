import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  orderBy,
  limit,
  where,
  startAfter,
  doc,
  query,
  documentId,
} from "firebase/firestore";

const docCollectionRef = collection(db, "Documents");

const documentService = {
  getAllUploadeByUserDocuments: async (
    page = 1,
    itemsPerPage = 12,
    searchQuery = ""
  ) => {
    try {
      const collectionRef = docCollectionRef;
      const queryRef = query(
        collectionRef,
        orderBy("title", "asc"),
        orderBy("createdAt", "desc"),
        where("title", ">=", searchQuery.toUpperCase()),
        where("title", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        startAfter(page * itemsPerPage)
      );

      const querySnapshot = await getDocs(queryRef);

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return documents;
    } catch (error) {
      throw error;
    }
  },
  getAllDocuments: async (page = 1, itemsPerPage = 2, searchQuery = "") => {
    try {
      const collectionRef = docCollectionRef;
      let queryRef = query(
        collectionRef,
        where("title", ">=", searchQuery.toUpperCase()),
        where("title", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        orderBy("title", "desc"),
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
          where("title", ">=", searchQuery.toUpperCase()),
          where("title", "<=", searchQuery.toUpperCase() + "\uf8ff")
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
  getDocumentFromId: async (id) => {
    const docRef = doc(db, "Documents", id);
    try {
      const doc = await getDoc(docRef);
      // console.log(doc.data());
      return doc.data();
    } catch (error) {
      throw error;
    }
  },
  getTotalDocuments: async () => {
    const querySnapshot = await getDocs(docCollectionRef);
    const totalCounts = querySnapshot.size;
    return totalCounts;
  },
  addDocument: (newDoc) => {
    return addDoc(docCollectionRef, newDoc);
  },
  updateDocument: (id, newDoc) => {
    const docRef = doc(docCollectionRef, id);
    return updateDoc(docRef, newDoc);
  },
};

export default documentService;
