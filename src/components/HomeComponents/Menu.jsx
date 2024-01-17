import IonIcon from "@reacticons/ionicons";
import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="home-menu">
      <ul className="home-menu-ul">
        <li style={{ "--i": 6, "--clr1": "#1877f2" }}>
          <Link to="/">
            <span>
              <i class="material-icons">home</i>
            </span>
            Home
          </Link>
        </li>
        <li style={{ "--i": 5, "--clr1": "#25d366" }}>
          <Link to="user-login">
            <span>
              <i class="material-icons">person</i>
            </span>
            User Login
          </Link>
        </li>
        <li style={{ "--i": 4, "--clr1": "#1da1f2" }}>
          <Link to="/register-user">
            <span>
              <i class="material-icons">person_add</i>
            </span>
            User Registration
          </Link>
        </li>
        <li style={{ "--i": 3, "--clr1": "#ff0000" }}>
          <Link to="datacenter-login">
            <span>
              <i class="material-icons">business_center</i>
            </span>
            Data Center Login
          </Link>
        </li>
        <li style={{ "--i": 2, "--clr1": "#0a66c2" }}>
          <Link>
            <span>
              <i class="material-icons">perm_identity</i>
            </span>
            Admin Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
