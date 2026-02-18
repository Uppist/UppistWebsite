/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import Uppist from "../../../assets/uppist.png";
import dom from "../../../assets/Dashboard/dom.svg";

export default function Navbar({
  resetDashboard,
  handlechatBot,
  isActive,
  setIsActive,
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  function sideBar() {
    setIsSidebarVisible(true);
  }
  function onClose() {
    setIsSidebarVisible(false);
  }

  const location = useLocation();
  return (
    <>
      <div className={styles.logo}>
        {location.pathname !== "/login" && (
          <div className={styles.navbar}>
            <nav className={styles.nav}>
              {isActive === "log"
                ? "Website Logs"
                : isActive === "whatsapp"
                  ? "Whatsapp Logs"
                  : isActive === "social"
                    ? "Social Media Logs"
                    : isActive === "agent"
                      ? "Live Agents"
                      : isActive === "setting"
                        ? "Settings"
                        : "Dashboard"}
            </nav>

            <div className={styles.profile}>
              <svg
                width='26'
                height='29'
                viewBox='0 0 26 29'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M25.707 18.293L23 15.586V12C22.9969 9.52184 22.075 7.13285 20.4126 5.29498C18.7502 3.45712 16.4654 2.30093 14 2.05V0H12V2.05C9.53457 2.30093 7.24976 3.45712 5.58737 5.29498C3.92498 7.13285 3.0031 9.52184 3 12V15.586L0.293 18.293C0.105451 18.4805 5.66374e-05 18.7348 0 19V22C0 22.2652 0.105357 22.5196 0.292893 22.7071C0.48043 22.8946 0.734784 23 1 23H8V23.777C7.97825 25.0456 8.4254 26.2777 9.25578 27.237C10.0862 28.1964 11.2414 28.8156 12.5 28.976C13.1952 29.0449 13.8971 28.9676 14.5606 28.749C15.2241 28.5304 15.8345 28.1753 16.3525 27.7066C16.8706 27.2379 17.2848 26.666 17.5685 26.0277C17.8522 25.3893 17.9992 24.6986 18 24V23H25C25.2652 23 25.5196 22.8946 25.7071 22.7071C25.8946 22.5196 26 22.2652 26 22V19C25.9999 18.7348 25.8946 18.4805 25.707 18.293ZM16 24C16 24.7956 15.6839 25.5587 15.1213 26.1213C14.5587 26.6839 13.7956 27 13 27C12.2044 27 11.4413 26.6839 10.8787 26.1213C10.3161 25.5587 10 24.7956 10 24V23H16V24ZM24 21H2V19.414L4.707 16.707C4.89455 16.5195 4.99994 16.2652 5 16V12C5 9.87827 5.84285 7.84344 7.34315 6.34315C8.84344 4.84285 10.8783 4 13 4C15.1217 4 17.1566 4.84285 18.6569 6.34315C20.1571 7.84344 21 9.87827 21 12V16C21.0001 16.2652 21.1054 16.5195 21.293 16.707L24 19.414V21Z'
                  fill='currentColor'
                  fill-opacity='0.8'
                />
              </svg>

              <div className={styles.dropdown}>
                <img src={dom} alt='profile_picture' />
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.34521 7.27367L8.8574 13.4028C9.49915 14.0068 10.5002 14.0068 11.142 13.4028L17.6541 7.27367C17.9893 6.95824 18.0053 6.43084 17.6898 6.0957C17.3744 5.76055 16.847 5.74457 16.5119 6.06L9.99968 12.1891L3.48748 6.06C3.15234 5.74457 2.62494 5.76055 2.30951 6.09569C1.99408 6.43084 2.01006 6.95823 2.34521 7.27367Z'
                    fill='#2B2B2B'
                    fill-opacity='0.8'
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        <img src={Uppist} alt='UppistLogo' />
        {location.pathname === "/dashboard" &&
          location.pathname !== "/login" && (
            <svg
              onClick={sideBar}
              width='27'
              height='26'
              viewBox='0 0 27 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.41882 18.4188L20.5915 18.4188'
                stroke='#2B2B2B'
                strokeWidth='2.16753'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.41882 13H20.5915'
                stroke='#2B2B2B'
                strokeWidth='2.16753'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.41882 7.58118L14.0889 7.58119'
                stroke='#2B2B2B'
                strokeWidth='2.16753'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        <MobileNav
          isSidebarVisible={isSidebarVisible}
          onClose={onClose}
          resetDashboard={resetDashboard}
          handlechatBot={handlechatBot}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>
    </>
  );
}
