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
  addDataCenter: (newUser) => {
    return addDoc(datacenterCollectionRef, newUser);
  },
  //   deleteUser: (id) => {
  //     return deleteDoc(doc(bookCollectionRef, id));
  //   },
  updateDataCenter: (id, newUser) => {
    const userDocRef = doc(datacenterCollectionRef, id);
    return updateDoc(userDocRef, newUser);
  },
};

export default dataCenterServices;
