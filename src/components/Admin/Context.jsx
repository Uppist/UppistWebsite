/** @format */

import React, { useEffect, useState } from "react";
import { UserDataContext } from "./UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { io } from "socket.io-client";
const SOCKET_URL = "https://bot.uppist.xyz";
const socket = io(SOCKET_URL, {
  path: "/uiagent/socket.io/",
  auth: {
    token: localStorage.getItem("Token"),
  },
});

export default function Context({ children }) {
  const [userData, setUserData] = useState(null);
  const [liveAgents, setLiveAgents] = useState([]);
  const [liveAgentsAdmin, setLiveAgentsAdmin] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const [clientUserName, setClientUserName] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [adminConversations, setAdminConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const baseUrl = "https://bot.uppist.xyz/uiagent/api";

    //If no token, redirect once and stop execution
    if (!token) {
      // navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // GET USER DETAILS
    axios
      .get(`${baseUrl}/auth/me`, { headers })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        // Only redirect if truly unauthorized
        if (err.response?.status === 401) {
          localStorage.removeItem("Token");
          navigate("/login");
          toast.error("Session expired. Please log in again.");
        }
      });

    //GET SUPER ADMIN AGENTS

    axios
      .get(`${baseUrl}/superadmin/agents`, { headers })
      .then((res) => setLiveAgents(res.data))
      .catch((err) => {
        console.log("Error fetching super admin agents:", err);
      });

    //  GET ADMIN AGENTS
    axios
      .get(`${baseUrl}/admin/agents`, { headers })
      .then((res) => setLiveAgentsAdmin(res.data))
      .catch((err) => {
        console.log("Error fetching admin agents:", err);
      });

    // GET ADMINS
    axios
      .get(`${baseUrl}/superadmin/admins`, { headers })
      .then((res) => {
        setGetAdmin(res.data);
      })
      .catch((err) => {
        console.log("Error fetching admins:", err);
      });

    //get conversations per each agent
    axios
      .get(`${baseUrl}/agent/conversations`, { headers })
      .then((res) => {
        const conversationsData = res.data.conversations || res.data;
        setConversations(conversationsData);
      })
      .catch((err) => {
        console.log("Agent conversations error:", err);
      });

    //get admin conversations

    axios
      .get(`${baseUrl}/admin/conversations`, { headers })
      .then((res) => {
        console.log("Initial load - admin conversations fetched:", res.data);
        const adminConversationsData = res.data.conversations || res.data;
        setAdminConversations(adminConversationsData);
      })
      .catch((err) => {
        console.log("Admin conversations error:", err);
      });
  }, [navigate]);

  // Socket listeners for real-time updates
  useEffect(() => {
    console.log("Setting up socket listeners...");
    console.log("Socket connected status:", socket.connected);
    console.log(" Socket ID:", socket.id);

    socket.on("connect", () => {
      console.log("Context socket connected, ID:", socket.id); // Maybe join a room for admin/agent updates
      socket.emit("join_admin_room", { token: localStorage.getItem("Token") });
    });

    socket.on("disconnect", (reason) => {
      console.log("Context socket disconnected, reason:", reason);
    });

    socket.on("connect_error", (error) => {
      console.log("Context socket connection error:", error);
    });

    // Listen for all events to debug
    socket.onAny((event, ...args) => {
      console.log("Socket event received:", event, args);
    });

    socket.on("new_conversation", (newConversation) => {
      console.log("New conversation received:", newConversation);
      setConversations((prev) => {
        const exists = prev.some((conv) => conv.id === newConversation.id);
        if (exists) return prev;
        return [newConversation, ...prev];
      });
      setAdminConversations((prev) => {
        const exists = prev.some((conv) => conv.id === newConversation.id);
        if (exists) return prev;
        return [newConversation, ...prev];
      });
    });

    socket.on("message", (newMessage) => {
      console.log("incoming message in context:", newMessage);
      const conversationId = newMessage.conversation_id;
      const messageText = newMessage.message_text || newMessage.message;

      setConversations((prev) => {
        if (!prev) return prev;
        return prev.map((conv) =>
          conv.id === conversationId
            ? {
                ...conv,
                summary: messageText,
                // unread: (conv.unread || 0) + 1,
                last_message_at: new Date().toISOString(),
              }
            : conv,
        );
      });

      setAdminConversations((prev) => {
        if (!prev) return prev;
        return prev.map((conv) =>
          conv.id === conversationId
            ? {
                ...conv,
                summary: messageText,
                unread: (conv.unread || 0) + 1,
                last_message_at: new Date().toISOString(),
              }
            : conv,
        );
      });

      setMessages((prev) => {
        if (!prev || prev.conversation?.id !== conversationId) return prev;
        const isDuplicate = (prev.messages || []).some(
          (msg) =>
            msg.sender_type === newMessage.sender_type &&
            msg.message_text === messageText,
        );
        if (isDuplicate) return prev;
        return {
          ...prev,
          messages: [
            ...(prev.messages || []),
            {
              sender_type: newMessage.sender_type,
              message_text: messageText,
            },
          ],
        };
      });
    });

    // Also listen for conversation_created in case backend uses different event name
    socket.on("conversation_created", (data) => {
      console.log("Conversation created received:", data);
      setConversations((prev) => {
        const exists = prev.some((conv) => conv.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
      setAdminConversations((prev) => {
        const exists = prev.some((conv) => conv.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
    });

    socket.on("receive_message", (data) => {
      setConversations((prev) => {
        return prev.map((conv) => {
          if (conv.id === data.conversation_id) {
            return {
              ...conv,
              summary: data.message,
              last_message_at: new Date().toISOString(),
            };
          }
          return conv;
        });
      });
    });

    return () => {
      console.log("Cleaning up socket listeners...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.offAny();
      socket.off("new_conversation");
      socket.off("message");
    };
  }, []);

  // Fallback polling for conversations
  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log("🔄 Polling useEffect running, token exists:", !!token);
    if (!token) {
      console.log("🔄 No token, skipping polling setup");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    const baseUrl = "https://bot.uppist.xyz/uiagent/api";

    const pollConversations = () => {
      console.log("🔄 Polling conversations...");

      axios
        .get(`${baseUrl}/agent/conversations`, { headers })
        .then((res) => {
          console.log("📥 Agent conversations API response:", res.data);
          const newConversations = res.data.conversations || res.data;
          console.log(
            "📥 Polled agent conversations:",
            Array.isArray(newConversations)
              ? newConversations.length
              : "not array",
            "items",
          );
          if (Array.isArray(newConversations)) {
            console.log(
              "🔄 Setting conversations to:",
              newConversations.length,
              "items",
            );
            console.log("🔄 Sample conversation:", newConversations[0]);
            setConversations(newConversations);
          }
        })
        .catch((err) => console.log(" Polling conversations error:", err));

      axios
        .get(`${baseUrl}/admin/conversations`, { headers })
        .then((res) => {
          console.log("📥 Admin conversations API response:", res.data);
          const newAdminConversations = res.data.conversations || res.data;
          console.log(
            "📥 Polled admin conversations:",
            Array.isArray(newAdminConversations)
              ? newAdminConversations.length
              : "not array",
            "items",
          );
          if (Array.isArray(newAdminConversations)) {
            console.log(
              "🔄 Setting admin conversations to:",
              newAdminConversations.length,
              "items",
            );
            setAdminConversations(newAdminConversations);
          }
        })
        .catch((err) =>
          console.log("❌ Polling admin conversations error:", err),
        );
    };

    // Poll every 10 seconds
    const interval = setInterval(pollConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,

        liveAgents,
        setLiveAgents,

        liveAgentsAdmin,
        setLiveAgentsAdmin,

        getAdmin,
        setGetAdmin,

        clientUserName,
        setClientUserName,

        conversations,
        setConversations,

        adminConversations,
        setAdminConversations,

        messages,
        setMessages,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
