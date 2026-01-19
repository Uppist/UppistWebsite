/** @format */

import React from "react";
import styles from "./style.module.css";
import Menu from "./Menu";

export default function MobileSettings({ menu, handleClick, setMenu }) {
  const [seeMore, setSeeMore] = React.useState(false);
  function handleMore() {
    setSeeMore((prev) => !prev);
  }
  return (
    <div className={styles.mobileSettings}>
      <div className={styles.header}>
        <div className={styles.user}>
          <span>Sarah Ossai</span>
          <Menu menu={menu} handleClick={handleClick} setMenu={setMenu} />
        </div>
        {seeMore && (
          <div className={styles.userDetails}>
            <div className={styles.detail}>
              <p>Username:</p>
              <span>Sarah Collins</span>
            </div>
            <div className={styles.detail}>
              <p>Email:</p>
              <span>sarahcollins@gmail.com</span>
            </div>
            <div className={styles.detail}>
              <p>Role:</p>
              <span>Live Agent</span>
            </div>
            <div className={styles.detail}></div>
          </div>
        )}
        <button type='button' onClick={handleMore}>
          See More
        </button>
      </div>
    </div>
  );
}
