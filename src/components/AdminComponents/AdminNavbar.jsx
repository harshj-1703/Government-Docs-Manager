import React, { useState, useEffect } from "react";
import "../../css/adminnavbar.css";
import "../../css/boxicons.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Skeleton = () => <div className="skeleton"></div>;

function AdminNavbar() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const modeToggle = document.querySelector(".dark-light");
    const sidebarOpen = document.querySelector(".sidebarOpen");

    let getMode = localStorage.getItem("mode");

    if (getMode && getMode === "dark-mode") {
      body.classList.add("dark");
    }

    const handleModeToggle = () => {
      modeToggle.classList.toggle("active");
      body.classList.toggle("dark");

      if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
      } else {
        localStorage.setItem("mode", "dark-mode");
      }
    };

    const handleSidebarOpen = () => {
      nav.classList.add("active");
    };

    const handleBodyClick = (e) => {
      let clickedElm = e.target;

      if (
        !clickedElm.classList.contains("sidebarOpen") &&
        !clickedElm.classList.contains("menu")
      ) {
        nav.classList.remove("active");
      }
    };

    modeToggle.addEventListener("click", handleModeToggle);
    // searchToggle.addEventListener("click", handleSearchToggle);
    sidebarOpen.addEventListener("click", handleSidebarOpen);
    body.addEventListener("click", handleBodyClick);
    return () => {
      modeToggle.removeEventListener("click", handleModeToggle);
      //   searchToggle.removeEventListener("click", handleSearchToggle);
      sidebarOpen.removeEventListener("click", handleSidebarOpen);
      body.removeEventListener("click", handleBodyClick);
    };
  }, []);
  return (
    <>
      <nav>
        <div className="nav-bar-admin">
          <i className="material-icons sidebarOpen">menu</i>
          <span className="logo navLogo">
            <Link to="/">
              <img src="/images/logo.png" height={30} width={30} />
              &nbsp;&nbsp;Gov Docs
            </Link>
          </span>
          <div className="menu-admin">
            <div className="logo-toggle">
              <span className="logo">
                <Link to="/">Gov Docs</Link>
              </span>
              <i className="material-icons siderbarClose">cancel</i>
            </div>
            <ul className="nav-links-admin">
              <li>
                <NavLink to="/admin-dashboard" end>
                  <i className="material-icons">dashboard</i>
                  &nbsp;&nbsp;Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-add-document" end>
                  <i className="material-icons">description</i>&nbsp;&nbsp;Add
                  Document
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-add-datacenter" end>
                  <i className="material-icons">storage</i>&nbsp;&nbsp;Add
                  DataCenter
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-add-posters" end>
                  <i className="material-icons">image</i>&nbsp;&nbsp;Add Posters
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-users" end>
                  <i className="material-icons">people</i>&nbsp;&nbsp;All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-document" end>
                  <i className="material-icons">library_books</i>&nbsp;&nbsp;All
                  Documents
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-datacenters" end>
                  <i className="material-icons">dns</i>&nbsp;&nbsp;All
                  DataCenters
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-uploadedDocuments" end>
                  <i className="material-icons">cloud_upload</i>&nbsp;&nbsp;All
                  Uploaded Docs
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-approvedDocuments" end>
                  <i className="material-icons">check_circle</i>
                  &nbsp;&nbsp;Approved Documents
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-all-rejectedDocuments" end>
                  <i className="material-icons">cancel</i>&nbsp;&nbsp;Rejected
                  Documents
                </NavLink>
              </li>
              <li>
                <NavLink to="admin-user-queries" end>
                  <i className="material-icons">question_answer</i>
                  &nbsp;&nbsp;User Queries
                </NavLink>
              </li>
              <li>
                <Link
                  onClick={() => {
                    signOut(auth);
                    localStorage.clear();
                    navigate("/");
                  }}
                  style={{ color: "red" }}
                >
                  <i className="material-icons">logout</i>&nbsp;&nbsp;LogOut
                </Link>
              </li>
            </ul>
          </div>

          <div className="darkLight-searchBox">
            <div className="dark-light">
              <i className="material-icons moon">dark_mode</i>
              <i className="material-icons sun">light_mode</i>
            </div>
            <div className="profile-image">
              <LazyLoadComponent>
                {!imageLoaded && <Skeleton />}
                <img
                  className="profile-image-photo"
                  src={localStorage.getItem("imageUrl")}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                  onLoad={() => setImageLoaded(true)}
                  alt=""
                />
              </LazyLoadComponent>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
