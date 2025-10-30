/** @format */

import React from "react";
import styles from "./style.module.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
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
              <h2>{selectedLog.user_name}</h2>
            </div>

            <div className={styles.more}>
              <span>Email Address:</span>
              <h2>{selectedLog.email}</h2>
            </div>
          </div>
        )}
        {isActive === "whatsapp" && (
          <div className={styles.viewmore}>
            <div className={styles.more}>
              <span>Phone Number:</span>
              <h2>{formatPhoneNumber(selectedLog.phone_number)}</h2>
            </div>
          </div>
        )}
        <hr />
        <div className={styles.container3}>
          <div>
            <span>Prompt Query</span>
            <p>{selectedLog.prompt}</p>
          </div>
          <div>
            {" "}
            <span>AI Response</span>
            <p>{selectedLog.response}</p>
          </div>
          <span>
            {selectedLog.timestamp}
            <svg
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(selectedLog.timestamp);
                toast.success("copied");
              }}
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.2753 6.66667L11.667 2.05833C11.5499 1.94109 11.391 1.87515 11.2253 1.875H9.16699C8.55924 1.875 7.97631 2.11644 7.54654 2.54622C7.11677 2.97598 6.87533 3.55887 6.87533 4.16667V5.20833H5.83366C5.22587 5.20833 4.64298 5.44977 4.21321 5.87955C3.78343 6.30932 3.54199 6.89221 3.54199 7.5V15.8333C3.54199 16.4411 3.78343 17.024 4.21321 17.4537C4.64298 17.8836 5.22587 18.125 5.83366 18.125H11.667C12.2747 18.125 12.8577 17.8836 13.2874 17.4537C13.7172 17.024 13.9587 16.4411 13.9587 15.8333V14.7917H14.167C14.7747 14.7917 15.3577 14.5503 15.7874 14.1204C16.2172 13.6907 16.4587 13.1077 16.4587 12.5V7.08333C16.4521 6.92633 16.3867 6.77758 16.2753 6.66667ZM11.8753 4.00833L14.3253 6.45833H11.8753V4.00833ZM12.7087 15.8333C12.7087 16.1096 12.5989 16.3746 12.4036 16.5699C12.2082 16.7652 11.9432 16.875 11.667 16.875H5.83366C5.55739 16.875 5.29244 16.7652 5.09709 16.5699C4.90174 16.3746 4.79199 16.1096 4.79199 15.8333V7.5C4.79199 7.22373 4.90174 6.95878 5.09709 6.76343C5.29244 6.56808 5.55739 6.45833 5.83366 6.45833H6.87533V12.5C6.87533 13.1077 7.11677 13.6907 7.54654 14.1204C7.97631 14.5503 8.55924 14.7917 9.16699 14.7917H12.7087V15.8333ZM14.167 13.5417H9.16699C8.89074 13.5417 8.62574 13.4319 8.43041 13.2366C8.23508 13.0412 8.12533 12.7762 8.12533 12.5V4.16667C8.12533 3.8904 8.23508 3.62545 8.43041 3.4301C8.62574 3.23475 8.89074 3.125 9.16699 3.125H10.6253V7.08333C10.6275 7.24843 10.694 7.40614 10.8107 7.52289C10.9275 7.63963 11.0852 7.70617 11.2503 7.70833H15.2087V12.5C15.2087 12.7762 15.0989 13.0412 14.9036 13.2366C14.7082 13.4319 14.4432 13.5417 14.167 13.5417Z'
                fill='#2B2B2B'
                fill-opacity='0.8'
              />
            </svg>
            <span
              onClick={() => {
                navigator.clipboard.writeText(selectedLog.timestamp);
                toast.success("copied");
              }}
              style={{ cursor: "pointer" }}
            >
              Copy
            </span>
          </span>
        </div>
      </div>
      <ToastContainer className={styles.toasify} />
    </div>
  );
}
