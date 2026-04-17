/** @format */

import React from "react";
import styles from "./styles.module.css";

export default function Enterprise() {
  return (
    <div className={styles.transform}>
      <h2>Every enterprise is unique.</h2>
      <p>We offer tailored pricing based on your operational requirements. </p>
      <div>
        <button className={styles.demo}>
          Request Custom Pricing{" "}
          <svg
            width='18'
            height='16'
            viewBox='0 0 18 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 8H17M10 1L17 8L10 15'
              stroke='#FFFFFF'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
