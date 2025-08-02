/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import back from "../../assets/left.svg";
import ai from "../../assets/ai.svg";
import cancel from "../../assets/cancel2.svg";
import emoji from "../../assets/emoji.svg";
import enter from "../../assets/enter.svg";
import chatbot from "../../assets/chatbot.svg";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Chatbot({ Close, handleClose, logindetail }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem("session_id") || null;
  });

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  const formattedHour = String(hours).padStart(2, "0");

  const formattedTime = `${year}-${month}-${day} / ${formattedHour}:${minutes} ${ampm}`;

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [chatHistory]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function generateResponse(history) {
    console.log("Chat History Sent:", history);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    const newHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
      { role: "model", text: "..." },
    ];

    setChatHistory(newHistory);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://bot.uppist.xyz/chat",
        {
          user_prompt: userMessage,
          user_name: logindetail.name,
          email: logindetail.email,
          session_id: sessionId,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiReply = response.data?.response?.content || "No response.";
      const newSessionId = response.data.session_id;
      console.log("AI Reply:", newSessionId);

      if (newSessionId && !localStorage.getItem("session_id")) {
        localStorage.setItem("session_id", newSessionId);
        setSessionId(newSessionId); // update state too
      }
      console.log("AI Response:", response.data.session_id);
      setIsTyping(false);

      const updatedHistory = [
        ...chatHistory,
        { role: "user", text: userMessage },
        { role: "model", text: aiReply },
      ];

      setChatHistory(updatedHistory);

      generateResponse(updatedHistory);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);

      const errorHistory = [
        ...chatHistory,
        { role: "user", text: userMessage },
        { role: "model", text: "Error: Could not get response." },
      ];

      setChatHistory(errorHistory);
    }

    const response_log = await axios.get("https://bot.uppist.xyz/logs", {
      params: {
        prompt: userMessage,
        response: aiReply,
        timestamp: formattedTime,
      },
    });
    console.log(response_log.data);
  }

  return (
    <div className={styles.chatbot}>
      <div className={styles.logos}>
        <img src={back} alt='' onClick={Close} />
        <img src={ai} alt='' />
        <img src={cancel} alt='' onClick={handleClose} />
      </div>

      <div className={styles.texts}>
        {chatHistory.map((chat, index) => (
          <div
            className={`${
              chat.role === "model" ? styles.bot : styles.human
            } message user-message`}
            key={index}
          >
            {chat.role === "model" && <img src={chatbot} alt='' />}

            {chat.text === "..." && isTyping ? (
              <div className={styles.typing}>
                <span>. . .</span>
              </div>
            ) : chat.role === "model" ? (
              <div className={styles.botText}>
                <ReactMarkdown>{chat.text}</ReactMarkdown>
              </div>
            ) : (
              <span>{chat.text}</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.send}>
          <div>
            <textarea
              ref={inputRef}
              placeholder='Ask me anything...'
              required
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            ></textarea>
            <img src={emoji} alt='' />
          </div>
          <button type='submit'>
            <img src={enter} className={styles.sendImg} alt='' />
          </button>
        </div>
      </form>
    </div>
  );
}
