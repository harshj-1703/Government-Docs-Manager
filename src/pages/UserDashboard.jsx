import React, { useState } from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";
import UserNavbarMenu from "../components/UserDashboard/UserNavbarMenu";

function UserDashboard() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  return (
    <div className="user-dashboard">
      {isMenuShow && <UserNavbarMenu />}
      <UserNavbar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
      <div>UserDashboard</div>
    </div>
  );
}

export default UserDashboard;
