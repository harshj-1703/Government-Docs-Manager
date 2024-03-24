import React, { useState, useEffect } from "react";
import "../../../assets/Chart";
import approvedDocumentsServices from "../../../services/approved-document.services";
import rejectedDocumentsServices from "../../../services/rejected-document.services";

function ApprovedAndRejectedDocsPieChart() {
  const fetchTotalApprovedDocuments = async () => {
    try {
      const noOf = await approvedDocumentsServices.getTotalApprovedDocuments();
      return noOf;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalRejectedDocuments = async () => {
    try {
      const noOf = await rejectedDocumentsServices.getTotalRejectedDocuments();
      return noOf;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalApprovedDocuments();
      await fetchTotalRejectedDocuments();

      const [approvedDocuments, rejectedDocuments] = await Promise.all([
        fetchTotalApprovedDocuments(),
        fetchTotalRejectedDocuments(),
      ]);

      const xValues = ["Approved", "Rejected"];
      const yValues = [approvedDocuments, rejectedDocuments];
      const barColors = ["MediumSeaGreen", "Tomato"];
      const hoverColors = ["DarkGreen", "DarkRed"];

      await new Chart("approvedAndRejectedPieChart", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              hoverBackgroundColor: hoverColors,
              data: yValues,
              fontSize: "15",
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Total Approved vs Rejected Documents",
            fontSize: "20",
            fontColor: "grey",
          },
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="website-visits-chart">
      <canvas
        id="approvedAndRejectedPieChart"
        className="analytics-card"
        style={{ width: "100%", maxWidth: "550px" }}
      ></canvas>
    </div>
  );
}

export default ApprovedAndRejectedDocsPieChart;
