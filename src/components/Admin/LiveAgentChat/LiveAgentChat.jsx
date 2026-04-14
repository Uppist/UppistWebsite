/** @format */

import React, { useContext } from "react";
import styles from "./style.module.css";
import profile from "../../../assets/profile.svg";
import Email from "./Email";
import Chat from "./Chat";
import Loader from "../Loader";
import { UserDataContext } from "../UserDataContext";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";
import axios from "axios";

export default function LiveAgentChat() {
  // const [messages, setMessages] = useState(null);
  const location = useLocation();
  const mobileView = useIsMobile();
  const isChatRoute = location.pathname.startsWith("/messages/");
  const agent = location.state?.agent;
  const adminConversations = location.state?.agentConversations || [];
  const email = agent?.email;
  const name = agent?.email?.split("@")[0];
  const navigate = useNavigate();

  const { userData, messages, setMessages } = useContext(UserDataContext);

  const userRole = userData?.user?.role;

  function handleEmailClick(email) {
    const token = localStorage.getItem("Token");

    //If no token, redirect once and stop execution
    if (!token) return;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log("Clicking on email:", email.id);
    axios
      .get(
        `https://bot.uppist.xyz/uiagent/api/agent/conversations/${email.id}`,
        {
          headers,
        },
      )
      .then((res) => {
        console.log("Conversation messages fetched:", res.data);
        // Ensure consistent structure
        const conversationData = res.data;
        if (Array.isArray(conversationData)) {
          // If API returns just messages array, wrap it properly
          setMessages({
            conversation: { id: email.id, user: email },
            messages: conversationData,
          });
        } else {
          // If API returns proper structure
          setMessages(conversationData);
        }

        if (mobileView) {
          navigate(`/messages/${email.id}`);
        }
      })
      .catch((err) => {
        console.error("error fetching conversation messages:", err);
      });

    console.log("Email clicked:", email.id);
  }

  return (
    <div className={styles.chat}>
      {!isChatRoute && userRole !== "Live Agent" && (
        <NavLink to={"/live_agents"} className={styles.back}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.6035 17.5832L5.5827 10.5832C5.49936 10.4998 5.4402 10.4096 5.4052 10.3123C5.3702 10.2151 5.35297 10.1109 5.35353 9.99984C5.35353 9.88873 5.37103 9.78456 5.40603 9.68734C5.44103 9.59012 5.49992 9.49984 5.5827 9.4165L12.6035 2.39567C12.798 2.20123 13.041 2.104 13.3327 2.104C13.6244 2.104 13.8744 2.20817 14.0827 2.4165C14.291 2.62484 14.3952 2.86789 14.3952 3.14567C14.3952 3.42345 14.291 3.6665 14.0827 3.87484L7.9577 9.99984L14.0827 16.1248C14.2771 16.3193 14.3744 16.559 14.3744 16.844C14.3744 17.129 14.2702 17.3754 14.0619 17.5832C13.8535 17.7915 13.6105 17.8957 13.3327 17.8957C13.0549 17.8957 12.8119 17.7915 12.6035 17.5832Z'
              fill='#2B2B2B'
            />
          </svg>
          Back
        </NavLink>
      )}

      {!isChatRoute && userRole !== "Live Agent" && (
        <div className={styles.container}>
          <div className={styles.divContainer}>
            <img src={profile} alt='' />
            <div className={styles.name}>
              <p>
                {name}{" "}
                {agent?.is_online === true ? (
                  <span
                    style={{
                      color: "#00C851",
                      fontSize: "12px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#00C851' />
                    </svg>
                    Online
                  </span>
                ) : agent?.is_busy === true ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='red' />
                    </svg>
                    Busy
                  </span>
                ) : (
                  <span
                    style={{
                      color: "#667085",
                      fontSize: "12px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#667085' />
                    </svg>
                    Offline
                  </span>
                )}
              </p>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.activeChat}>
            <div className={styles.name1}>
              <p>5</p>
              <span>Active Chats{mobileView && ":"}</span>
            </div>
            <div className={styles.name1}>
              {" "}
              <p>3</p>
              <span>Closed Chats{mobileView && ":"} </span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.chatBox}>
        {mobileView ? (
          isChatRoute ? (
            <Outlet />
          ) : (
            <Email
              handleEmailClick={handleEmailClick}
              adminConversations={adminConversations}
            />
          )
        ) : (
          <>
            <Email
              handleEmailClick={handleEmailClick}
              adminConversations={adminConversations}
            />
            <Chat message={messages} setMessages={setMessages} />
          </>
        )}
      </div>
    </div>
  );
}
