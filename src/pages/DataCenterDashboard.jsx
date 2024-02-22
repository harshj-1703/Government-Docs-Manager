import React, { useEffect, useState } from "react";
import "../css/datacenter-dashboard.css";

const Skeleton = () => <div className="skeleton"></div>;

//TODO - song,temprature of city
function DataCenterDashboard() {
  const [formattedDate, setFormattedDate] = useState("");
  const [capitalizedCity, setCapitalizedCity] = useState("");
  const [capitalizedState, setCapitalizedState] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const sec = document.querySelector(".sec");
    const min = document.querySelector(".min");
    const hr = document.querySelector(".hr");
    setInterval(function () {
      let time = new Date();
      let secs = time.getSeconds() * 6;
      let mins = time.getMinutes() * 6;
      let hrs = time.getHours() * 30;
      sec.style.transform = `rotateZ(${secs}deg)`;
      min.style.transform = `rotateZ(${mins}deg)`;
      hr.style.transform = `rotateZ(${hrs + mins / 12}deg)`;
    });

    const currentDate = new Date();
    setFormattedDate(
      currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    );

    const city = localStorage.getItem("city");
    const state = localStorage.getItem("state");
    setCapitalizedCity(
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
    );
    setCapitalizedState(
      state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()
    );
  }, []);

  return (
    <div className="datacenter-dashboard-main">
      {/* Image */}
      <div className="datacenter-profile-card">
        {/* Tempdata */}
        <div className="temp-data">
          <div className="card">
            {/* <div className="container">
              <div className="cloud front">
                <span className="left-front"></span>
                <span className="right-front"></span>
              </div>
              <span className="sun sunshine"></span>
              <span className="sun"></span>
              <div className="cloud back">
                <span className="left-back"></span>
                <span className="right-back"></span>
              </div>
            </div> */}

            <div className="card-header">
              <span>
                {capitalizedCity},
                <br />
                {capitalizedState}
              </span>
              <span>{formattedDate}</span>
            </div>

            <span className="temp">23°</span>
          </div>
        </div>
        <div className="datacenter-dashboard-profile-image">
          {!imageLoaded && <Skeleton />}
          <img
            src={localStorage.getItem("imageurl")}
            alt=""
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        {/* Clock */}
      </div>
      <div className="clock">
        <div className="center-nut"></div>
        <div className="center-nut2"></div>
        <div className="indicators">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="sec-hand">
          <div className="sec"></div>
        </div>
        <div className="min-hand">
          <div className="min"></div>
        </div>
        <div className="hr-hand">
          <div className="hr"></div>
        </div>
      </div>
    </div>
  );
}

export default DataCenterDashboard;
