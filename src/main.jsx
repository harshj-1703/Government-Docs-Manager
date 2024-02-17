import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext.jsx";
import { DataCenterAuthContextProvider } from "./context/DataCenterAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <DataCenterAuthContextProvider>
        <App />
      </DataCenterAuthContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
