import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import dataCenterServices from "../services/data-center.services";

const dataCenterAuthContext = createContext();

export function DataCenterAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mobileAvailableOrNot = async (mobile) => {
    const available = await dataCenterServices.getDataCenterFromMobile(mobile);
    if (available) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.phoneNumber) {
          if (mobileAvailableOrNot(currentUser.phoneNumber.slice(3))) {
            setUser(currentUser);
          }
        }
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <dataCenterAuthContext.Provider value={{ user, isLoading }}>
      {children}
    </dataCenterAuthContext.Provider>
  );
}

export function useDataCenterAuth() {
  return useContext(dataCenterAuthContext);
}
