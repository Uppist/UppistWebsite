/** @format */

import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Content from "./Content";
import styles from "./style.module.css";
import Transaction from "./Transaction/Transaction";
import MobileDashboard from "./MobileDashboard";
import axios from "axios";

export default function Dashboard() {
  // const [navBarText, setNavBarText] = useState("Dashboard");
  const [transactionLog, setTransactionLog] = useState(false);

  function resetDashboard() {
    // setNavBarText("Dashboard");
    setTransactionLog(false);
  }

  function handlechatBot() {
    // setNavBarText("Chatbot Logs");
    setTransactionLog(true);
  }

  /*API integration */
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("https://bot.uppist.xyz/logs");
        setLogs(response.data);
        setLoading(false);
        console.log("Logs fetched successfully:", response.data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);
  const visitors = new Set(logs.map((item) => item.email)).size;
  const validEmailCount = new Set(logs.map((item) => item.email)).size;
  const prompt_query = logs.filter((item) => item.prompt).length;
  const ai_responses = logs.filter((item) => item.response).length;

  const Programme = [
    {
      title: "Total email addresses",
      amount: validEmailCount,
    },
    {
      title: "Total prompt queries",
      amount: prompt_query,
    },
    {
      title: "Total AI responses",
      amount: ai_responses,
    },
  ];
  return (
    <>
      <div className={styles.dashboard}>
        <NavBar resetDashboard={resetDashboard} />
        <SideBar
          resetDashboard={resetDashboard}
          handlechatBot={handlechatBot}
        />
        {transactionLog ? (
          <Transaction logs={logs} loading={loading} />
        ) : (
          <Content
            // handlechatBot={handlechatBot}
            Programme={Programme}
            logs={logs}
            visitors={visitors}
          />
        )}
      </div>

      {/* /*Mobile Dashboard */}
      <div className={styles.mobileDashboard}>
        {" "}
        <MobileDashboard
          handlechatBot={handlechatBot}
          Programme={Programme}
          resetDashboard={resetDashboard}
          transactionLog={transactionLog}
          visitors={visitors}
          logs={logs}
        />
      </div>
    </>
  );
}
