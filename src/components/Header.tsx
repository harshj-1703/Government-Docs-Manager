import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-lg font-semibold">Your Logo</span>
      </div>

      <div className="flex items-center space-x-4">
        <NavLink to="/" className="hover:text-gray-300">
          Home
        </NavLink>
        <NavLink to="/user-login" className="hover:text-gray-300">
          User Login
        </NavLink>
        <NavLink to="/datacenter-login" className="hover:text-gray-300">
          DataCenter Login
        </NavLink>
        <NavLink to="/register-user" className="hover:text-gray-300">
          Register User
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
