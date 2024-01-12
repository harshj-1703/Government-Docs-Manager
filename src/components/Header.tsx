import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <img src="" alt="Logo" />
        <span>Your Logo</span>
      </div>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/user-login">User Login</NavLink>
        <NavLink to="/datacenter-login">DataCenter Login</NavLink>
        <NavLink to="/register-user">Register User</NavLink>
      </div>
    </header>
  );
}

export default Header;
