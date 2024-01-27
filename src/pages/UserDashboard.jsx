import React from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";
import UserNavbarMenu from "../components/UserDashboard/UserNavbarMenu";

function UserDashboard() {
  return (
    <div className="user-dashboard">
      <UserNavbar />
      <div>UserDashboard</div>
      <UserNavbarMenu />
    </div>
  );
}

export default UserDashboard;
