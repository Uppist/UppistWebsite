/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import time from "../../../../../assets/Dashboard/time.svg";
import right from "../../../../../assets/Dashboard/Icon.svg";
import settingStyle from "../Settings/style.module.css";
import DeleteUser from "./DeleteUser";
import LiveAgentChat from "../../../LiveAgentChat/LiveAgentChat";
import Loader from "../../../Loader";
import MobileAgent from "./MobileAgent";

export default function Agent() {
  const [isTime, setIsTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("All time");
  const [menu, setMenu] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  function handleView() {
    setViewLoading(true);

    setTimeout(() => {
      setViewUser(true);
      // setView(true);
      setViewLoading(false);
    }, 1500); // loader duration
  }

  function handleDelete(e) {
    e.stopPropagation();
    setIsDelete((prev) => !prev);
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

  function handleClick() {
    setMenu((prev) => !prev);
  }
  //clicking outside to close
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mobileView = window.innerWidth <= 768;

  return (
    <div className={styles.agent}>
      {viewLoading && <Loader />}
      {viewUser ? (
        <LiveAgentChat
          onClose={() => {
            setViewUser(false);
            setMenu(false);
          }}
        />
      ) : (
        <>
          <div className={settingStyle.div}>
            <button
              className={settingStyle.time}
              onClick={() => setIsTime(!isTime)}
            >
              <img src={time} alt='' />
              {selectedTime}
              <img src={right} alt='' />
            </button>
            {isTime && (
              <div className={settingStyle.dropdownTime}>
                <div
                  className={settingStyle.overlay}
                  onClick={() => setIsTime(!isTime)}
                ></div>
                <div className={settingStyle.copy}>
                  {Time.map((item, index) => (
                    <span key={index} onClick={() => handleTime(item)}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={settingStyle.div2}>
            <div className={settingStyle.input}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z'
                  stroke='#667185'
                  stroke-width='1.67'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <input type='Search' name='' placeholder='Search here...' id='' />
            </div>
            {mobileView ? (
              <MobileAgent />
            ) : (
              <div className={settingStyle.div3}>
                <div className={settingStyle.role}>
                  <span>Name</span>
                  <span>Email</span>
                  <span>Status</span>
                  <span>Active Chats</span>
                  <span className={settingStyle.menu}>Menu</span>
                </div>
                <div className={settingStyle.role2}>
                  <span>Sarah Osasai</span>
                  <span>sarahosasai@gmail.com</span>
                  <span>Online</span>
                  <span>6</span>
                  <div className={settingStyle.svg}>
                    <div className={settingStyle.svg2} onClick={handleClick}>
                      <svg
                        width='2'
                        height='13'
                        viewBox='0 0 2 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1Z'
                          fill='black'
                        />
                        <path
                          d='M2 6.33333C2 6.88562 1.55228 7.33333 1 7.33333C0.447715 7.33333 0 6.88562 0 6.33333C0 5.78105 0.447715 5.33333 1 5.33333C1.55228 5.33333 2 5.78105 2 6.33333Z'
                          fill='black'
                        />
                        <path
                          d='M1 12.6667C1.55228 12.6667 2 12.219 2 11.6667C2 11.1144 1.55228 10.6667 1 10.6667C0.447715 10.6667 0 11.1144 0 11.6667C0 12.219 0.447715 12.6667 1 12.6667Z'
                          fill='black'
                        />
                      </svg>
                    </div>

                    {menu && (
                      <div className={settingStyle.list} ref={menuRef}>
                        <span onClick={handleView}>
                          <svg
                            width='20'
                            height='12'
                            viewBox='0 0 20 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M12 6.00049C12 7.14765 11.105 8.07666 10 8.07666C8.895 8.07666 8 7.14765 8 6.00049C8 4.85333 8.895 3.92432 10 3.92432C11.105 3.92432 12 4.85333 12 6.00049ZM10 9.92383C7.011 9.92383 4.195 8.44741 2.399 6.00049C4.195 3.55356 7.011 2.07617 10 2.07617C12.989 2.07617 15.805 3.55356 17.601 6.00049C15.805 8.44741 12.989 9.92383 10 9.92383ZM10 0C5.724 0 1.999 2.41679 0 6.00049C1.999 9.58419 5.724 12 10 12C14.276 12 18.001 9.58419 20 6.00049C18.001 2.41679 14.276 0 10 0Z'
                              fill='#2B2B2B'
                            />
                          </svg>
                          View User
                        </span>
                        <span>
                          <svg
                            width='17'
                            height='17'
                            viewBox='0 0 17 17'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8.33334 0C6.68516 0 5.07399 0.488742 3.70358 1.40442C2.33318 2.3201 1.26507 3.62159 0.634341 5.1443C0.0036107 6.66702 -0.161417 8.34258 0.160126 9.95909C0.48167 11.5756 1.27534 13.0605 2.44078 14.2259C3.60622 15.3913 5.09108 16.185 6.70758 16.5065C8.32409 16.8281 9.99965 16.6631 11.5224 16.0323C13.0451 15.4016 14.3466 14.3335 15.2622 12.9631C16.1779 11.5927 16.6667 9.98151 16.6667 8.33333C16.6667 7.23898 16.4511 6.15535 16.0323 5.1443C15.6135 4.13326 14.9997 3.2146 14.2259 2.44078C13.4521 1.66696 12.5334 1.05313 11.5224 0.634337C10.5113 0.215548 9.42769 0 8.33334 0ZM8.33334 15C6.56523 15 4.86953 14.2976 3.61929 13.0474C2.36905 11.7971 1.66667 10.1014 1.66667 8.33333C1.66483 6.85279 2.16085 5.41462 3.075 4.25L12.4167 13.5917C11.252 14.5058 9.81388 15.0018 8.33334 15ZM13.5917 12.4167L4.25 3.075C5.41462 2.16085 6.85279 1.66483 8.33334 1.66667C10.1014 1.66667 11.7971 2.36905 13.0474 3.61929C14.2976 4.86953 15 6.56522 15 8.33333C15.0018 9.81388 14.5058 11.252 13.5917 12.4167Z'
                              fill='#2B2B2B'
                              fill-opacity='0.8'
                            />
                          </svg>
                          Suspend User
                        </span>
                        <span
                          className={settingStyle.delete}
                          onClick={handleDelete}
                        >
                          {" "}
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.83301 17.5C5.37467 17.5 4.98217 17.3367 4.65551 17.01C4.32884 16.6833 4.16579 16.2911 4.16634 15.8333V5H3.33301V3.33333H7.49967V2.5H12.4997V3.33333H16.6663V5H15.833V15.8333C15.833 16.2917 15.6697 16.6842 15.343 17.0108C15.0163 17.3375 14.6241 17.5006 14.1663 17.5H5.83301ZM14.1663 5H5.83301V15.8333H14.1663V5ZM7.49967 14.1667H9.16634V6.66667H7.49967V14.1667ZM10.833 14.1667H12.4997V6.66667H10.833V14.1667Z'
                              fill='#D31717'
                              fill-opacity='0.8'
                            />
                          </svg>
                          Delete User
                        </span>

                        {isDelete && (
                          <DeleteUser
                            onClose={() => {
                              setIsDelete(false);
                              setMenu(false);
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
