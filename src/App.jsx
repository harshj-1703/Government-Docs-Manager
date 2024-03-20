import React, { useState, Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BottomBar from "./components/BottomBar.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import ProtectedUser from "./components/ProtectedUser.jsx";
import ProtectedDataCenter from "./components/ProtectedDataCenter.jsx";
import CircularLoading from "./components/CircularLoading.jsx";
import Home from "./pages/Home";
import ProtectedAdmin from "./components/ProtectedAdmin.jsx";

//Lazy loading files
const UserLogin = lazy(() => import("./pages/UserLogin"));
const DatacenterLogin = lazy(() => import("./pages/DataCenterLogin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const DataCenterDashboard = lazy(() =>
  import("./pages/DataCenterDashboard.jsx")
);
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const RegisterUser = lazy(() => import("./pages/RegisterUser"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const DocumentPage = lazy(() =>
  import("./components/DocumentsComponents/DocumentPage.jsx")
);
const UserNavbar = lazy(() =>
  import("./components/UserDashboard/UserNavbar.jsx")
);
const ChangePassword = lazy(() =>
  import("./components/UserDashboard/ChangePassword.jsx")
);
const EditProfile = lazy(() =>
  import("./components/UserDashboard/EditProfile.jsx")
);
const MyUploadedDocs = lazy(() =>
  import("./components/UserDashboard/MyUploadedDocs.jsx")
);
const UploadedByUserDocUpdate = lazy(() =>
  import("./components/UserDashboard/UploadedByUserDocUpdate.jsx")
);
const UsersApprovedDocuments = lazy(() =>
  import("./components/DataCenterComponents/UsersApprovedDocuments.jsx")
);
const UsersRejectedDocuments = lazy(() =>
  import("./components/DataCenterComponents/UsersRejectedDocuments.jsx")
);
const UserApprovedDocuments = lazy(() =>
  import("./components/UserDashboard/UserApprovedDocuments.jsx")
);
const MyDocumentRemarks = lazy(() =>
  import("./components/UserDashboard/MyDocumentRemarks.jsx")
);
const UserQueries = lazy(() =>
  import("./components/UserDashboard/UserQueries.jsx")
);

//Css files load
import "./css/App.css";
import "./css/login.css";
import "./css/registration.css";
import "./css/userdashboard.css";

const DocumentStatus = lazy(() =>
  import("./components/UserDashboard/UserDocumentStatus.jsx")
);
const DataCenterNavbar = lazy(() =>
  import("./components/DataCenterComponents/DataCenterNavbar.jsx")
);
const VerifyUserDocuments = lazy(() =>
  import("./components/DataCenterComponents/VerifyUserDocuments.jsx")
);
const UserDocumentsStatus = lazy(() =>
  import("./components/DataCenterComponents/UserDocumentsStatus.jsx")
);
const UserQueriesByDc = lazy(() =>
  import("./components/DataCenterComponents/UserQueriesByDc.jsx")
);
const VerifyUserDocumentsDetails = lazy(() =>
  import("./components/DataCenterComponents/VerifyUserDocumentsDetails.jsx")
);
const GeneratePDFWithApprovedDocument = lazy(() =>
  import(
    "./components/DataCenterComponents/GeneratePDFWithApprovedDocument.jsx"
  )
);
const UserQueryDetail = lazy(() =>
  import("./components/DataCenterComponents/UserQueryDetail.jsx")
);

const AdminNavbar = lazy(() =>
  import("./components/AdminComponents/AdminNavbar.jsx")
);

//---------------------------------- Main Function APP ----------------------------------
function App() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <BottomBar />
            <Home />
          </Suspense>
        </>
      ),
    },
    //user-login
    {
      path: "user-login",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <UserLogin />
          </Suspense>
        </>
      ),
    },
    //forgot password
    {
      path: "forgot-password",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <ForgotPassword />
          </Suspense>
        </>
      ),
    },
    //register user
    {
      path: "register-user",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <RegisterUser />
          </Suspense>
        </>
      ),
    },
    {
      path: "generatepdf-approved-document/:mobile/:docId",
      element: (
        <Suspense fallback={<CircularLoading />}>
          <ToastContainer />
          <GeneratePDFWithApprovedDocument />
        </Suspense>
      ),
    },
    //user-dashboard
    {
      path: "user-dashboard",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <ProtectedUser>
              <UserNavbar
                isMenuShow={isMenuShow}
                setIsMenuShow={setIsMenuShow}
              />
              <Outlet />
            </ProtectedUser>
          </Suspense>
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
        {
          path: "user-document-status",
          element: <DocumentStatus isMenuShow={isMenuShow} />,
        },
        {
          path: "myuploadeddocs",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <MyUploadedDocs isMenuShow={isMenuShow} />,
            },
            {
              path: "uploadedByUserDocUpdate",
              element: <UploadedByUserDocUpdate isMenuShow={isMenuShow} />,
            },
          ],
        },
        {
          path: "myapproveddocs",
          element: <UserApprovedDocuments isMenuShow={isMenuShow} />,
        },
        {
          path: "user-queries",
          element: <UserQueries isMenuShow={isMenuShow} />,
        },
        {
          path: "mydocument-remarks/:id",
          element: <MyDocumentRemarks isMenuShow={isMenuShow} />,
        },
      ],
    },
    //data-center-login
    {
      path: "datacenter-login",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <DatacenterLogin />
          </Suspense>
        </>
      ),
    },
    //data-center
    {
      path: "datacenter-dashboard",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <ProtectedDataCenter>
              <DataCenterNavbar />
              <Outlet />
            </ProtectedDataCenter>
          </Suspense>
        </>
      ),
      children: [
        {
          index: true,
          element: <DataCenterDashboard />,
        },
        {
          path: "verify-user-uploaded-docs",
          element: <VerifyUserDocuments />,
        },
        {
          path: "verify-user-uploaded-docs-detail",
          element: <VerifyUserDocumentsDetails />,
        },
        {
          path: "check-user-documents-status",
          element: <UserDocumentsStatus />,
        },
        {
          path: "datacenter-user-approved-documents",
          element: <UsersApprovedDocuments />,
        },
        {
          path: "datacenter-user-rejected-documents",
          element: <UsersRejectedDocuments />,
        },
        {
          path: "user-queries-bydc",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <UserQueriesByDc />,
            },
            {
              path: "user-query-details/:id",
              element: <UserQueryDetail />,
            },
          ],
        },
      ],
    },
    //admin-login
    {
      path: "/admin-login",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <AdminLogin />
          </Suspense>
        </>
      ),
    },
    //admin-dashboard
    {
      path: "admin-dashboard",
      element: (
        <>
          <Suspense fallback={<CircularLoading />}>
            <ToastContainer />
            <ProtectedAdmin>
              <AdminNavbar />
              <Outlet />
            </ProtectedAdmin>
          </Suspense>
        </>
      ),
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
      ],
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
