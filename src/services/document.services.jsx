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
} from "firebase/firestore";

const docCollectionRef = collection(db, "Documents");

const documentService = {
  getAllDocuments: async (page = 1, itemsPerPage = 12, searchQuery = "") => {
    try {
      const collectionRef = docCollectionRef;
      const queryRef = query(
        collectionRef,
        orderBy("title", "asc"),
        orderBy("updatedAt", "desc"),
        where("title", ">=", searchQuery),
        where("title", "<=", searchQuery + "\uf8ff"),
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
    try {
      const q = query(
        docCollectionRef,
        where(firebase.firestore.FieldPath.documentId(), "==", id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        return {
          id: userDoc.id,
          password: userDoc.data().password,
          user: userDoc.data(),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
  addDocument: (newUser) => {
    return addDoc(docCollectionRef, newUser);
  },
  updateDocument: (id, newUser) => {
    const userDocRef = doc(docCollectionRef, id);
    return updateDoc(userDocRef, newUser);
  },
};

export default documentService;
