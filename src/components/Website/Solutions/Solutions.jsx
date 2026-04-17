/** @format */

import React from "react";
import Expert from "./Section2/Expert";
import styles from "./Section1/styles.module.css";
import Industries from "./Section1/Industries";

export default function Solutions() {
  return (
    <div className={styles.solution}>
      <Industries />
      <Expert />
    </div>
  );
}
