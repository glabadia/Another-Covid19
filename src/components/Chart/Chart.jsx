import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchData();
  }, []);

  const lineChart = Boolean(dailyData.length > 0) ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(255,0,0,.5)",
            fill: true
          }
        ]
      }}
    />
  ) : null;

  const barChart = Boolean(confirmed) ? (
    <Bar
      data={{
        labels: ["Infected", "Deaths", "Recovered"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,.5)",
              "rgba(255,0,0,.5)",
              "rgba(0,255,0,.5)"
            ],
            data: [confirmed.value, deaths.value, recovered.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, title: `Current situation in ${country}` }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
