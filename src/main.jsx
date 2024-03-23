import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx";
import { DataCenterAuthContextProvider } from "./context/DataCenterAuthContext.jsx";
import { AdminAuthContextProvider } from "./context/AdminAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserAuthContextProvider>
    <DataCenterAuthContextProvider>
      <AdminAuthContextProvider>
        <App />
      </AdminAuthContextProvider>
    </DataCenterAuthContextProvider>
  </UserAuthContextProvider>
  // </React.StrictMode>
);
