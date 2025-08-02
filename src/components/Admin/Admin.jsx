/** @format */

import React from "react";
import Table from "./Table";
import copy from "../../assets/copyWhite.svg";
import styles from "./style.module.css";
import Uppist from "../../assets/uppist.png";

export default function Admin() {
  return (
    <div className={styles.admin}>
      <img src={Uppist} alt="UppistLogo" />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Chatbot Logs</h2>
          <div className={styles.copy}>
            <img src={copy} alt='' />
            <span>Copy CSV</span>
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
}
