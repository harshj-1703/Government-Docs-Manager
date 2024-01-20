import React, { useState } from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.jsx";
import Protected from "./components/Protected.jsx";
import BottomBar from "./components/BottomBar.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <BottomBar />
          <Home />
        </>
      ),
    },
    {
      path: "/user-login",
      element: (
        <>
          <ToastContainer />
          <UserLogin />
        </>
      ),
    },
    {
      path: "/register-user",
      element: <RegisterUser />,
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
      path: "*",
      element: <Error404Page />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
