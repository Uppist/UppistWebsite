/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import time from "../../../assets/Dashboard/time.svg";
import right from "../../../assets/Dashboard/Icon.svg";
import dayjs from "dayjs";
import img1 from "../../../assets/Dashboard/Content/img1.png";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import img from "../../../assets/Dashboard/Content/img2.png";
dayjs.extend(customParseFormat);

export default function Content({ Programme, visitors, totalVisitors, logs }) {
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
          (log) => log.platform === "whatsapp"
        );

        last7Days.push({
          day: date.format("ddd"),
          web: webLogs.length,
          whatsapp: whatsappLogs.length,
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
      .slice(0, 5);

    setRecentWebLogs(recentWeb);
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
        <div
          className={isActive === "Visitors" ? styles.visitors : styles.text}
          onClick={() => setIsActive("Visitors")}
        >
          <img src={img1} alt='' />
          <span>Absolute Total Visitors</span>
          <div>
            <span>{totalVisitors}</span>
          </div>
        </div>

        {Programme.map((data, index) => (
          <div
            className={
              isActive === `Programme${index}` ? styles.visitors : styles.text
            }
            onClick={() => setIsActive(`Programme${index}`)}
            key={index}
          >
            <img src={data.img} alt='' />
            <span>{data.title}</span>
            <div>
              <span>{data.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <label htmlFor=''>Weekely Activity</label>{" "}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "10px",
            }}
          >
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={12}
              style={{ border: "none", outline: "none" }}
              barCategoryGap='25%'
              backgroundColor='white'
              borderRadius='24px'
              className={styles.bar}
            >
              <CartesianGrid
                strokeDasharray='0'
                stroke='#E0E0E0'
                vertical={false}
              />
              <XAxis
                dataKey='day'
                stroke={false}
                tick={{ fill: "#718EBF", fontSize: 13, fontWeight: 400 }}
                fontFamily='Inter'
                axisLine={false}
              />
              <Legend
                verticalAlign='top'
                align='right'
                wrapperStyle={{
                  textTransform: "capitalize",
                  borderRadius: "8px",
                  fontSize: "12px",
                  marginTop: "-17px",
                }}
              />

              <YAxis
                stroke={false}
                tick={{ fill: "#999", fontSize: 12 }}
                axisLine={false}
                fontFamily='Inter'
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  fontFamily: "Inter",
                  fontSize: "14px",
                }}
                cursor={{ fill: "rgba(136, 132, 200, 0.1)" }}
                wrapperStyle={{ cursor: "pointer" }}
              />

              <Bar
                dataKey='web'
                fill='#F89A1C'
                radius={[8, 8, 8, 8]}
                maxBarSize={50}
              />

              <Bar
                dataKey='whatsapp'
                fill='#16DBCC'
                radius={[8, 8, 8, 8]}
                maxBarSize={50}
              />
            </BarChart>
          </div>
          {/* </ResponsiveContainer> */}
        </div>

        <div className={styles.recentVisitors}>
          <label>Recent Website Visitors</label>
          {recentWebLogs.length === 0 ? (
            <p>No recent website visitors</p>
          ) : (
            <div className={styles.recentWebsite}>
              {recentWebLogs.map((log, index) => (
                <div key={index} className={styles.visitorItem}>
                  <img src={img} alt='' />
                  <div>
                    <span>{log.user_name || "Unknown User"}</span>
                    <p>
                      {dayjs(log.timestamp, "YYYY-MM-DD / hh:mm A").format(
                        "DD MMMM, YYYY"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
