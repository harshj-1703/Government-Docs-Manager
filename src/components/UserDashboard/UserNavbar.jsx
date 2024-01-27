import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/usernavbar.css";
import "../../css/boxicons.min.css";
import "./UserNavbar";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function UserNavbar() {
  useEffect(() => {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const modeToggle = document.querySelector(".dark-light");
    const searchToggle = document.querySelector(".searchToggle");
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

    // const handleSearchToggle = () => {
    //   searchToggle.classList.toggle("active");
    // };

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Portfolio</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="darkLight-searchBox">
          <div className="dark-light">
            <i className="material-icons moon">dark_mode</i>
            <i className="material-icons sun">light_mode</i>
          </div>
          {/* <div className="searchBox">
            <div className="searchToggle">
            <i className="material-icons cancel">cancel</i>
            <i className="material-icons search">search</i>
            </div>
            <div className="search-field">
              <input type="text" placeholder="Search..." />
              <i className="material-icons">search</i>
            </div>
          </div> */}
          <LazyLoadComponent>
            <img
              src={localStorage.getItem("profileImage")}
              className="profile-image"
            ></img>
          </LazyLoadComponent>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
