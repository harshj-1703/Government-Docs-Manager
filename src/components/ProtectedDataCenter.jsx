import { Navigate } from "react-router-dom";
import CircularLoading from "./CircularLoading";
import { useDataCenterAuth } from "../context/DataCenterAuthContext";

function ProtectedDataCenter({ children }) {
  const { user, isLoading } = useDataCenterAuth();
  if (isLoading) {
    return <CircularLoading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedDataCenter;
