import React from "react";
import "../../css/admin-dashboard.css";
import AdminAnalytics from "./AdminAnalytics";
import WebsiteVisitsChart from "./Charts/WebsiteVisitsChart";
import ApprovedAndRejectedDocsPieChart from "./Charts/ApprovedAndRejectedDocsPieChart";

function AdminDashboardData() {
  return (
    <div className="admin-dashboard-data">
      <div className="admin-dashboard-data-main">
        <AdminAnalytics />
      </div>
      <div className="charts-grid">
        <WebsiteVisitsChart />
        <ApprovedAndRejectedDocsPieChart />
      </div>
    </div>
  );
}

export default AdminDashboardData;
