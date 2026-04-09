/** @format */

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "./SideBar";
import Content from "./Content";
import axios from "axios";
import img1 from "../../../assets/Dashboard/Content/img1.png";
// import img4 from "../../../assets/Dashboard/Content/img4.png";
import img7 from "../../../assets/Dashboard/Content/img7.png";
import img8 from "../../../assets/Dashboard/Content/img8.png";
import ChatLogs from "./Transaction/ChatLogs";
import Loader from "../Loader";
import styles from "./style.module.css";
import Settings from "./Transaction/Settings/Settings";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Agent from "./Transaction/LiveAgent/Agent";
import { UserDataContext } from "../UserDataContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    if (userData && userData.user?.role === null) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);

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
  const [pageLoading, setPageLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setPageLoading(true);

    const t = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => clearTimeout(t);
  }, [location.pathname]);

  const visitors = new Set(logs.map((item) => item.email)).size;
  const validEmailCount = new Set(logs.map((item) => item.email));
  const websiteVisitors = new Set(
    logs.filter((item) => item.platform === "web").map((item) => item.email),
  ).size;
  const whatsappVisitors = new Set(
    logs
      .filter((item) => item.platform === "whatsapp")
      .map((item) => item.phone_number),
  ).size;

  const socialMediaVisitors = new Set(
    logs
      .filter(
        (item) =>
          item.platform === "instagram" ||
          item.platform === "facebook" ||
          item.platform === "x",
      )
      .map((item) => item.sender_id),
  ).size;

  // const total_web_prompt_query = logs.filter(
  //   (item) => item.platform === "web" && item.prompt,
  // ).length;

  // const total_whatsapp_prompt_query = logs.filter(
  //   (item) => item.platform === "whatsapp" && item.prompt,
  // ).length;

  // const total_social_media_prompt_query = logs.filter(
  //   (item) =>
  //     (item.platform === "instagram" ||
  //       item.platform === "facebook" ||
  //       item.platform === "x") &&
  //     item.prompt,
  // ).length;

  const total_web_ai_responses = logs.filter(
    (item) => item.platform === "web" && item.response,
  ).length;

  const total_whatsapp_ai_responses = logs.filter(
    (item) => item.platform === "whatsapp" && item.response,
  ).length;

  const total_social_media_ai_responses = logs.filter(
    (item) =>
      (item.platform === "instagram" ||
        item.platform === "facebook" ||
        item.platform === "x") &&
      item.response,
  ).length;

  const totalVisitors =
    websiteVisitors + whatsappVisitors + socialMediaVisitors;
  const total_ai_responses =
    total_web_ai_responses +
    total_whatsapp_ai_responses +
    total_social_media_ai_responses;
  // const total_prompt_query =
  //   total_web_prompt_query +
  //   total_whatsapp_prompt_query +
  //   total_social_media_prompt_query;

  /* --- Programme Data --- */
  const Programme = [
    {
      img: img1,
      title: "Total Visitors",
      amount: totalVisitors,
    },

    // {
    //   img: img4,

    //   title: "Total Prompt Queries",
    //   amount: total_prompt_query,
    // },

    {
      img: img7,

      title: "Total AI Interactions",
      amount: total_ai_responses,
    },
    {
      img: img8,

      title: "Total Live Agent Responses",
      amount: visitors,
    },
  ];

  const mobileView = window.innerWidth <= 768;

  return (
    <div>
      {pageLoading ? (
        <Loader />
      ) : (
        <>
          <SideBar userData={userData} />
          <div className={styles.dash}>
            <Navbar />

            <div
              style={
                mobileView
                  ? {
                      backgroundColor: "hsla(0, 0%, 96%, 1)",
                    }
                  : {
                      position: "absolute",
                      width: "-webkit-fill-available",
                      top: "65px",
                      backgroundColor: "hsla(0, 0%, 96%, 1)",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                      fontFamily: "Inter",
                    }
              }
            >
              <Outlet
                context={{
                  Programme,
                  logs,
                  visitors,
                  totalVisitors,
                  loading,
                  pageLoading,
                  view,
                  setView,
                  validEmailCount,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
