/** @format */

import React from "react";
import styles from "./style.module.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function DeleteUser({ onClose, id, setLiveAgents, users }) {
  const location = useLocation();
  function Delete() {
    // console.log(id);
    const token = localStorage.getItem("Token");
    if (token) {
      if (users.role === "Live Agent") {
        axios
          .delete(`http://139.162.173.87:2005/api/superadmin/agents/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            toast.success(
              `${location.pathname === "/live_agents" ? "User" : "Agent"} was deleted successfully`,
            );

            setTimeout(() => {
              setLiveAgents((prev) => ({
                ...prev,
                agents: prev.agents.filter((item) => item.id !== id),
              }));
              onClose();
            }, 2500);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (users.role === "admin") {
        toast.success("");
      }
    }
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.delete}>
        <h3
          className={`${location.pathname === "/live_agents" ? styles.user : styles.agent2}`}
        >
          Delete this {location.pathname === "/live_agents" ? "user" : "agent"}?
        </h3>

        <div className={styles.container}>
          <button
            className={`${location.pathname === "/live_agents" ? styles.button11 : styles.button1}`}
            onClick={Delete}
          >
            Delete
          </button>
          <button className={styles.button2} onClick={onClose}>
            {location.pathname === "/live_agents" ? "Cancel" : "Go Back"}
          </button>
        </div>
      </div>

      <ToastContainer className={styles.toast} />
    </div>
  );
}
