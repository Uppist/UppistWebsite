/** @format */

import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import styles from "./style.module.css";
import axios from "axios";

export default function Table() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("https://bot.uppist.xyz/logs");
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = logs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={`${styles.name} ${styles.headerText}`}>
          <span className={styles.firstName}>User Name</span>
          <span>Email Address</span>
          <span>Prompt Query</span>
          <span>AI Response</span>
          <span>Date/Time</span>
        </div>

        {currentLogs.map((data, index) => (
          <div className={styles.name} key={index}>
            <span>{data.user_name}</span>
            <span>{data.email}</span>
            <span>{`"${data.prompt}"`}</span>
            <span>{`"${data.response}"`}</span>
            <span>{data.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Pass pagination props */}
      <Buttons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
