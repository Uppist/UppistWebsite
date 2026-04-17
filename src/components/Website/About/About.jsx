/** @format */

import React from "react";
import Believe from "./Believe";
import Story from "./Story";
import styles from "./styles.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <Story />
      <Believe />
    </div>
  );
}
