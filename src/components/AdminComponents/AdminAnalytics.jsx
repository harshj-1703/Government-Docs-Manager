import React from "react";

function AdminAnalytics() {
  return (
    <>
      <div className="analytics-card">
        <div className="analytics-icon" style={{ backgroundColor: "darkblue" }}>
          <span className="material-icons">group</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkblue" }}>
            1000
          </div>
          <div className="analytics-label">Total Users</div>
        </div>
      </div>

      <div className="analytics-card total-active-users">
        <div className="analytics-icon" style={{ backgroundColor: "darkcyan" }}>
          <span className="material-icons">person</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkcyan" }}>
            800
          </div>
          <div className="analytics-label">Total Active Users</div>
        </div>
      </div>

      <div className="analytics-card total-blocked-users">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgoldenrod" }}
        >
          <span className="material-icons">block</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkgoldenrod" }}>
            50
          </div>
          <div className="analytics-label">Total Blocked Users</div>
        </div>
      </div>

      <div className="analytics-card total-datacenters">
        <div className="analytics-icon" style={{ backgroundColor: "darkred" }}>
          <span className="material-icons">business</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkred" }}>
            50
          </div>
          <div className="analytics-label">Total Datacenters</div>
        </div>
      </div>
      <div className="analytics-card total-documents">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgreen" }}
        >
          <span className="material-icons">description</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkgreen" }}>
            500
          </div>
          <div className="analytics-label">Total Documents</div>
        </div>
      </div>

      <div className="analytics-card total-uploaded-documents">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkorange" }}
        >
          <span className="material-icons">cloud_upload</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkorange" }}>
            300
          </div>
          <div className="analytics-label">Total Uploaded Documents</div>
        </div>
      </div>
      <div className="analytics-card total-approved-documents">
        <div className="analytics-icon" style={{ backgroundColor: "darkblue" }}>
          <span className="material-icons">check_circle</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkblue" }}>
            200
          </div>
          <div className="analytics-label">Total Approved Documents</div>
        </div>
      </div>

      <div className="analytics-card total-rejected-documents">
        <div className="analytics-icon" style={{ backgroundColor: "darkred" }}>
          <span className="material-icons">cancel</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkred" }}>
            50
          </div>
          <div className="analytics-label">Total Rejected Documents</div>
        </div>
      </div>

      <div className="analytics-card total-user-queries">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkgreen" }}
        >
          <span className="material-icons">question_answer</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkgreen" }}>
            150
          </div>
          <div className="analytics-label">Total User Queries</div>
        </div>
      </div>

      <div className="analytics-card total-user-queries-solved">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkorange" }}
        >
          <span className="material-icons">done_all</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkorange" }}>
            120
          </div>
          <div className="analytics-label">Total User Queries Solved</div>
        </div>
      </div>

      <div className="analytics-card total-website-visits">
        <div
          className="analytics-icon"
          style={{ backgroundColor: "darkviolet" }}
        >
          <span className="material-icons">visibility</span>
        </div>
        <div className="analytics-content">
          <div className="analytics-value" style={{ color: "darkviolet" }}>
            1000
          </div>
          <div className="analytics-label">Total Website Visits</div>
        </div>
      </div>
    </>
  );
}

export default AdminAnalytics;
