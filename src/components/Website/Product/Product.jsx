/** @format */

import React from "react";
import styles from "./Section1/styles.module.css";
import UppistAI from "./Section1/UppistAI";
import CustomerSupport from "./Section1/CustomerSupport";
export default function Product() {
  return (
    <div className={styles.pricing}>
      <UppistAI />
      <CustomerSupport />
    </div>
  );
}
