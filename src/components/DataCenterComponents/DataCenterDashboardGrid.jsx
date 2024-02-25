import React from "react";
import "../../css/datacenter-dashboard-grid.css";

function DataCenterDashboardGrid() {
  const numberOfCards = 6;
  const cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(
      <div className="card-container" key={i}>
        <div className="card">
          <div className="front-content">
            <p>Hover me</p>
          </div>
          <div className="content">
            <p className="heading">Card Hover</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipii voluptas ten
              mollitia pariatur odit, ab minus ratione adipisci accusamus vel
              est excepturi laboriosam magnam necessitatibus dignissimos
              molestias.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="datacenter-dashboard-grid">
      <h1>DataCenter Dashboard</h1>
      <div className="all-cards">{cards}</div>
    </div>
  );
}

export default DataCenterDashboardGrid;
