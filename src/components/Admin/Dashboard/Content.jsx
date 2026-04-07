/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../assets/Dashboard/time.svg";
import right from "../../../assets/Dashboard/Icon.svg";
import Chart from "./Chart";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";

export default function Content() {
  const { Programme, logs } = useOutletContext();
  const [selectedTime, setSelectedTime] = useState("All time");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platform");
  const [isPlatform, setIsPlatform] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [recentWebLogs, setRecentWebLogs] = useState([]);
  const closeTime = () => setIsTime(false);
  const closePlatform = () => setIsPlatform(false);
  const mobileView = useIsMobile();

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

  // function filterByPlatform(logs) {
  //   if (selectedPlatform === "All Platform") return logs;
  //   const platformKey = selectedPlatform.toLowerCase();
  //   return logs.filter((log) => log.platform === platformKey);
  // }

  const Time = [
    "Today",
    "Yesterday",
    "This week",
    "Last 7 days",
    "This month",
    "Last 30 days",
    "All time",
  ];

  const Platform = [
    "Website",
    "Whatsapp",
    "Facebook",
    "Instagram",
    "X",
    "All Platform",
  ];

  function handleTime(item) {
    setSelectedTime(item);
    setIsTime(false);
  }

  function handlePlatform(item) {
    setSelectedPlatform(item);
    setIsPlatform(false);
  }

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

  return (
    <div className={styles.content}>
      <div className={styles.overview}>
        <span>{mobileView ? "Dashboard" : "Overview"}</span>

        <div style={{ display: "flex", alignItems: "center", gap: "19px" }}>
          <button
            className={styles.time}
            onClick={() => setIsPlatform(!isPlatform)}
          >
            {selectedPlatform}
            <img src={right} alt='' style={{ width: "15px" }} />
          </button>

          {isPlatform && (
            <div className={styles.dropdownTime}>
              <div className={styles.overlay} onClick={closePlatform}></div>
              <div className={styles.copy2}>
                {Platform.map((item, index) => (
                  <span key={index} onClick={() => handlePlatform(item)}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button className={styles.time} onClick={() => setIsTime(!isTime)}>
            <img src={time} alt='' style={{ width: "15px" }} />
            {selectedTime}
            <img src={right} alt='' style={{ width: "15px" }} />
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
      </div>

      <div className={styles.programmeRevenue}>
        {Programme.map((data, index) => (
          <div className={styles.text} key={index}>
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
