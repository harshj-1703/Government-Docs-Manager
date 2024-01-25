import React from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.jsx";
import ProtectedUser from "./components/ProtectedUser.jsx";
import BottomBar from "./components/BottomBar.jsx";
import { ToastContainer } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import ForgotPassword from "./pages/ForgotPassword.jsx";

function SignOut() {
  function logout() {
    signOut(auth);
  }
  return <button onClick={logout}>SignOut</button>;
}

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
      path: "/forgot-password",
      element: (
        <>
          <ToastContainer />
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/register-user",
      element: (
        <>
          <ToastContainer />
          <RegisterUser />
        </>
      ),
    },
    {
      path: "/datacenter-login",
      element: (
        <ProtectedUser>
          <DatacenterLogin />
        </ProtectedUser>
      ),
    },
    {
      path: "/logout",
      element: <SignOut />,
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
