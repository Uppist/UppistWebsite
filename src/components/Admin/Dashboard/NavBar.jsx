/** @format */

import React from "react";
import styles from "./style.module.css";

export default function NavBar({ isActive }) {
  return (
    <nav className={styles.nav}>
      {isActive === "log"
        ? "Website Log"
        : isActive === "whatsapp"
        ? "Whatsapp Log"
        : "Dashboard"}
    </nav>
  );
}
