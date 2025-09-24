/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../../assets/Dashboard/time.svg";
import right from "../../../../assets/Dashboard/Icon.svg";
import csv from "../../../../assets/Dashboard/csv.svg";
import vector from "../../../../assets/Dashboard/Vector.svg";
import Buttons from "./Buttons";

export default function Transaction({ logs = [], loading, isActive }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTime, setIsTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("All Time");

  const itemsPerPage = 15;

  const Time = [
    "Today",
    "Yesterday",
    "This week",
    "Last 7 days",
    "This month",
    "Last 30 days",
    "All Time",
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [logs, selectedTime, isActive]);

  const handleTime = (item) => {
    setSelectedTime(item);
    setIsTime(false);
  };

  const closeTime = () => setIsTime(false);

  // Normalized date parser
  const parseDate = (ts) => {
    if (!ts) return null;
    const d = new Date(ts);
    if (isNaN(d.getTime())) {
      // Try replacing space with T
      return new Date(ts.replace(" ", "T"));
    }
    return d;
  };

  // Filtering logic
  function filterByTime(logs) {
    if (selectedTime === "All Time") return logs;

    const now = new Date();
    return logs.filter((log) => {
      const logDate = parseDate(log.timestamp);
      if (!logDate) return false;

      switch (selectedTime) {
        case "Today":
          return logDate.toDateString() === now.toDateString();
        case "Yesterday":
          const yest = new Date();
          yest.setDate(now.getDate() - 1);
          return logDate.toDateString() === yest.toDateString();
        case "This week":
          const firstDay = new Date(now);
          firstDay.setDate(now.getDate() - now.getDay());
          return logDate >= firstDay;
        case "Last 7 days":
          const last7 = new Date();
          last7.setDate(now.getDate() - 6);
          return logDate >= last7;
        case "This month":
          return (
            logDate.getMonth() === now.getMonth() &&
            logDate.getFullYear() === now.getFullYear()
          );
        case "Last 30 days":
          const last30 = new Date();
          last30.setDate(now.getDate() - 29);
          return logDate >= last30;
        default:
          return true;
      }
    });
  }

  // Filter platform + time
  let filteredLogs = filterByTime(logs);

  if (isActive === "whatsapp") {
    filteredLogs = filteredLogs.filter((l) => l.platform === "whatsapp");
  } else if (isActive === "log") {
    filteredLogs = filteredLogs.filter((l) => l.platform === "web");
  }

  // Sort newest → oldest
  filteredLogs.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  // CSV Export
  const downloadCSV = () => {
    const isWhatsApp = isActive === "whatsapp";

    const headers = isWhatsApp
      ? ["Phone Number", "Prompt", "Response", "Date/Time"]
      : ["User Name", "Email", "Prompt", "Response", "Date/Time"];

    const rows = filteredLogs.map((data) =>
      isWhatsApp
        ? [
            data.phone_number || "N/A",
            data.prompt,
            data.response,
            data.timestamp,
          ]
        : [
            data.user_name,
            data.email,
            data.prompt,
            data.response,
            data.timestamp,
          ]
    );

    const csvContent =
      headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = isWhatsApp ? "WhatsApp_Logs.csv" : "Chatbot_Logs.csv";
    link.click();
  };

  return (
    <div className={styles.transaction}>
      <div className={styles.log}>
        <span>{isActive === "whatsapp" ? "WhatsApp Logs" : "Chatbot Logs"}</span>
        <div className={styles.div}>
          <button className={styles.time} onClick={() => setIsTime(!isTime)}>
            <img src={time} alt="" />
            {selectedTime}
            <img src={right} alt="" />
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
          <button className={styles.csv} onClick={downloadCSV}>
            <img src={csv} alt="" />
            Download CSV
          </button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={`${styles.name} ${styles.headerText}`}>
            {isActive === "log" && <span className={styles.firstName}>User Name</span>}
            {isActive === "log" && <span>Email Address</span>}
            {isActive === "whatsapp" && <span>Phone Number</span>}
            <span>Prompt Query</span>
            <span>AI Response</span>
            <span>Date/Time</span>
            <span className={styles.svg}>Options</span>
          </div>

          <div className={styles.logs}>
            {filteredLogs.length === 0 ? (
              <div className={styles.span2}>No data available</div>
            ) : (
              currentLogs.map((data, index) => (
                <div className={styles.name} key={index}>
                  {isActive === "log" && (
                    <>
                      <span>{data.user_name}</span>
                      <span>{data.email}</span>
                    </>
                  )}
                  {isActive === "whatsapp" && (
                    <span>{data.phone_number || "N/A"}</span>
                  )}
                  <span className={styles.prompt}>{data.prompt}</span>
                  <span className={styles.response}>{data.response}</span>
                  <span>
                    {data.timestamp
                      ? new Date(data.timestamp).toLocaleString()
                      : ""}
                  </span>
                  <img
                    src={vector}
                    alt="options"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <Buttons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
