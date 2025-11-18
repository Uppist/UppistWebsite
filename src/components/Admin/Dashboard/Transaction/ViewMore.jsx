/** @format */

import React from "react";
import styles from "./style.module.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export default function ViewMore({ selectedLog, onClose, isActive }) {
  if (!selectedLog) return null;

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

  console.log("Selected Log:", selectedLog);
  return (
    <div className={styles.transaction}>
      <div className={styles.back2} onClick={onClose}>
        <svg
          width='24'
          height='24'
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

        <span>Back</span>
      </div>

      <div className={styles.container2}>
        {isActive == "log" && (
          <div className={styles.viewmore}>
            <div className={styles.more}>
              <span>Name:</span>
              <h2>{selectedLog[0].user_name}</h2>
            </div>

            <div className={styles.more}>
              <span>Email Address:</span>
              <h2>{selectedLog[0].email}</h2>
            </div>
          </div>
        )}
        {isActive === "whatsapp" && (
          <div className={styles.viewmore}>
            <div className={styles.more}>
              <span>Phone Number:</span>
              <h2>{formatPhoneNumber(selectedLog[0].phone_number)}</h2>
            </div>
          </div>
        )}
        <hr />{" "}
        <ol>
          {selectedLog.map((data, index) => (
            <li
              key={index}
              style={{
                fontFamily: "Inter",
                color: "hsla(0, 0%, 17%, 0.8)",
                padding: "0px",
              }}
            >
              <div className={styles.container3}>
                <div>
                  <span>Prompt Query</span>
                  <p>{data.prompt}</p>
                </div>
                <div>
                  {" "}
                  <span>AI Response</span>
                  <p>{data.response}</p>
                </div>
                <span>
                  {data.timestamp}
                  <ContentCopyIcon
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `User_prompt:${data.prompt}, AI_response: ${data.response}, date:${data.timestamp}`
                      );
                      toast.success("copied");
                    }}
                    sx={{
                      width: 20,
                      height: 20,
                      fill: "#2B2B2B",
                      fillOpacity: "0.8",
                    }}
                  />

                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `User_prompt:${data.prompt}, AI_response: ${data.response}, date:${data.timestamp}`
                      );
                      toast.success("copied");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Copy
                  </span>
                </span>
              </div>
            </li>
          ))}{" "}
        </ol>
      </div>
      <ToastContainer className={styles.toasify} />
    </div>
  );
}
