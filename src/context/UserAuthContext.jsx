import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import dataCenterServices from "../services/data-center.services";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const mobileAvailableOrNotDataCenter = async (mobile) => {
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
          if (
            mobileAvailableOrNotDataCenter(currentUser.phoneNumber.slice(3))
          ) {
            currentUser.role = "datacenter";
          }
        }
      }
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, isLoading }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
