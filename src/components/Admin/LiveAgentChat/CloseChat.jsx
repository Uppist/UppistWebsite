/** @format */

import React from "react";
import styles from "../Dashboard/Transaction/Settings/AddUser/style.module.css";
import styles2 from "../Dashboard/Transaction/LiveAgent/style.module.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function CloseChat({ onClose, conversation_id, onChatClosed }) {
  function Close() {
    toast.success("Chat closed successfully");

    axios
      .post(`http://139.162.173.87:2005/api/chat/close/${conversation_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log("Chat closed:", res.data);

        setTimeout(() => {
          onClose();
          onChatClosed();
        }, 1500);
      })
      .catch((err) => {
        console.log("Error closing chat:", err);
        toast.error("Failed to close chat. Please try again.");
      });
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles2.delete}>
        <h3>Close this user?</h3>

        <div className={styles2.container}>
          <button className={styles2.button2} onClick={onClose}>
            Cancel
          </button>
          <button className={styles2.close} onClick={Close}>
            Close
          </button>
        </div>
      </div>

      <ToastContainer className={styles.toast} />
    </div>
  );
}
