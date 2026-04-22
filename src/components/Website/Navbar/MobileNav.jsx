/** @format */
import React from "react";
import styles from "./nav.module.css";
import UppistImage from "./UppistImage";
import { NavLink } from "react-router-dom";

export default function MobileNav({ handleClick }) {
  return (
    <nav className={styles.mobileNav}>
      <div className={styles.header}>
        <NavLink to='/' onClick={handleClick}>
          <UppistImage />
        </NavLink>
        <svg
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          width='30'
          height='30'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.75806 17.2428L12.0011 11.9998L17.2441 17.2428M17.2441 6.75684L12.0001 11.9998L6.75806 6.75684'
            stroke='#2B2B2B'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </div>

      <div>
        <ul className={styles.mobileLinks}>
          {/*navbar ul  */}
          <NavLink to='/' onClick={handleClick} className={styles.notactive}>
            <li>Home</li>
          </NavLink>
          <NavLink
            to='/products'
            onClick={handleClick}
            className={styles.notactive}
          >
            <li>Product</li>
          </NavLink>
          <NavLink
            to='/solutions'
            onClick={handleClick}
            className={styles.notactive}
          >
            <li>Solutions</li>
          </NavLink>
          <NavLink
            to='/pricing'
            onClick={handleClick}
            className={styles.notactive}
          >
            <li>Pricing</li>
          </NavLink>
          <NavLink
            to='/About'
            onClick={handleClick}
            className={styles.notactive}
          >
            <li>About</li>
          </NavLink>
          <NavLink
            to='/contact'
            onClick={handleClick}
            className={styles.notactive}
          >
            <li>Contact</li>
          </NavLink>

          <NavLink to='/request-a-demo'>
            <li className={styles.demo}>Request a Demo</li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
