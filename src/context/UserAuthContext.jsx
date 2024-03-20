import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import dataCenterServices from "../services/data-center.services";
import adminServices from "../services/admin.services";

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

  const mobileAvailableOrNotAdmin = async (mobile) => {
    const available = await adminServices.getadminFromMobile(mobile);
    if (available) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.phoneNumber) {
          if (
            await mobileAvailableOrNotDataCenter(
              currentUser.phoneNumber.slice(3)
            )
          ) {
            currentUser.role = "datacenter";
          } else if (
            await mobileAvailableOrNotAdmin(currentUser.phoneNumber.slice(3))
          ) {
            currentUser.role = "admin";
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
