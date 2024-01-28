import React from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.jsx";
import ProtectedUser from "./components/ProtectedUser.jsx";
import BottomBar from "./components/BottomBar.jsx";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

function App() {
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
    //user-login
    {
      path: "/user-login",
      element: (
        <>
          <ToastContainer />
          <UserLogin />
        </>
      ),
    },
    //forgot password
    {
      path: "/forgot-password",
      element: (
        <>
          <ToastContainer />
          <ForgotPassword />
        </>
      ),
    },
    //register user
    {
      path: "/register-user",
      element: (
        <>
          <ToastContainer />
          <RegisterUser />
        </>
      ),
    },
    //user-dashboard
    {
      path: "/user-dashboard",
      element: (
        <>
          <ToastContainer />
          <ProtectedUser>
            <UserDashboard />
          </ProtectedUser>
        </>
      ),
    },
    {
      path: "/datacenter-login",
      element: <DatacenterLogin />,
    },
    //error 404
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
