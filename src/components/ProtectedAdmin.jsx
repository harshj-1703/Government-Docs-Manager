import { Navigate } from "react-router-dom";
import CircularLoading from "./CircularLoading";
import { useAdminAuth } from "../context/AdminAuthContext";

function ProtectedAdmin({ children }) {
  const { user, isLoading } = useAdminAuth();
  if (isLoading) {
    return <CircularLoading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedAdmin;
