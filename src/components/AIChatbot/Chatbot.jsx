/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import back from "../../assets/left.svg";
import ai from "../../assets/ai.svg";
import cancel from "../../assets/cancel2.svg";
import emoji from "../../assets/emoji.svg";
import enter from "../../assets/enter.svg";
import chatbot from "../../assets/chatbot.svg";
import { io } from "socket.io-client";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const SOCKET_URL = "https://bot.uppist.xyz";
const baseUrl = "https://bot.uppist.xyz/uiagent/api";

export default function Chatbot({ Close, handleClose, logindetail }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);

  const isHandoffRef = useRef(false);

  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem("session_id") || null;
  });

  const [conversation_id, setconversation_id] = useState(() => {
    return localStorage.getItem("conversation_id") || null;
  });

  const [, setIsHandoff] = useState(false);

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
  hours = hours ? hours : 12;
  const formattedHour = String(hours).padStart(2, "0");

  const formattedTime = `${year}-${month}-${day} / ${formattedHour}:${minutes} ${ampm}`;

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [chatHistory]);

  // Connect to correct server
  useEffect(() => {
    if (socket) return;
    const newSocket = io(SOCKET_URL, {
      path: "/uiagent/socket.io/",
    });

    newSocket.on("connect", () => {
      console.log("customer socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      // console.log("❌ Customer socket disconnected");
    });

    newSocket.on("connect_error", () => {
      // console.log("❌ Customer socket connection error:", err.message);
    });

    setSocket(newSocket);
    console.log("Socket initialized:", newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Join conversation room once socket + conversation_id are ready
  useEffect(() => {
    if (socket && conversation_id) {
      socket.emit("join_conversation", { conversation_id });

      console.log("Client joined:", conversation_id);
    }
  }, [socket, conversation_id]);

  // Listen for incoming messages from agent
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (newMessage) => {
      // ignore messages sent by user
      if (newMessage?.sender_type === "user") return;

      // if (newMessage?.sender_type === "bot") return;

      const messageText = newMessage?.message_text || newMessage?.message;

      // Avoid duplicate messages: check if message already exists in chat history
      setChatHistory((prev) => {
        const isDuplicate = prev.some(
          (msg) => msg.role === "model" && msg.text === messageText,
        );
        if (isDuplicate) return prev;

        return [
          ...prev,
          {
            role: "model",
            text: messageText,
          },
        ];
      });
    };

    // Listen for agent joining notification
    const handleAgentJoined = (data) => {
      console.log("Agent joined:", data);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "system",
          text: "An agent has joined the conversation",
        },
      ]);
    };

    socket.on("message", handleMessage);
    socket.on("agent_joined", handleAgentJoined);

    return () => {
      socket.off("message", handleMessage);
      socket.off("agent_joined", handleAgentJoined);
    };
  }, [socket]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSessionEnded = (data) => {
      console.log("Agent session ended:", data);
      setIsHandoff(false);
      isHandoffRef.current = false;
      setChatHistory((prev) => [
        ...prev,
        {
          role: "system",
          text: "Agent has left. You are now chatting with AI.",
        },
      ]);
    };

    socket.on("agent_session_ended", handleSessionEnded);

    return () => socket.off("agent_session_ended", handleSessionEnded);
  }, [socket]);

  // function generateResponse(history) {
  //   console.log("Chat History Sent:", history);
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "model", text: "..." },
    ]);

    setIsTyping(true);

    if (isHandoffRef.current) {
      try {
        await axios.post(
          `${baseUrl}/chat/send`,
          { conversation_id, message: userMessage, sender_type: "user" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          },
        );
        // remove the "..." placeholder — agent reply will come via socket
        setChatHistory((prev) => prev.slice(0, -1));
      } catch (error) {
        console.error("Error sending message to agent:", error);
        setChatHistory((prev) => prev.slice(0, -1));
      }
      setIsTyping(false);
      return;
    }

    let aiReply = "";

    try {
      const response = await axios.post(
        "https://bot.uppist.xyz/chat",
        {
          user_prompt: userMessage,
          user_name: logindetail.name,
          email: logindetail.email,
          session_id: sessionId,
        },
        { headers: { "Content-Type": "application/json" } },
      );

      aiReply = response.data?.response?.content || "No response.";

      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "model", text: aiReply },
      ]);

      setIsTyping(false);

      const newSessionId = response.data.session_id;
      const newConversationId = response.data.conversation_id;
      console.log("response:", response.data);

      if (newSessionId && !localStorage.getItem("session_id")) {
        localStorage.setItem("session_id", newSessionId);
        setSessionId(newSessionId);
      }

      if (newConversationId && !localStorage.getItem("conversation_id")) {
        localStorage.setItem("conversation_id", newConversationId);
        setconversation_id(newConversationId);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);

      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "model", text: "Error: Could not get response." },
      ]);

      setIsTyping(false);
    }

    try {
      await axios.get("https://bot.uppist.xyz/logs", {
        params: {
          prompt: userMessage,
          response: aiReply,
          timestamp: formattedTime,
        },
      });
    } catch (err) {
      console.error("Logging error:", err);
    }

    // console.log("conversation_id", conversation_id);
  }
  async function handleButton() {
    const data = {
      conversation_id: localStorage.getItem("conversation_id"),
      user_identifier: localStorage.getItem("session_id"),
      user_name: logindetail.name,
      user_email: logindetail.email,
    };

    setChatHistory((prev) => [
      ...prev,
      {
        role: "system",
        text: "Connecting you to an agent...",
      },
    ]);

    try {
      const res = await axios.post(`${baseUrl}/chat/handoff`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });

      const response = res.data;
      console.log(response);

      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          {
            role: "system",
            text:
              response.mode === "agent_active"
                ? "Connected you to an agent"
                : "All agents are busy, you'll be connected shortly...",
          },
        ]);
        if (response.mode === "agent_active") {
          setIsHandoff(true);
          isHandoffRef.current = true;
        }
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.chatbot}>
      <div className={styles.logos}>
        <img src={back} alt='' onClick={Close} />
        <span
          style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 600 }}
        >
          Mac
        </span>
        {conversation_id && (
          <button type='button' onClick={handleButton}>
            Speak to An Agent
          </button>
        )}
        <img src={cancel} alt='' onClick={handleClose} />
      </div>

      <div className={styles.texts}>
        {chatHistory.map((chat, index) => (
          <div
            className={`${
              chat.role === "model"
                ? styles.bot
                : chat.role === "system"
                  ? styles.system
                  : styles.human
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
