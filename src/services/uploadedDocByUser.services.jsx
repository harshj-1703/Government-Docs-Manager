import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  orderBy,
  limit,
  startAfter,
  doc,
  query,
  where,
} from "firebase/firestore";

const docCollectionRef = collection(db, "UploadedDocsByUsers");

const uploadedByUsersDocumentService = {
  getAllUploadeByUserDocuments: async (page = 1, itemsPerPage = 15) => {
    try {
      const collectionRef = docCollectionRef;
      const queryRef = query(
        collectionRef,
        orderBy("updatedAt", "desc"),
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
    const docRef = doc(db, "UploadedDocsByUsers", id);
    try {
      const doc = await getDoc(docRef);
      // console.log(doc.data());
      return doc.data();
    } catch (error) {
      throw error;
    }
  },
  getAllUploadeByUserDocumentsFromUserId: async (userId) => {
    try {
      const collectionRef = docCollectionRef;
      const queryRef = query(
        collectionRef,
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")
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
  getDocumentFromIdAndUserId: async (docId, userId) => {
    try {
      const q = query(
        docCollectionRef,
        where("docId", "==", docId),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
  addUploadedByUsersDocument: (newDoc) => {
    return addDoc(docCollectionRef, newDoc);
  },
  updateUploadedByUsersDocument: (id, newDoc) => {
    const docRef = doc(docCollectionRef, id);
    return updateDoc(docRef, newDoc);
  },
};

export default uploadedByUsersDocumentService;
