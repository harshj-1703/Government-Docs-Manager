import React from "react";

function Menu() {
  return (
    <div className="home-menu">
      <ul className="home-menu-ul">
        <li style={{ "--i": 6 }}>
          <a href="#">Home</a>
        </li>
        <li style={{ "--i": 5 }}>
          <a href="#">User Login</a>
        </li>
        <li style={{ "--i": 4 }}>
          <a href="#">User Registration</a>
        </li>
        <li style={{ "--i": 3 }}>
          <a href="#">Data Center Login</a>
        </li>
        <li style={{ "--i": 2 }}>
          <a href="#">Admin Login</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
