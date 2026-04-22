/** @format */

import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

export default function Transform() {
  return (
    <div className={styles.transform}>
      <h2>Transform Your Customer Support</h2>
      <p>
        Deliver faster, smarter, and more scalable customer experiences with AI.
      </p>
      <div>
        <NavLink to='/request-a-demo'>
          <button className={styles.demo}>Book a Demo</button>
        </NavLink>
        <NavLink to='/contact'>
          <button className={styles.talk}>
            Talk to our Team{" "}
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
