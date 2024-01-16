import React, { useState } from "react";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import DatacenterLogin from "./pages/DataCenterLogin";
import RegisterUser from "./pages/RegisterUser";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error404Page from "./pages/Error404Page.jsx";
import Protected from "./components/Protected.jsx";
import BottomBar from "./components/BottomBar.jsx";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <BottomBar />
          <Outlet />
        </>
      ),
      errorElement: <Error404Page />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/user-login",
          element: <UserLogin />,
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
