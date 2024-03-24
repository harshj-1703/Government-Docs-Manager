import React, { useState, useEffect } from "react";
import "../../../assets/Chart";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

function WebsiteVisitsChart() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteLoadDataRef = collection(db, "WebsiteLoadData");

        const last7DaysQuery = query(
          websiteLoadDataRef,
          where(
            "createdAt",
            ">",
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ),
          orderBy("createdAt", "asc")
        );

        const querySnapshot = await getDocs(last7DaysQuery);
        const data = querySnapshot.docs.map((doc) => ({
          date: doc.data().createdAt.toDate().toLocaleDateString(),
        }));
        const visitsCountByDate = data.reduce((acc, obj) => {
          const date = obj.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const sortedVisitsCountByDate = Object.entries(visitsCountByDate)
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        const labels = Object.keys(sortedVisitsCountByDate);
        const values = Object.values(sortedVisitsCountByDate);
        const xValues = labels;
        const yValues = values;

        await new Chart("websiteVisitsChart", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [
              {
                fill: false,
                lineTension: 0,
                backgroundColor: "white",
                borderColor: "red",
                borderWidth: 3,
                data: yValues,
              },
            ],
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Total Websites visits per day Users(Last 7 Days)",
              fontSize: "20",
              fontColor: "grey",
            },
            legend: { display: false },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    fontColor: "darkorange",
                    fontSize: "14",
                    precision: 0,
                  },
                  gridLines: {
                    zeroLineColor: "#ffcc33",
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "darkorange",
                    fontSize: "14",
                  },
                  gridLines: {
                    zeroLineColor: "#ffcc33",
                  },
                },
              ],
            },
          },
        });
      } catch (error) {
        console.error("Error fetching website visits data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="website-visits-chart">
      <canvas
        id="websiteVisitsChart"
        className="analytics-card"
        style={{ width: "100%", maxWidth: "550px" }}
      ></canvas>
    </div>
  );
}

export default WebsiteVisitsChart;
