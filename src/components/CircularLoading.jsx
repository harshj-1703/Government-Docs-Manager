import React from "react";
import "../css/spinner.css";

function CircularLoading() {
  return (
    <>
      <div className="overlay">
        <div className="loader"></div>
      </div>
    </>
  );
}

export default CircularLoading;
