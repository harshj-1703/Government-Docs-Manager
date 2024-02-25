import React from "react";
import "../../css/datacenter-dashboard-grid.css";

function DataCenterDashboardGrid() {
  const cards = [
    {
      heading: "Verify Users Documents",
      content: "Check and verify user uploaded documents from your datacenter",
      link: "verify-user-uploaded-docs",
    },
    {
      heading: "Users Documents Status",
      content: "Check status of user documents",
    },
    {
      heading: "Person Details",
      content: "Datacenter's head persons details",
      link: "datacenter-persons",
    },
  ];

  return (
    <div className="datacenter-dashboard-grid">
      <h1>DataCenter Dashboard</h1>
      <div className="all-cards">
        {cards.map((card, idx) => {
          return (
            <div className="card-container" key={idx}>
              <div className="card">
                <div className="front-content">
                  <p>{card.heading}</p>
                </div>
                <div className="content">
                  <p className="heading">{card.heading}</p>
                  <p>{card.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataCenterDashboardGrid;
