/** @format */

import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Content from "./Content";
import styles from "./style.module.css";
import Transaction from "./Transaction/Transaction";
import MobileDashboard from "./MobileDashboard";
import axios from "axios";

import img2 from "../../../assets/Dashboard/Content/img2.png";
import img3 from "../../../assets/Dashboard/Content/img3.png";
import img4 from "../../../assets/Dashboard/Content/img4.png";
import img5 from "../../../assets/Dashboard/Content/img5.png";
import img6 from "../../../assets/Dashboard/Content/img6.png";
import img7 from "../../../assets/Dashboard/Content/img7.png";
import img8 from "../../../assets/Dashboard/Content/img8.png";

export default function Dashboard() {
  const [transactionLog, setTransactionLog] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);

  function resetDashboard() {
    setTransactionLog(false);
  }

  function handlechatBot() {
    setTransactionLog(true);
  }

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
  const whatsappVisitors = new Set(
    logs
      .filter((item) => item.platform === "whatsapp")
      .map((item) => item.phone_number)
  ).size;

  const total_web_prompt_query = logs.filter(
    (item) => item.platform === "web" && item.prompt
  ).length;

  const total_whatsapp_prompt_query = logs.filter(
    (item) => item.platform === "whatsapp" && item.prompt
  ).length;

  const total_web_ai_responses = logs.filter(
    (item) => item.platform === "web" && item.response
  ).length;

  const total_whatsapp_ai_responses = logs.filter(
    (item) => item.platform === "whatsapp" && item.response
  ).length;

  const totalVisitors = validEmailCount + whatsappVisitors;

  /* --- Programme Data --- */
  const Programme = [
    {
      img: img2,
      title: "Total Website Visitors",
      amount: validEmailCount,
    },
    {
      img: img3,

      title: "Total WhatsApp Visitors",
      amount: whatsappVisitors,
    },
    {
      img: img4,

      title: "Total WhatsApp Prompt Queries",
      amount: total_whatsapp_prompt_query,
    },
    {
      img: img5,

      title: "Total WhatsApp AI Responses",
      amount: total_whatsapp_ai_responses,
    },
    {
      img: img6,

      title: "Total Website Prompt Queries",
      amount: total_web_prompt_query,
    },
    {
      img: img7,

      title: "Total Website AI Responses",
      amount: total_web_ai_responses,
    },
    {
      img: img8,

      title: "Total Website Email Addresses",
      amount: validEmailCount,
    },
  ];

  return (
    <>
      <div className={styles.dashboard}>
        <NavBar resetDashboard={resetDashboard} isActive={isActive} />
        <SideBar
          setIsActive={setIsActive}
          isActive={isActive}
          resetDashboard={resetDashboard}
          onClose={() => setView(false)}
          handlechatBot={handlechatBot}
        />

        {transactionLog ? (
          <Transaction
            logs={logs}
            loading={loading}
            view={view}
            setView={setView}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        ) : (
          <Content
            Programme={Programme}
            logs={logs}
            visitors={visitors}
            totalVisitors={totalVisitors}
          />
        )}
      </div>

      {/* Mobile Dashboard */}
      <div className={styles.mobileDashboard}>
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
