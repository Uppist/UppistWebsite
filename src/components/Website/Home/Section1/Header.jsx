/** @format */

import React from "react";
import styles from "./header.module.css";
import image from "../../../../assets/Website_images/Home/image.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <section className={styles.header}>
      <div className={styles.header1}>
        <h2>
          AI Infrastructure for
          <br /> Enterprise Customer Conversations
        </h2>
        <span>
          Automate and manage customer interactions across every channel —
          instantly, intelligently, and at scale. Built for enterprises in
          banking, finance, healthcare, logistics, and high-growth digital
          platforms.
        </span>
        <div>
          <NavLink to='/request-a-demo'>
            <button className={styles.demo}>Request a Demo</button>
          </NavLink>
          <NavLink to='/products'>
            <button className={styles.see}>
              See Platform Overview{" "}
              <svg
                width='18'
                height='16'
                viewBox='0 0 18 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 8H17M10 1L17 8L10 15'
                  stroke='#FF9200'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
          </NavLink>
        </div>
      </div>
      <div className={styles.image}>
        <img src={image} alt='' />
      </div>
    </section>
  );
}
