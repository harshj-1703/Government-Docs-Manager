import React, { useState } from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.tsx";
import Protected from "./components/Protected.tsx";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error404Page />,
    },
    {
      path: "/user-login",
      element: <UserLogin />,
    },
    {
      path: "/datacenter-login",
      element: (
        <Protected isLoggedIn={isLoggedIn}>
          <DatacenterLogin />
        </Protected>
      ),
    },
    {
      path: "/register-user",
      element: <RegisterUser />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
