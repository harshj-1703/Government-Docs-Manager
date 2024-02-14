import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import CircularLoading from "./CircularLoading";

function ProtectedUser({ children }) {
  const { user, isLoading } = useUserAuth();
  if (isLoading) {
    return <CircularLoading />;
  }

  if (user) {
    if (user.role == "datacenter") {
      return <Navigate to="/datacenter-dashboard" replace />;
    }
  }
  if (user) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedUser;
