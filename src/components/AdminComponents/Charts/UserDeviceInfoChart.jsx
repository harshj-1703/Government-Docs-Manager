import React, { useEffect } from "react";
import "../../../assets/Chart";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function UserDeviceInfoChart() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteLoadDataRef = collection(db, "WebsiteLoadData");

        const windowsUserQuery = await getDocs(
          query(websiteLoadDataRef, where("os", "==", "Windows"))
        );

        const macOsUserQuery = await getDocs(
          query(websiteLoadDataRef, where("os", "==", "Mac OS"))
        );

        const iOSUserQuery = await getDocs(
          query(websiteLoadDataRef, where("os", "==", "iOS"))
        );

        const androidUserQuery = await getDocs(
          query(websiteLoadDataRef, where("os", "==", "Android"))
        );

        const othersUserQuery = await getDocs(
          query(websiteLoadDataRef, where("os", "==", "Others"))
        );

        const xValues = ["Windows", "Mac OS", "iOS", "Android", "Others"];
        const barColors = ["skyblue", "blue", "darkblue", "orange", "tomato"];
        const yValues = [
          windowsUserQuery.size,
          macOsUserQuery.size,
          iOSUserQuery.size,
          androidUserQuery.size,
          othersUserQuery.size,
        ];

        await new Chart("devicesInfoChart", {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [
              {
                fill: false,
                lineTension: 0,
                backgroundColor: barColors,
                borderColor: "darkblue",
                borderWidth: 1,
                data: yValues,
              },
            ],
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Total Number Of Devices Used Website",
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
        id="devicesInfoChart"
        className="analytics-card"
        style={{ width: "100%", maxWidth: "550px" }}
      ></canvas>
    </div>
  );
}

export default UserDeviceInfoChart;
