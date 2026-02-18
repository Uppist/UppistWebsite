/** @format */

import React from "react";
import styles from "./style.module.css";
import Menu from "./Menu";

export default function UserDetails({ menu, handleClick, setMenu }) {
  return (
    <>
      <div className={styles.input}>
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

        <input type='Search' name='' placeholder='Search here...' id='' />
      </div>
      <div className={styles.div3}>
        <div className={styles.role}>
          <span>Name</span>
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
          <span className={styles.menu}>Menu</span>
        </div>
        <div className={styles.role2}>
          <span>Sarah Osasai</span>
          <span>Sarah</span>
          <span>sarahosasai@gmail.com</span>
          <span>Super Admin</span>
          <Menu menu={menu} handleClick={handleClick} setMenu={setMenu} />
        </div>
      </div>
    </>
  );
}
