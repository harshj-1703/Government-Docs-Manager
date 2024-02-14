import React, { useState } from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import DataCenterDashboard from "./pages/DataCenterDashboard.jsx";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.jsx";
import ProtectedUser from "./components/ProtectedUser.jsx";
import BottomBar from "./components/BottomBar.jsx";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import DocumentPage from "./components/DocumentsComponents/DocumentPage.jsx";
import UserNavbar from "./components/UserDashboard/UserNavbar.jsx";
import ChangePassword from "./components/UserDashboard/ChangePassword.jsx";
import EditProfile from "./components/UserDashboard/EditProfile.jsx";
import ProtectedDataCenter from "./components/ProtectedDataCenter.jsx";

function App() {
  const [isMenuShow, setIsMenuShow] = useState(false);
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
      path: "user-login",
      element: (
        <>
          <ToastContainer />
          <UserLogin />
        </>
      ),
    },
    //forgot password
    {
      path: "forgot-password",
      element: (
        <>
          <ToastContainer />
          <ForgotPassword />
        </>
      ),
    },
    //register user
    {
      path: "register-user",
      element: (
        <>
          <ToastContainer />
          <RegisterUser />
        </>
      ),
    },
    //user-dashboard
    {
      path: "user-dashboard",
      element: (
        <>
          <ToastContainer />
          <ProtectedUser>
            <UserNavbar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
            <Outlet />
          </ProtectedUser>
        </>
      ),
      children: [
        {
          index: true,
          element: <UserDashboard isMenuShow={isMenuShow} />,
        },
        {
          path: "docdetails",
          element: <DocumentPage isMenuShow={isMenuShow} />,
        },
        {
          path: "change-password",
          element: <ChangePassword isMenuShow={isMenuShow} />,
        },
        {
          path: "edit-profile",
          element: <EditProfile isMenuShow={isMenuShow} />,
        },
      ],
    },
    {
      path: "datacenter-login",
      element: (
        <>
          <ToastContainer />
          <DatacenterLogin />
        </>
      ),
    },
    {
      path: "datacenter-dashboard",
      element: (
        <>
          <ToastContainer />
          <ProtectedDataCenter>
            <DataCenterDashboard />
          </ProtectedDataCenter>
        </>
      ),
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
