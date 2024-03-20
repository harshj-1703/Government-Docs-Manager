import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className="home-menu">
      <ul className="home-menu-ul">
        {isLoggedIn && (
          <li style={{ "--i": 6, "--clr1": "#1877f2" }}>
            <Link to="/user-dashboard">
              <span>
                <i className="material-icons">home</i>
              </span>
              Home
            </Link>
          </li>
        )}
        {/* {!isLoggedIn && ( */}
        <li style={{ "--i": 5, "--clr1": "#25d366" }}>
          <Link to="/user-login">
            <span>
              <i className="material-icons">person</i>
            </span>
            User Login
          </Link>
        </li>
        {/* )} */}
        <li style={{ "--i": 4, "--clr1": "#1da1f2" }}>
          <Link to="/register-user">
            <span>
              <i className="material-icons">person_add</i>
            </span>
            User Registration
          </Link>
        </li>
        <li style={{ "--i": 3, "--clr1": "#ff0000" }}>
          <Link to="/datacenter-login">
            <span>
              <i className="material-icons">business_center</i>
            </span>
            Data Center Login
          </Link>
        </li>
        <li style={{ "--i": 2, "--clr1": "#0a66c2" }}>
          <Link to={"/admin-login"}>
            <span>
              <i className="material-icons">perm_identity</i>
            </span>
            Admin Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
