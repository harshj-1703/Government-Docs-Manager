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
        orderBy("updatedAt", "desc"),
        where("title", ">=", searchQuery.toUpperCase()),
        where("title", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("uploadedBy", "==", "Users"),
        limit(itemsPerPage)
      );

      const startAfterDoc =
        page > 1 ? await getDoc(queryRef.doc(page * itemsPerPage)) : null;

      const querySnapshot = await getDocs(
        startAfterDoc ? startAfter(queryRef, startAfterDoc) : queryRef
      );

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return documents;
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
  addDocument: (newDoc) => {
    return addDoc(docCollectionRef, newDoc);
  },
  updateDocument: (id, newDoc) => {
    const docRef = doc(docCollectionRef, id);
    return updateDoc(docRef, newDoc);
  },
};

export default documentService;
