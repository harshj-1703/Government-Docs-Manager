import IonIcon from "@reacticons/ionicons";
import React from "react";

function Menu() {
  return (
    <div className="home-menu">
      <ul className="home-menu-ul">
        <li style={{ "--i": 6, "--clr1": "#1877f2" }}>
          <a href="#">
            <span>
              <i class="material-icons">home</i>
            </span>
            Home
          </a>
        </li>
        <li style={{ "--i": 5, "--clr1": "#25d366" }}>
          <a href="#">
            <span>
              <i class="material-icons">person</i>
            </span>
            User Login
          </a>
        </li>
        <li style={{ "--i": 4, "--clr1": "#1da1f2" }}>
          <a href="#">
            <span>
              <i class="material-icons">person_add</i>
            </span>
            User Registration
          </a>
        </li>
        <li style={{ "--i": 3, "--clr1": "#ff0000" }}>
          <a href="#">
            <span>
              <i class="material-icons">business_center</i>
            </span>
            Data Center Login
          </a>
        </li>
        <li style={{ "--i": 2, "--clr1": "#0a66c2" }}>
          <a href="#">
            <span>
              <i class="material-icons">perm_identity</i>
            </span>
            Admin Login
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
