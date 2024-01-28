import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserDashboard/UserNavbar";
import "../css/userdashboard.css";
import UserNavbarMenu from "../components/UserDashboard/UserNavbarMenu";

function UserDashboard() {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => setGridData(data.slice(0, 16)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="user-dashboard">
      {isMenuShow && <UserNavbarMenu />}
      <UserNavbar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />

      {/* User Dashboard */}
      <div
        className={
          isMenuShow
            ? "user-dashboard-main-content-blur"
            : "user-dashboard-main-content"
        }
      >
        <div className="grid-container">
          {gridData.map((item) => (
            <div key={item.id} className="grid-item">
              <img src={item.thumbnailUrl} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
