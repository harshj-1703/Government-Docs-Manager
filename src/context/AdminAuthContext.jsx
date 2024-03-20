import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import adminServices from "../services/admin.services";

const adminAuthContext = createContext();

export function AdminAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mobileAdminAvailableOrNot = async (mobile) => {
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
            await mobileAdminAvailableOrNot(currentUser.phoneNumber.slice(3))
          ) {
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
    <adminAuthContext.Provider value={{ user, isLoading }}>
      {children}
    </adminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(adminAuthContext);
}
