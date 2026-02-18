/** @format */

import React, { useEffect, useState } from "react";
import time from "../../../../../assets/Dashboard/time.svg";
import right from "../../../../../assets/Dashboard/Icon.svg";
import styles from "./style.module.css";
import AddUser from "./AddUser/AddUser";
import MobileSettings from "./MobileSettings";
import UserDetails from "./UserDetails";
import EditProfile from "./EditProfile/EditProfile";

export default function Settings() {
  const [isTime, setIsTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("All time");
  const [menu, setMenu] = useState(false);
  const [addUser, setAddUser] = useState(false);

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

  function handleClick() {
    setMenu((prev) => !prev);
    // alert("hello");
  }

  function handleButton() {
    setAddUser((prev) => !prev);
  }

  //clicking outside to close menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(`.${styles.list}`) &&
        !event.target.closest(`.${styles.svg2}`)
      ) {
        setMenu(false);
        setIsTime(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileView = window.innerWidth <= 768;

  const [active, setActive] = React.useState("profile");

  return (
    <div className={styles.settings}>
      {mobileView && <span>Settings</span>}

      <div className={styles.div}>
        <div className={styles.profile}>
          <span
            className={active === "profile" ? styles.active : styles.span}
            onClick={() => setActive("profile")}
          >
            Profile
          </span>
          <span
            className={active === "users" ? styles.active : styles.span}
            onClick={() => setActive("users")}
          >
            Users
          </span>
        </div>

        {active === "users" && (
          <div className={styles.button}>
            <button className={styles.time} onClick={() => setIsTime(!isTime)}>
              <img src={time} alt='' />
              {selectedTime}
              <img src={right} alt='' />
            </button>
            {isTime && (
              <div className={styles.dropdownTime}>
                <div
                  className={styles.overlay}
                  onClick={() => setIsTime(!isTime)}
                ></div>
                <div className={styles.copy}>
                  {Time.map((item, index) => (
                    <span key={index} onClick={() => handleTime(item)}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button className={styles.csv} onClick={handleButton}>
              {" "}
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.8337 7.50033C10.8337 7.04009 10.4606 6.66699 10.0003 6.66699C9.54009 6.66699 9.16699 7.04009 9.16699 7.50033V9.16699H7.50033C7.04009 9.16699 6.66699 9.54009 6.66699 10.0003C6.66699 10.4606 7.04009 10.8337 7.50033 10.8337H9.16699V12.5003C9.16699 12.9606 9.54009 13.3337 10.0003 13.3337C10.4606 13.3337 10.8337 12.9606 10.8337 12.5003V10.8337H12.5003C12.9606 10.8337 13.3337 10.4606 13.3337 10.0003C13.3337 9.54009 12.9606 9.16699 12.5003 9.16699H10.8337V7.50033Z'
                  fill='white'
                />
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M10.0003 1.66699C5.39795 1.66699 1.66699 5.39795 1.66699 10.0003C1.66699 14.6027 5.39795 18.3337 10.0003 18.3337C14.6027 18.3337 18.3337 14.6027 18.3337 10.0003C18.3337 5.39795 14.6027 1.66699 10.0003 1.66699ZM3.33366 10.0003C3.33366 6.31843 6.31843 3.33366 10.0003 3.33366C13.6822 3.33366 16.667 6.31843 16.667 10.0003C16.667 13.6822 13.6822 16.667 10.0003 16.667C6.31843 16.667 3.33366 13.6822 3.33366 10.0003Z'
                  fill='white'
                />
              </svg>
              Add {!mobileView && "New"} User
            </button>
            {addUser && <AddUser onClose={() => setAddUser(false)} />}
          </div>
        )}
      </div>

      {mobileView ? (
        <MobileSettings
          menu={menu}
          handleClick={handleClick}
          setMenu={setMenu}
        />
      ) : (
        <div className={styles.div2}>
          {active === "profile" && <EditProfile />}
          {active === "users" && (
            <UserDetails
              menu={menu}
              handleClick={handleClick}
              setMenu={setMenu}
            />
          )}
        </div>
      )}
    </div>
  );
}
