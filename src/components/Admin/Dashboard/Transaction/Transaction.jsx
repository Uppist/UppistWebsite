/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../../assets/Dashboard/time.svg";
import right from "../../../../assets/Dashboard/Icon.svg";
import csv from "../../../../assets/Dashboard/csv.svg";
import vector from "../../../../assets/Dashboard/Vector.svg";
import copy from "../../../../assets/Dashboard/copy.svg";
import delte from "../../../../assets/Dashboard/delte.svg";
import Buttons from "./Buttons";

export default function Transaction({ logs = [], loading, isActive, setIsActive }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isClick, setIsClick] = useState(null);
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

  // Reset to page 1 when logs or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [logs, selectedTime]);

  const handleClick = (index) => setIsClick(index);
  const closeClick = () => setIsClick(null);

  const handleTime = (item) => {
    setSelectedTime(item);
    setIsTime(false);
  };

  const closeTime = () => setIsTime(false);

  const downloadCSV = () => {
    const csvContent =
      "Name,Email,Prompt,Response,Date\n" +
      logs
        .map(
          (data) =>
            `"${data.user_name}","${data.email}","${data.prompt}","${data.response}","${data.timestamp}"`
        )
        .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Logs.csv";
    link.click();
  };

  console.log(isActive);

  function filterByTime(logs) {
    const now = new Date();
    return logs.filter((log) => {
      const logDate = new Date(log.timestamp);
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

  const filteredLogs = filterByTime(logs);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  console.log(currentLogs);
  return (
    <div className={styles.transaction}>
      <div className={styles.log}>
        <span>Chatbot Logs</span>
        <div className={styles.div}>
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
          <button className={styles.csv} onClick={downloadCSV}>
            <img src={csv} alt='' />
            Download CSV
          </button>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={`${styles.name} ${styles.headerText}`}>
            {isActive === 'log' && <span className={styles.firstName}>User Name</span>}
            {isActive === 'log' && <span>Email Address</span>}
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
                <> 
                  {isActive === 'whatsapp' && data.platform === 'whatsapp' ? (
                    <div className={styles.name} key={index}>
                  <span className={styles.prompt}>{data.prompt}</span>
                  <span className={styles.response}>{data.response}</span>
                  <span>{new Date(data.timestamp).toLocaleString()}</span>
                  <img
                    src={vector}
                    alt='options'
                    onClick={() => handleClick(index)}
                  />
                </div>
                  ) : (
                    <div className={styles.name} key={index}>
                  <span>{data.user_name}</span>
                  <span>{data.email}</span>
                  <span className={styles.prompt}>{data.prompt}</span>
                  <span className={styles.response}>{data.response}</span>
                  <span>{new Date(data.timestamp).toLocaleString()}</span>
                  <img
                    src={vector}
                    alt='options'
                    onClick={() => handleClick(index)}
                  />
                </div>
                  ) }
                </>
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
