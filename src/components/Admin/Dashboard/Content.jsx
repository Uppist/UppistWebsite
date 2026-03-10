/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../assets/Dashboard/time.svg";
import right from "../../../assets/Dashboard/Icon.svg";
// import img1 from "../../../assets/Dashboard/Content/img1.png";
import Chart from "./Chart";
import dayjs from "dayjs";

// import img from "../../../assets/Dashboard/Content/img2.png";

export default function Content({ Programme, logs }) {
  const [selectedTime, setSelectedTime] = useState("All time");
  const [isTime, setIsTime] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [recentWebLogs, setRecentWebLogs] = useState([]);

  const parseDate = (ts) => {
    if (!ts) return null;
    const d = new Date(ts);
    if (isNaN(d.getTime())) {
      // Try replacing space with T
      return new Date(ts.replace(" ", "T"));
    }
    return d;
  };

  function filterByTime(logs) {
    if (selectedTime === "All time") return logs;

    const now = new Date();
    return logs.filter((log) => {
      const logDate = parseDate(log.timestamp);
      if (!logDate) return false;

      switch (selectedTime) {
        case "Today":
          return logDate.toDateString() === now.toDateString();
        case "Yesterday": {
          const yest = new Date();
          yest.setDate(now.getDate() - 1);
          return logDate.toDateString() === yest.toDateString();
        }
        case "This week": {
          const firstDay = new Date(now);
          firstDay.setDate(now.getDate() - now.getDay());
          return logDate >= firstDay;
        }
        case "Last 7 days": {
          const last7 = new Date();
          last7.setDate(now.getDate() - 6);
          return logDate >= last7;
        }
        case "This month":
          return (
            logDate.getMonth() === now.getMonth() &&
            logDate.getFullYear() === now.getFullYear()
          );
        case "Last 30 days": {
          const last30 = new Date();
          last30.setDate(now.getDate() - 29);
          return logDate >= last30;
        }
        default:
          return true;
      }
    });
  }

  const Time = [
    "Today",
    "Yesterday",
    "This week",
    "Last 7 days",
    "This month",
    "Last 30 days",
    "All time",
  ];

  const handleTime = (item) => {
    setSelectedTime(item);
    setIsTime(false);
  };

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    const filteredLogs = filterByTime(logs, selectedTime);

    const getLast7DaysByPlatform = (logs) => {
      const now = dayjs();
      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = now.subtract(i, "day");
        const dayLogs = logs.filter((log) => {
          const logDate = dayjs(log.timestamp, "YYYY-MM-DD / hh:mm A");
          return logDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
        });

        const webLogs = dayLogs.filter((log) => log.platform === "web");
        const whatsappLogs = dayLogs.filter(
          (log) => log.platform === "whatsapp",
        );
        const socialLogs = dayLogs.filter(
          (log) =>
            log.platform === "instagram" ||
            log.platform === "facebook" ||
            log.platform === "x",
        );

        const totalActivity =
          webLogs.length + whatsappLogs.length + socialLogs.length;

        last7Days.push({
          day: date.format("ddd"),
          activity: totalActivity,
        });
      }

      return last7Days;
    };

    const data = getLast7DaysByPlatform(filteredLogs);
    setChartData(data);

    const recentWeb = filteredLogs
      .filter((log) => log.platform === "web")
      .sort((a, b) => {
        const dateA = dayjs(a.timestamp, "YYYY-MM-DD / hh:mm A");
        const dateB = dayjs(b.timestamp, "YYYY-MM-DD / hh:mm A");
        return dateB - dateA;
      })
      .slice(0, 2);

    const recentWhatsApp = filteredLogs
      .filter((log) => log.platform === "whatsapp")
      .sort((a, b) => {
        const dateA = dayjs(a.timestamp, "YYYY-MM-DD / hh:mm A");
        const dateB = dayjs(b.timestamp, "YYYY-MM-DD / hh:mm A");
        return dateB - dateA;
      })
      .slice(0, 1);

    const recentSocial = filteredLogs
      .filter(
        (log) =>
          log.platform === "instagram" ||
          log.platform === "facebook" ||
          log.platform === "x",
      )
      .sort((a, b) => {
        const dateA = dayjs(a.timestamp, "YYYY-MM-DD / hh:mm A");
        const dateB = dayjs(b.timestamp, "YYYY-MM-DD / hh:mm A");
        return dateB - dateA;
      })
      .slice(0, 1);

    const combinedRecent = [...recentWeb, ...recentWhatsApp, ...recentSocial];
    setRecentWebLogs(combinedRecent);
  }, [logs, selectedTime]);

  const closeTime = () => setIsTime(false);

  const [isActive, setIsActive] = useState("Visitors");

  return (
    <div className={styles.content}>
      <div className={styles.overview}>
        <span>Overview</span>

        <button className={styles.time} onClick={() => setIsTime(!isTime)}>
          <img src={time} alt='' />
          {selectedTime}
          <img src={right} alt='' />
        </button>
        {isTime && (
          <div className={styles.dropdownTime}>
            <div className={styles.overlay} onClick={closeTime}></div>
            <div className={styles.copy}>
              {Time.map((item, index) => (
                <span key={index} onClick={() => handleTime(item)}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.programmeRevenue}>
        {Programme.map((data, index) => (
          <div
            className={
              isActive === `Programme${index}` ? styles.visitors : styles.text
            }
            onClick={() => setIsActive(`Programme${index}`)}
            key={index}
          >
            <div>
              <img src={data.img} alt='' />
              <span>{data.title}</span>
            </div>

            <span>{data.amount}</span>
          </div>
        ))}
      </div>
      <Chart chartData={chartData} recentWebLogs={recentWebLogs} />
    </div>
  );
}
