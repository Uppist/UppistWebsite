/** @format */

import React from "react";
import styles from "../Dashboard/Transaction/Settings/AddUser/style.module.css";
import styles2 from "../Dashboard/Transaction/LiveAgent/style.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function CloseChat({ onClose }) {
  function Close() {
    toast.success("Chat closed successfully");

    setTimeout(() => {
      onClose();
    }, 1500);
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
