import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function ProtectedUser({ children }) {
  const { user } = useUserAuth();
  if (user) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedUser;
