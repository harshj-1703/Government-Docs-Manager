import React from "react";
import "../../css/datacenter-dashboard-grid.css";
import { useNavigate } from "react-router-dom";

function DataCenterDashboardGrid() {
  const navigate = useNavigate();
  const cards = [
    {
      heading: "Verify Users Documents",
      content: "Check and verify user uploaded documents from your datacenter",
      link: "verify-user-uploaded-docs",
    },
    {
      heading: "Users Documents Status",
      content: "Check status of user documents",
      link: "check-user-documents-status",
    },
    {
      heading: "Approved Documents",
      content:
        "Watch and print recipt of users verified documents from datacenter",
      link: "datacenter-user-approved-documents",
    },
    {
      heading: "Rejected Documents",
      content:
        "Watch and print recipt of users rejected documents from datacenter",
      link: "datacenter-user-rejected-documents",
    },
    {
      heading: "DataCenter Details",
      content: "Datacenter's all details",
      link: "datacenter-details",
    },
  ];

  return (
    <div className="datacenter-dashboard-grid">
      <h1>DataCenter Dashboard</h1>
      <div className="all-cards">
        {cards.map((card, idx) => {
          return (
            <div
              className="card-container"
              key={idx}
              onClick={() => {
                navigate(card.link);
              }}
            >
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
