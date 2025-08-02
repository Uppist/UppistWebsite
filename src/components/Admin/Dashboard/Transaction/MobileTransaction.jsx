/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import time from "../../../../assets/Dashboard/time.svg";
import right from "../../../../assets/Dashboard/Icon.svg";
import csv from "../../../../assets/Dashboard/csv.svg";
import vector from "../../../../assets/Dashboard/Vector.svg";
import copy from "../../../../assets/Dashboard/copy.svg";
import delte from "../../../../assets/Dashboard/delte.svg";
import Buttons from "./Buttons";

export default function MobileTransaction({ title, logs = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [isClick, setIsClick] = useState(null);
  const [isTime, setIsTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("All Time");
  const [isMore, setIsMore] = useState(null);

  const Time = [
    "Today",
    "Yesterday",
    "This week",
    "Last 7 days",
    "This month",
    "Last 30 days",
    "All Time",
  ];

  const handleClick = (index) => setIsClick(index);
  const closeClick = () => setIsClick(false);

  const handleTime = (item) => {
    setSelectedTime(item);
    setIsTime(false);
  };
  const closeTime = () => setIsTime(false);

  const handleSeeMore = (index) => {
    setIsMore((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const filterByTime = (logs) => {
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
  };

  const filteredLogs = filterByTime(logs);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.mobiletransaction}>
      <span>{title}</span>

      <div className={styles.log}>
        <span>Transaction Log</span>
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
        {filteredLogs.length === 0 ? (
          <div className={styles.span2}>No data available</div>
        ) : (
          currentLogs.map((item, index) => {
            const dateOnly = item.timestamp?.slice(0, 10);
            const timeOnly = new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div className={styles.container} key={index}>
                <div className={styles.header}>
                  <div>
                    <label>Name:</label> <span>{item.user_name}</span>
                  </div>
                  <img src={vector} alt='' onClick={() => handleClick(index)} />
                  {/* {isClick === index && (
                    <div className={styles.dropdown} onClick={closeClick}>
                      <div
                        className={styles.overlay}
                        onClick={closeClick}
                      ></div>
                      <div className={styles.copy}>
                        <span>
                          <img src={copy} alt='' />
                          Copy
                        </span>
                        <span>
                          <img src={delte} alt='' />
                          Delete
                        </span>
                      </div>
                    </div>
                  )} */}
                </div>

                <button
                  onClick={() => handleSeeMore(index)}
                  className={isMore === index ? styles.seeLess : styles.seeMore}
                >
                  {isMore === index ? "See Less" : "See More"}
                </button>

                {isMore === index && (
                  <div className={styles.moreInfo}>
                    <div className={styles.more}>
                      <label>Email Address:</label> <span>{item.email}</span>
                    </div>
                    <div className={styles.more}>
                      <label>Prompt Query:</label> <span>{item.prompt}</span>
                    </div>
                    <div className={styles.more}>
                      <label>AI Response:</label> <span>{item.response}</span>
                    </div>
                    <div className={styles.more}>
                      <label>Date:</label> <span>{dateOnly}</span>
                    </div>
                    <div className={styles.more}>
                      <label>Time:</label> <span>{timeOnly}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <Buttons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
