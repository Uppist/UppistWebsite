/** @format */

import React from "react";
import styles from "./style.module.css";
import dayjs from "dayjs";
import img from "../../../assets/Dashboard/Content/web.png";
import ig from "../../../assets/Dashboard/Content/ig.png";
import whatsapp from "../../../assets/Dashboard/Content/whatsapp.png";

import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

dayjs.extend(customParseFormat);

export default function Chart({ chartData, recentWebLogs }) {
  console.log(recentWebLogs);
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
    <div className={styles.chartSection}>
      <div className={styles.chartHeader}>
        <label htmlFor=''>Interaction Trends</label>{" "}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            // padding: "10px",
          }}
        >
          <ResponsiveContainer width='100%' height='100%'>
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
              {/* <Legend
                verticalAlign='top'
                align='right'
                wrapperStyle={{
                  textTransform: "capitalize",
                  borderRadius: "8px",
                  fontSize: "12px",
                  marginTop: "-17px",
                }} */}
              {/* /> */}

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
                dataKey='activity'
                fill='#F89A1C'
                radius={[8, 8, 8, 8]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* </ResponsiveContainer> */}
      </div>

      <div className={styles.recentVisitors}>
        <label>Recent Activity Log</label>
        {recentWebLogs.length === 0 ? (
          <p>No recent activity log</p>
        ) : (
          <div className={styles.recentWebsite}>
            {recentWebLogs.map((log, index) => (
              <div key={index} className={styles.visitorItem}>
                {log.platform === "web" && <img src={img} alt='' />}
                {log.platform === "whatsapp" && <img src={whatsapp} alt='' />}
                {log.platform === "instagram" && <img src={ig} alt='' />}
                <div>
                  <span>
                    {log.user_name ||
                      formatPhoneNumber(log.phone_number) ||
                      log.username ||
                      "Unknown User"}
                  </span>
                  <p>
                    {dayjs(log.timestamp, "YYYY-MM-DD / hh:mm A").format(
                      "DD MMMM, YYYY",
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
