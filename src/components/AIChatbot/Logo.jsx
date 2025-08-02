/** @format */

import React, { useState } from "react";
import logo from "../../assets/chatbot.svg";
import styles from "./style.module.css";
import Welcome from "./Welcome";
export default function Logo() {
  const [isWelcome, setIsWelcome] = useState(false);
  const [isChatbot, setIsChatbot] = useState(false);
  // Function to handle click event
  function handleClick() {
    setIsWelcome(true);
  }

  function handleClose() {
    setIsWelcome(false);
  }
  return (
    <>
      {isWelcome ? (
        <Welcome
          handleClose={handleClose}
          isChatbot={isChatbot}
          setIsChatbot={setIsChatbot}
        />
      ) : (
        <div className={styles.logo} onClick={handleClick}>
          <span>
            Chat with <label htmlFor=''> Uppist AI</label>
          </span>
          <img src={logo} alt='' />
        </div>
      )}
    </>
  );
}
