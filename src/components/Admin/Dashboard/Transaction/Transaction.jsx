/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../../assets/Dashboard/time.svg";
import right from "../../../../assets/Dashboard/Icon.svg";
import csv from "../../../../assets/Dashboard/csv.svg";
import menu from "../../../../assets/Dashboard/menu.png";
import Buttons from "./Buttons";
import { useNavigate } from "react-router-dom";
import ViewMore from "./ViewMore";

export default function Transaction({
  logs = [],
  loading,
  isActive,
  view,
  setView,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTime, setIsTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("All Time");

  const [selectedLog, setSelectedLog] = useState(null);

  function toggleView(data) {
    setSelectedLog(data);
    setView(!view);
    // navigate("/view");
  }
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
  filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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

  const formatPhoneNumber = (num) => {
    if (!num) return "";

    const cleaned = num.replace(/\D/g, "");

    if (cleaned.startsWith("234")) {
      const local = cleaned.slice(3);
      return `(+234) ${local}`;
    }

    if (cleaned.startsWith("0")) {
      return `(+234) ${cleaned}`;
    }

    return num;
  };

  return (
    <>
      {view ? (
        <ViewMore
          selectedLog={selectedLog}
          onClose={() => setView(false)}
          isActive={isActive}
        />
      ) : (
        <div className={styles.transaction}>
          <div className={styles.log}>
            <div className={styles.div}>
              <button
                className={styles.time}
                onClick={() => setIsTime(!isTime)}
              >
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
              <button className={styles.csv} onClick={downloadCSV}>
                <img src={csv} alt='' />
                Download CSV
              </button>
            </div>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.logs}>
                {filteredLogs.length === 0 ? (
                  <div className={styles.span2}>No data available</div>
                ) : (
                  currentLogs.map((data, index) => (
                    <div className={styles.name} key={index}>
                      {isActive === "log" && (
                        <>
                          <div className={styles.userInfo}>
                            <span>{data.user_name}</span>
                            <img src={menu} alt='' />
                          </div>
                          <div className={styles.userInfo2}>
                            <span>{data.email}</span>
                            <span
                              className={styles.view}
                              onClick={() => toggleView(data)}
                            >
                              View{" "}
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  clip-rule='evenodd'
                                  d='M5.76711 11.8159C5.53743 11.577 5.54488 11.1972 5.78374 10.9675L8.93395 8L5.78374 5.0325C5.54488 4.80282 5.53743 4.423 5.76711 4.18413C5.99679 3.94527 6.37661 3.93782 6.61548 4.1675L10.2155 7.5675C10.3331 7.68062 10.3996 7.83679 10.3996 8C10.3996 8.16321 10.3331 8.31938 10.2155 8.4325L6.61548 11.8325C6.37661 12.0622 5.99679 12.0547 5.76711 11.8159Z'
                                  fill='currentColor'
                                  fill-opacity='0.8'
                                />
                              </svg>
                            </span>
                          </div>{" "}
                        </>
                      )}

                      {isActive === "whatsapp" && (
                        <>
                          <div className={styles.userInfo}>
                            <span>{formatPhoneNumber(data.phone_number)}</span>
                            <img src={menu} alt='' />
                          </div>
                          <div className={styles.userInfo2}>
                            <span>{data.timestamp}</span>
                            <span
                              className={styles.view}
                              onClick={() => toggleView(data)}
                            >
                              View{" "}
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  clip-rule='evenodd'
                                  d='M5.76711 11.8159C5.53743 11.577 5.54488 11.1972 5.78374 10.9675L8.93395 8L5.78374 5.0325C5.54488 4.80282 5.53743 4.423 5.76711 4.18413C5.99679 3.94527 6.37661 3.93782 6.61548 4.1675L10.2155 7.5675C10.3331 7.68062 10.3996 7.83679 10.3996 8C10.3996 8.16321 10.3331 8.31938 10.2155 8.4325L6.61548 11.8325C6.37661 12.0622 5.99679 12.0547 5.76711 11.8159Z'
                                  fill='currentColor'
                                  fill-opacity='0.8'
                                />
                              </svg>
                            </span>
                          </div>
                        </>
                      )}
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
      )}
    </>
  );
}
