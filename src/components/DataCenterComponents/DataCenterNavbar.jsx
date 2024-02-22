import React, { useState, useEffect } from "react";
import "../../css/usernavbar.css";
import "../../css/boxicons.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Skeleton = () => <div className="skeleton"></div>;

function DataCenterNavbar() {
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
        <div className="nav-bar">
          <i className="material-icons sidebarOpen">menu</i>
          <span className="logo navLogo">
            <Link to="/">
              <img src="/images/logo.png" height={30} width={30} />
              &nbsp;Gov Docs
            </Link>
          </span>
          <div className="menu">
            <div className="logo-toggle">
              <span className="logo">
                <Link to="/">Gov Docs</Link>
              </span>
              <i className="material-icons siderbarClose">cancel</i>
            </div>
            <ul className="nav-links">
              <li>
                <NavLink to="/datacenter-dashboard" end>
                  Home
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
                  LogOut
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
                  src={localStorage.getItem("imageurl")}
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

export default DataCenterNavbar;
