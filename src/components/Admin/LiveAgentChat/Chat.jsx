/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Reassign from "./Reassign";
import CloseChat from "./CloseChat";
import enter from "../../../assets/enter.svg";
import emoji from "../../../assets/emoji.svg";
import { NavLink } from "react-router-dom";
import useIsMobile from "../../../hooks/useIsMobile";
import { io } from "socket.io-client";
import human from "../../../assets/human.svg";
import ChatStyle from "../../../components/AIChatbot/style.module.css";
import { UserDataContext } from "../UserDataContext";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const SOCKET_URL = "http://139.162.173.87:2005";

export default function Chat({ message, setMessages }) {
  const [openSvg, setOpenSvg] = React.useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [reassignAgent, setReassignAgent] = React.useState(false);
  const [closeChat, setCloseChat] = React.useState(false);
  const [socket, setSocket] = useState(null);
  const mobileView = useIsMobile();

  // connect to correct server
  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("✅ Agent socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Agent socket disconnected");
    });

    newSocket.on("connect_error", (err) => {
      console.log("❌ Agent socket connection error:", err.message);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !message) return;

    // Join the conversation room
    socket.emit("join_conversation", {
      conversation_id: message?.conversation?.id,
    });

    console.log("Agent joined conversation room:", message?.conversation?.id);

    // Listen for incoming messages from customer
    const handleMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender_type: newMessage.sender_type,
            message_text:
              newMessage.message_text || newMessage.message || newMessage,
          },
        ],
      }));
    };

    const handleAgentJoined = (data) => {
      console.log("Agent joined:", data);
    };

    const handleLeave = (data) => {
      console.log("Left conversation:", data);
    };

    socket.on("message", handleMessage);
    socket.on("agent_joined", handleAgentJoined);
    socket.on("leave_conversation", handleLeave);

    return () => {
      socket.off("message", handleMessage);
      socket.off("agent_joined", handleAgentJoined);
      socket.off("leave_conversation", handleLeave);
    };
  }, [socket, message]);

  const { userData } = useContext(UserDataContext);

  function handleMenu() {
    setOpenSvg((prev) => !prev);
  }

  function handleReassign() {
    setReassignAgent((prev) => !prev);
  }

  function handleCloseChat() {
    setCloseChat((prev) => !prev);
  }

  const role = userData?.user?.role === "Live Agent";

  const [myMessage, setMyMessage] = useState("");

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(`.${styles.chatbox}`)) {
        setOpenSvg(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [message?.messages]);

  function SendMessage() {
    if (!myMessage.trim() || !socket) return;

    const newMessage = {
      conversation_id: message?.conversation?.id,
      message: myMessage,
      sender_type: "agent",
    };
    axios
      .post("http://139.162.173.87:2005/api/chat/send", newMessage, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((res) => console.log("Message sent:", res.data))
      .catch((err) => console.log("Send message error:", err));

    setMyMessage("");
  }

  // Send on Enter key
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      SendMessage();
    }
  }

  return (
    <div className={styles.chatbox}>
      {!message ? (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "-webkit-fill-available",
            fontFamily: "Inter",
            fontSize: "16px",
            color: "rgba(43, 43, 43, 0.8)",
            fontWeight: "600",
          }}
        >
          Click on a conversation to view messages
        </span>
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.user}>
              <NavLink to={"/messages"}>
                {mobileView && (
                  <svg
                    width='10'
                    height='10'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12.6035 17.5832L5.5827 10.5832C5.49936 10.4998 5.4402 10.4096 5.4052 10.3123C5.3702 10.2151 5.35297 10.1109 5.35353 9.99984C5.35353 9.88873 5.37103 9.78456 5.40603 9.68734C5.44103 9.59012 5.49992 9.49984 5.5827 9.4165L12.6035 2.39567C12.798 2.20123 13.041 2.104 13.3327 2.104C13.6244 2.104 13.8744 2.20817 14.0827 2.4165C14.291 2.62484 14.3952 2.86789 14.3952 3.14567C14.3952 3.42345 14.291 3.6665 14.0827 3.87484L7.9577 9.99984L14.0827 16.1248C14.2771 16.3193 14.3744 16.559 14.3744 16.844C14.3744 17.129 14.2702 17.3754 14.0619 17.5832C13.8535 17.7915 13.6105 17.8957 13.3327 17.8957C13.0549 17.8957 12.8119 17.7915 12.6035 17.5832Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
              </NavLink>

              <svg
                width='20'
                height='20'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20.0007 3.3335C17.812 3.3335 15.6447 3.76459 13.6226 4.60217C11.6005 5.43975 9.76318 6.66741 8.21554 8.21505C5.08993 11.3407 3.33398 15.5799 3.33398 20.0002C3.33398 24.4204 5.08993 28.6597 8.21554 31.7853C9.76318 33.3329 11.6005 34.5606 13.6226 35.3982C15.6447 36.2357 17.812 36.6668 20.0007 36.6668C24.4209 36.6668 28.6602 34.9109 31.7858 31.7853C34.9114 28.6597 36.6673 24.4204 36.6673 20.0002C36.6673 17.8115 36.2362 15.6442 35.3986 13.6221C34.5611 11.6 33.3334 9.76269 31.7858 8.21505C30.2381 6.66741 28.4008 5.43975 26.3787 4.60217C24.3566 3.76459 22.1893 3.3335 20.0007 3.3335ZM11.784 30.4668C12.5007 28.9668 16.8673 27.5002 20.0007 27.5002C23.134 27.5002 27.5007 28.9668 28.2173 30.4668C25.883 32.3269 22.9854 33.3378 20.0007 33.3335C16.9007 33.3335 14.0507 32.2668 11.784 30.4668ZM30.6007 28.0502C28.2173 25.1502 22.434 24.1668 20.0007 24.1668C17.5673 24.1668 11.784 25.1502 9.40065 28.0502C7.62763 25.7412 6.66676 22.9113 6.66732 20.0002C6.66732 12.6502 12.6507 6.66683 20.0007 6.66683C27.3507 6.66683 33.334 12.6502 33.334 20.0002C33.334 23.0335 32.3007 25.8335 30.6007 28.0502ZM20.0007 10.0002C16.7673 10.0002 14.1673 12.6002 14.1673 15.8335C14.1673 19.0668 16.7673 21.6668 20.0007 21.6668C23.234 21.6668 25.834 19.0668 25.834 15.8335C25.834 12.6002 23.234 10.0002 20.0007 10.0002ZM20.0007 18.3335C19.3376 18.3335 18.7017 18.0701 18.2329 17.6013C17.764 17.1324 17.5007 16.4965 17.5007 15.8335C17.5007 15.1705 17.764 14.5346 18.2329 14.0657C18.7017 13.5969 19.3376 13.3335 20.0007 13.3335C20.6637 13.3335 21.2996 13.5969 21.7684 14.0657C22.2373 14.5346 22.5007 15.1705 22.5007 15.8335C22.5007 16.4965 22.2373 17.1324 21.7684 17.6013C21.2996 18.0701 20.6637 18.3335 20.0007 18.3335Z'
                  fill='#2B2B2B'
                  fillOpacity='0.5'
                />
              </svg>
              <p>{message?.user?.user_email || message?.user?.user_name}</p>
              <div className={styles.circle}></div>
              <span>Website visitor</span>
            </div>
            {/* {!role && ( */}
            <svg
              onClick={handleMenu}
              className={styles.toggle}
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
            {/* )} */}

            {openSvg && (
              <div className={styles.menu}>
                <p onClick={handleCloseChat}>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.75806 17.2428L12.0011 11.9998L17.2441 17.2428M17.2441 6.75684L12.0001 11.9998L6.75806 6.75684'
                      stroke='#1D2E2E'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Close Chat
                </p>
                {closeChat && (
                  <CloseChat
                    onClose={() => {
                      setReassignAgent(false);
                      setOpenSvg(false);
                    }}
                    conversation_id={message?.conversation?.id}
                    onChatClosed={() => {
                      setMessages(null);
                    }}
                  />
                )}
                {!role && (
                  <p onClick={handleReassign}>
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
                        fillOpacity='0.8'
                      />
                    </svg>
                    Reassign
                  </p>
                )}

                {reassignAgent && (
                  <Reassign
                    onClose={() => {
                      setReassignAgent(false);
                      setOpenSvg(false);
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className={styles.texts}>
            {(message?.messages || []).map((chat, index) => (
              <div
                className={`${
                  chat.sender_type === "agent" || chat.sender_type === "bot"
                    ? styles.human
                    : ChatStyle.bot
                } message user-message`}
                key={index}
              >
                {chat.sender_type === "user" && <img src={human} alt='' />}

                {chat.sender_type === "user" ? (
                  <span>{chat.message_text}</span>
                ) : chat.message_text === "..." && isTyping ? (
                  <div className={ChatStyle.typing}>
                    <span>. . .</span>
                  </div>
                ) : (
                  <span>{chat.message_text}</span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {role && (
            <div className={styles.input}>
              <div>
                <textarea
                  value={myMessage}
                  onChange={(e) => setMyMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Type here'
                />
                <img src={emoji} alt='' />
              </div>
              <img
                src={enter}
                onClick={SendMessage}
                alt='send message'
                style={{ width: "100px", cursor: "pointer" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
