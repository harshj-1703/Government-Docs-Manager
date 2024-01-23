import React from "react";
import "../css/spinner.css";

function CircularLoading() {
  return (
    <>
      <div className="overlay">
        <div class="loader"></div>
      </div>
    </>
  );
}

export default CircularLoading;
