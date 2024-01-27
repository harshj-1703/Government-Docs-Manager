import React from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";

function UserDashboard() {
  return (
    <div className="user-dashboard">
      <UserNavbar />
      <div>UserDashboard</div>
    </div>
  );
}

export default UserDashboard;
