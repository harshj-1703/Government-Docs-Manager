import React, { useEffect, useState } from "react";
import "../css/datacenter-dashboard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DataCenterDashboardGrid from "../components/DataCenterComponents/DataCenterDashboardGrid";

const Skeleton = () => <div className="skeleton"></div>;

//TODO - song
function DataCenterDashboard() {
  const [formattedDate, setFormattedDate] = useState("");
  const [capitalizedCity, setCapitalizedCity] = useState("");
  const [capitalizedState, setCapitalizedState] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tempdata, setTempData] = useState(null);
  const person1 = localStorage.getItem("person1");
  const person2 = localStorage.getItem("person2");
  const mobile = localStorage.getItem("mobile");

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
    // getTempratureData();
  }, []);

  const getTempratureData = async () => {
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    state = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();

    setCapitalizedCity(city);
    setCapitalizedState(state);

    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.TEMPRATURE_API_KEY}&q=${city}&aqi=yes`
      );
      const data = await res.json();
      // console.log(data);
      const jsonTemprature = {
        icon: data.current.condition.icon,
        environment: data.current.condition.text,
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        is_day: data.current.is_day,
      };
      setTempData(jsonTemprature);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="datacenter-dashboard-main">
      {/* Clock */}
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
      {/* Image */}
      <div className="datacenter-profile-card">
        {/* Details */}
        <div className="datacenter-data-persons">
          <div>
            <span>
              <i className="material-icons">person</i>
            </span>{" "}
            {person1}
          </div>
          <div>
            {" "}
            <span>
              <i className="material-icons">people</i>
            </span>{" "}
            {person2}
          </div>
          <div>
            {" "}
            <span>
              <i className="material-icons">phone</i>
            </span>{" "}
            {mobile}
          </div>
        </div>
        <div className="datacenter-data-combine-column">
          {/* Tempdata */}
          {tempdata && (
            <div className="temp-data">
              <div className={tempdata.is_day ? "card" : "card-moon"}>
                <div className="container">
                  <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                  </div>
                  {tempdata.is_day ? (
                    <>
                      <span className="sun sunshine"></span>
                      <span className="sun"></span>
                    </>
                  ) : (
                    <span className="moon"></span>
                  )}
                  <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                  </div>
                </div>
                <div
                  className={
                    tempdata.is_day ? "card-header" : "card-header-moon"
                  }
                >
                  <span>
                    {capitalizedCity},
                    <br />
                    {capitalizedState}
                  </span>
                  <span>{formattedDate}</span>
                </div>
                <span className="temp">{tempdata.temp_c}°</span>
              </div>
            </div>
          )}
          <div className="datacenter-dashboard-profile-image">
            {!imageLoaded && <Skeleton />}
            <LazyLoadImage
              src={localStorage.getItem("imageurl")}
              alt=""
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>
      <DataCenterDashboardGrid />
    </div>
  );
}

export default DataCenterDashboard;
