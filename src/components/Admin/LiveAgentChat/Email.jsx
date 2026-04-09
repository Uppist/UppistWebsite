/** @format */

import React, { useContext, useEffect } from "react";
import styles from "./style.module.css";
import profile from "../../../assets/profile2.svg";
import { NavLink } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";
import { UserDataContext } from "../UserDataContext";
import dayjs from "dayjs";

export default function Email({ handleEmailClick, adminConversations }) {
  const mobileView = useIsMobile();

  const {
    userData,
    conversations,
    adminConversations: contextAdminConversations,
  } = useContext(UserDataContext);

  const userRole = userData?.user?.role;

  // Use appropriate conversations based on role
  let displayConversations = [];
  if (userRole === "Live Agent") {
    displayConversations = conversations || [];
  } else if (userRole === "Admin" || userRole === "Super Admin") {
    displayConversations = contextAdminConversations || [];
  } else {
    displayConversations =
      conversations || contextAdminConversations || adminConversations || [];
  }

  // Log when component re-renders
  useEffect(() => {}, [displayConversations]);

  return (
    <div className={styles.email}>
      <div className={styles.search}>
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

        <input type='search' name='' placeholder='Search here...' id='' />
      </div>

      <div>
        {displayConversations.length === 0 ? (
          <p>No conversations found</p>
        ) : (
          <div className={styles.div1}>
            {!mobileView &&
              displayConversations.map((email) => (
                <>
                  <div
                    className={styles.name2}
                    onClick={() => handleEmailClick(email)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <img src={profile} alt='' />
                    <div>
                      <div className={styles.name2span}>
                        <span>
                          {email.user_email || email.user_name || email.id}
                        </span>
                        <p>
                          {email.started_at
                            ? dayjs(
                                email.last_message_at,
                                "YYYY-MM-DD HH:mm:ss",
                              ).format("hh:mm A")
                            : ""}
                        </p>{" "}
                      </div>
                      <div className={styles.name2p}>
                        <span>
                          {email.summary
                            ? email.summary.slice(0, 20) + "..."
                            : "New conversation"}
                        </span>
                        {/* <p>{email.unread || 0}</p> */}
                      </div>
                    </div>
                  </div>
                </>
              ))}

            {mobileView &&
              displayConversations.map((email) => (
                <>
                  <div
                    className={styles.name2}
                    onClick={() => handleEmailClick(email)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <img src={profile} alt='' />
                    <div>
                      <div className={styles.name2span}>
                        <span>
                          {email.user_email || email.user_name || email.id}
                        </span>
                        <p>
                          {email.started_at
                            ? dayjs(
                                email.last_message_at,
                                "YYYY-MM-DD HH:mm:ss",
                              ).format("hh:mm A")
                            : ""}
                        </p>{" "}
                      </div>
                      <div className={styles.name2p}>
                        <span>{email.summary.slice(0, 20)}...</span>
                        {/* <p>{email.unread}</p> */}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
