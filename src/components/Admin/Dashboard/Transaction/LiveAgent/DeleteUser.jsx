/** @format */

import React from "react";
import styles from "./style.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function DeleteUser({ onClose }) {
  function Delete() {
    toast.success("User was deleted successfully");

    setTimeout(() => {
      onClose();
    }, 1500);
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.delete}>
        <h3>Delete this user?</h3>

        <div className={styles.container}>
          <button className={styles.button1} onClick={Delete}>
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
