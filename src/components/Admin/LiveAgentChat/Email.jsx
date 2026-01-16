/** @format */

import React from "react";
import styles from "./style.module.css";
import profile from "../../../assets/profile2.svg";

export default function Email() {
  return (
    <div className={styles.email}>
      <div className={styles.search}>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z'
            stroke='#667185'
            stroke-width='1.67'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>

        <input type='search' name='' placeholder='Search here...' id='' />
      </div>

      <div>
        <div className={styles.div1}>
          <img src={profile} alt='' />
          <div className={styles.name2}>
            <div className={styles.name2span}>
              <span>sarahcollins@gmail.com</span>
              <p>10:30 am</p>
            </div>
            <div className={styles.name2p}>
              <span>Hi, are you Available Tomorrow?</span>
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
