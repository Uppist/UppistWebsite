/** @format */

import React from "react";
import styles from "./style.module.css";

export default function Content({ Programme, visitors }) {
  return (
    <div className={styles.content}>
      <span>Dashboard</span>
      <div className={styles.revenue}>
        <span>Total number of visitors</span>
        <label>{visitors}</label>
      </div>

      <div className={styles.programmeRevenue}>
        {Programme.map((data, index) => (
          <div className={styles.text} key={index}>
            <span>{data.title}</span>
            <div>
              <span>{data.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
