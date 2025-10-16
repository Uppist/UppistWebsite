/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
// import Uppist from "../../../assets/uppist.png";
import Uppist2 from "../../../assets/uppist2.png";

export default function SideBar({ resetDashboard, handlechatBot, isActive, setIsActive }) {
  // const [isActive, setIsActive] = useState(null);
  // console.log(isActive);
  // console.log(setIsActive);
  return (
    <div className={styles.sidebar}>
      <img src={Uppist2} alt="UppistLogo" />

      <div className={styles.div}>
        <div
          className={
            isActive === "dashboard" ? styles.active : styles.notactive
          }
          onClick={() => setIsActive("dashboard")}
        >
          <svg
            width='20'
            height='18'
            viewBox='0 0 20 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M11.9137 0.987525C10.766 0.184112 9.23837 0.184109 8.09063 0.987524L2.35932 4.99944C1.39381 5.6753 0.856954 6.81078 0.947345 7.98587L1.53486 15.6236C1.64567 17.064 2.95084 18.111 4.38105 17.9067L7.0224 17.5294C8.25402 17.3534 9.16884 16.2986 9.16884 15.0545V14C9.16884 13.5398 9.54194 13.1667 10.0022 13.1667C10.4624 13.1667 10.8355 13.5398 10.8355 14V15.0545C10.8355 16.2986 11.7503 17.3534 12.982 17.5294L15.6233 17.9067C17.0535 18.111 18.3587 17.064 18.4695 15.6236L19.057 7.98587C19.1474 6.81078 18.6105 5.67531 17.645 4.99944L11.9137 0.987525ZM9.0464 2.35291C9.62027 1.9512 10.3841 1.9512 10.9579 2.35291L16.6893 6.36483C17.172 6.70276 17.4404 7.2705 17.3952 7.85805L16.8077 15.4957C16.7708 15.9759 16.3357 16.3249 15.859 16.2568L13.2177 15.8795C12.8071 15.8208 12.5022 15.4692 12.5022 15.0545V14C12.5022 12.6193 11.3829 11.5 10.0022 11.5C8.62146 11.5 7.50218 12.6193 7.50218 14V15.0545C7.50218 15.4692 7.19723 15.8208 6.7867 15.8795L4.14535 16.2568C3.66861 16.3249 3.23355 15.9759 3.19662 15.4957L2.6091 7.85804C2.56391 7.2705 2.83233 6.70276 3.31509 6.36483L9.0464 2.35291Z'
              fill='currentColor'
            />
          </svg>{" "}
          <span onClick={resetDashboard}>Dashboard</span>
        </div>

        <div
          className={isActive === "log" ? styles.active : styles.notactive}
          onClick={() => setIsActive("log")}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.66667 5.00016L17.5 5.00081M6.66667 10.0002L17.5 10.0008M6.66667 15.0002L17.5 15.0007M2.5 5.41683H3.33333V4.5835H2.5V5.41683ZM2.5 10.4168H3.33333V9.5835H2.5V10.4168ZM2.5 15.4168H3.33333V14.5835H2.5V15.4168Z'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <span onClick={handlechatBot}>Chatbot Logs</span>
        </div>

        {/* Whatsapp Chatbot Log */}
        <div
          className={isActive === "whatsapp" ? styles.active : styles.notactive}
          onClick={() => setIsActive("whatsapp")}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.66667 5.00016L17.5 5.00081M6.66667 10.0002L17.5 10.0008M6.66667 15.0002L17.5 15.0007M2.5 5.41683H3.33333V4.5835H2.5V5.41683ZM2.5 10.4168H3.33333V9.5835H2.5V10.4168ZM2.5 15.4168H3.33333V14.5835H2.5V15.4168Z'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <span onClick={handlechatBot}>WhatsApp Logs</span>
        </div>
        
        <hr />
        <div
          className={isActive === "logout" ? styles.active : styles.notactive}
          onClick={() => setIsActive("logout")}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.3346 10.8333V9.16667H5.83464V6.66667L1.66797 10L5.83464 13.3333V10.8333H13.3346Z'
              fill='currentColor'
            />
            <path
              d='M16.6667 2.5H9.16667C8.2475 2.5 7.5 3.2475 7.5 4.16667V7.5H9.16667V4.16667H16.6667V15.8333H9.16667V12.5H7.5V15.8333C7.5 16.7525 8.2475 17.5 9.16667 17.5H16.6667C17.5858 17.5 18.3333 16.7525 18.3333 15.8333V4.16667C18.3333 3.2475 17.5858 2.5 16.6667 2.5Z'
              fill='currentColor'
            />
          </svg>{" "}
          <span>
            <Link to='/login'>Log Out</Link>
          </span>
        </div>
      </div>
    </div>
  );
}