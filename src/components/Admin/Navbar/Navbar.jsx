/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import Uppist from "../../../assets/uppist.png";

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
