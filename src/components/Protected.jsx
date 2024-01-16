import { Navigate } from "react-router-dom";

function Protected ({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
