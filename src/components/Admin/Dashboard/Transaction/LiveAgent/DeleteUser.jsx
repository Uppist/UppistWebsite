/** @format */

import React from "react";
import styles from "./style.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function DeleteUser({ onClose, active }) {
  function Delete() {
    toast.success(
      `${active === "users" ? "User" : "Agent"} was deleted successfully`,
    );

    setTimeout(() => {
      onClose();
    }, 1500);
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.delete}>
        <h3 className={`${active === "users" ? styles.user : styles.agent2}`}>
          Delete this {active === "users" ? "user" : "agent"}?
        </h3>

        <div className={styles.container}>
          <button
            className={`${active === "users" ? styles.button1 : styles.button11}`}
            onClick={Delete}
          >
            Delete
          </button>
          <button className={styles.button2} onClick={onClose}>
            Go Back
          </button>
        </div>
      </div>

      <ToastContainer className={styles.toast} />
    </div>
  );
}
