/** @format */

import React from "react";
import UppistImage from "./UppistImage";
import styles from "./nav.module.css";
import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isMobile, setIsMobile] = React.useState(false);

  function handleClick() {
    // alert("clicked");
    setIsMobile(!isMobile);
  }

  return (
    <nav className={styles.navbar}>
      <UppistImage />
      <ul className={styles.navLinks}>
        {/*navbar ul  */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>Product</li>
        </NavLink>
        <NavLink
          to='/solutions'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>Solutions</li>
        </NavLink>
        <NavLink
          to='/pricing'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>Pricing</li>
        </NavLink>
        <NavLink
          to='/About'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>About</li>
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive ? styles.active : styles.notactive
          }
        >
          <li>Contact</li>
        </NavLink>
        <NavLink to='/request-a-demo'>
          <li className={styles.demo}>Request a Demo</li>
        </NavLink>
      </ul>

      {/*Menu icon */}
      <svg
        className={styles.menu}
        onClick={handleClick}
        width='27'
        height='27'
        viewBox='0 0 27 27'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.41882 18.424L20.5915 18.424'
          stroke='#2B2B2B'
          stroke-width='2.16753'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M5.41882 13.0052H20.5915'
          stroke='#2B2B2B'
          stroke-width='2.16753'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <path
          d='M5.41882 7.58634L14.0889 7.58634'
          stroke='#2B2B2B'
          stroke-width='2.16753'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>

      {isMobile && <MobileNav handleClick={handleClick} />}
    </nav>
  );
}
