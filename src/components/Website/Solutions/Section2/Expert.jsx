/** @format */

import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

export default function Expert() {
  return (
    <div className={styles.transform}>
      <h2>Talk to an Expert</h2>
      <p>Learn how Uppist can transform your customer operations. </p>
      <div>
        <NavLink to='/contact'>
          <button className={styles.demo}>
            Contact Sales{" "}
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
        </NavLink>
      </div>
    </div>
  );
}
