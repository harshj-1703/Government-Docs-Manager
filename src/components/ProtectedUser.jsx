import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedUser({ children }) {
  if (auth.currentUser) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedUser;
