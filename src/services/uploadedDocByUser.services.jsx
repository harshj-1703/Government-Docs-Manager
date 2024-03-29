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
  getAllUploadeByUserDocumentsWithRandomDCorVotebased: async (
    dataCenterId,
    page = 1,
    itemsPerPage = 2,
    mobile,
    searchQuery = ""
  ) => {
    try {
      const collectionRef = docCollectionRef;
      let queryRef = query(
        collectionRef,
        where("userMobile", ">=", searchQuery.toUpperCase()),
        where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        where("approveStatus", "==", "Pending"),
        where("randomDataCenterId", "in", [dataCenterId, 0]),
        orderBy("userMobile", "desc"),
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

      // const filteredDocuments = documents.filter(
      //   (doc) => !doc.data.checkedByDCMNumber.includes(mobile)
      // );

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("userMobile", ">=", searchQuery.toUpperCase()),
          where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
          where("status", "==", 1),
          where("approveStatus", "==", "Pending"),
          where("randomDataCenterId", "in", [dataCenterId, 0])
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

  getAllUploadeByUserDocumentsWithPagination: async (
    page = 1,
    itemsPerPage = 2,
    searchQuery = ""
  ) => {
    try {
      const collectionRef = docCollectionRef;
      let queryRef = query(
        collectionRef,
        where("userMobile", ">=", searchQuery.toUpperCase()),
        where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        orderBy("userMobile", "desc"),
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

      // const filteredDocuments = documents.filter(
      //   (doc) => !doc.data.checkedByDCMNumber.includes(mobile)
      // );

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("userMobile", ">=", searchQuery.toUpperCase()),
          where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
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

  getAllApprovedUserDocumentsWithPagination: async (
    page = 1,
    itemsPerPage = 2,
    searchQuery = ""
  ) => {
    try {
      const collectionRef = docCollectionRef;
      let queryRef = query(
        collectionRef,
        where("userMobile", ">=", searchQuery.toUpperCase()),
        where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        where("approveStatus", "==", "Approved"),
        orderBy("userMobile", "desc"),
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

      // const filteredDocuments = documents.filter(
      //   (doc) => !doc.data.checkedByDCMNumber.includes(mobile)
      // );

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("userMobile", ">=", searchQuery.toUpperCase()),
          where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
          where("approveStatus", "==", "Approved"),
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

  getAllRejectedUserDocumentsWithPagination: async (
    page = 1,
    itemsPerPage = 2,
    searchQuery = ""
  ) => {
    try {
      const collectionRef = docCollectionRef;
      let queryRef = query(
        collectionRef,
        where("userMobile", ">=", searchQuery.toUpperCase()),
        where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
        where("status", "==", 1),
        where("approveStatus", "==", "Rejected"),
        orderBy("userMobile", "desc"),
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

      // const filteredDocuments = documents.filter(
      //   (doc) => !doc.data.checkedByDCMNumber.includes(mobile)
      // );

      const totalDocsQuerySnapshot = await getDocs(
        query(
          collectionRef,
          where("userMobile", ">=", searchQuery.toUpperCase()),
          where("userMobile", "<=", searchQuery.toUpperCase() + "\uf8ff"),
          where("approveStatus", "==", "Rejected"),
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

  getTotalUploadedDocuments: async () => {
    const querySnapshot = await getDocs(docCollectionRef);
    const totalCounts = querySnapshot.size;
    return totalCounts;
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
  getAllUploadeByUserDocumentsFromUserMobile: async (userMobile) => {
    try {
      const collectionRef = docCollectionRef;
      const queryRef = query(
        collectionRef,
        where("userMobile", "==", userMobile),
        where("status", "==", 1)
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
  getDocumentFromIdAndUserMobile: async (docId, userMobile) => {
    try {
      const q = query(
        docCollectionRef,
        where("docId", "==", docId),
        where("userMobile", "==", userMobile),
        where("status", "==", 1)
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
