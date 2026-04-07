/** @format */

import React, { useEffect, useState } from "react";
import { UserDataContext } from "./UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    //If no token, redirect once and stop execution

    if (!token) return;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // GET USER DETAILS
    axios
      .get("http://139.162.173.87:2005/api/auth/me", { headers })
      .then((res) => {
        setUserData(res.data);
        console.log("User data fetched:", res.data.user);
      })
      .catch((err) => {
        console.log("Auth error:", err);

        // Only redirect if truly unauthorized
        if (err.response?.status === 401) {
          localStorage.removeItem("Token");
          navigate("/login");
          toast.error("Session expired. Please log in again.");
        }
      });

    //GET SUPER ADMIN AGENTS

    axios
      .get("http://139.162.173.87:2005/api/superadmin/agents", { headers })
      .then((res) => setLiveAgents(res.data))
      .catch((err) => {
        console.log("Agents error:", err);
      });

    //  GET ADMIN AGENTS
    axios
      .get("http://139.162.173.87:2005/api/admin/agents", { headers })
      .then((res) => setLiveAgentsAdmin(res.data))
      .catch((err) => {
        console.log("Admin agents error:", err);
      });

    // GET ADMINS
    axios
      .get("http://139.162.173.87:2005/api/superadmin/admins", { headers })
      .then((res) => {
        setGetAdmin(res.data);
      })
      .catch((err) => {
        console.log("Admins error:", err);
      });

    //get conversations per each agent
    axios
      .get("http://139.162.173.87:2005/api/agent/conversations", { headers })
      .then((res) => {
        console.log("conversation fetched:", res.data.conversations);
        setConversations(res.data.conversations);
      })
      .catch((err) => {
        console.log("Conversations error:", err);
      });

    //get admin conversations

    axios
      .get("http://139.162.173.87:2005/api/admin/conversations", { headers })
      .then((res) => {
        console.log("Admin conversations fetched:", res.data.conversations);
        setAdminConversations(res.data.conversations);
      })
      .catch((err) => {
        console.log("Admin conversations error:", err);
      });
  }, [navigate]);

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
