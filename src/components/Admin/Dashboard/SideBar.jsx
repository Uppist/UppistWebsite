/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
// import Uppist from "../../../assets/uppist.png";
import Uppist2 from "../../../assets/uppist3.png";

export default function SideBar({
  resetDashboard,
  handlechatBot,
  isActive,
  setIsActive,
  onClose,
}) {
  // const [isActive, setIsActive] = useState(null);
  // console.log(isActive);
  // console.log(setIsActive);
  return (
    <div className={styles.sidebar}>
      <img src={Uppist2} alt='UppistLogo' />

      <div className={styles.div}>
        <span>Manage</span>
        <div
          className={
            isActive === "dashboard" ? styles.active : styles.notactive
          }
          onClick={() => setIsActive("dashboard")}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z'
              fill='currentColor'
            />
            <path
              d='M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z'
              fill='currentColor'
            />
            <path
              d='M18.6699 13.4302H16.7699C14.5899 13.4302 13.4399 14.5802 13.4399 16.7602V18.6602C13.4399 20.8402 14.5899 21.9902 16.7699 21.9902H18.6699C20.8499 21.9902 21.9999 20.8402 21.9999 18.6602V16.7602C21.9999 14.5802 20.8499 13.4302 18.6699 13.4302Z'
              fill='currentColor'
            />
            <path
              d='M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z'
              fill='currentColor'
            />
          </svg>

          <span onClick={resetDashboard}>Dashboard</span>
        </div>

        <div
          className={isActive === "log" ? styles.active : styles.notactive}
          onClick={() => {
            setIsActive("log");
            onClose;
          }}
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='10.75'
              cy='10.75'
              r='10'
              stroke='currentColor'
              stroke-width='1.5'
            />
            <ellipse
              cx='10.75'
              cy='10.75'
              rx='4'
              ry='10'
              stroke='currentColor'
              stroke-width='1.5'
            />
            <path
              d='M0.75 10.75H20.75'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>

          <span onClick={handlechatBot}>Website Logs</span>
        </div>

        {/* Whatsapp Chatbot Log */}
        <div
          className={isActive === "whatsapp" ? styles.active : styles.notactive}
          onClick={() => {
            setIsActive("whatsapp");
            onClose;
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linejoin='round'
            />
            <path
              d='M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118'
              stroke='currentColor'
              stroke-width='1.5'
            />
          </svg>

          <span onClick={handlechatBot}>WhatsApp Log</span>
        </div>
        <div
          className={isActive === "logout" ? styles.active : styles.notactive}
          onClick={() => setIsActive("logout")}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.9871 10.2401 20.8194 9.05112 20.484C6.18961 19.6769 3.70555 18.3204 3.10956 15.2816C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27704 3.10956 8.71845C3.70555 5.67963 6.18961 4.32314 9.05112 3.516C10.2401 3.18062 10.8346 3.01293 11.3156 3.00116C13.3831 2.95058 14.9264 4.52305 15 6.37499'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
            />
            <path
              d='M10 12H21M10 12C10 11.2998 11.9943 9.99153 12.5 9.5M10 12C10 12.7002 11.9943 14.0085 12.5 14.5'
              stroke='currentColor'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>

          <span>
            <Link to='/login'>Log Out</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
