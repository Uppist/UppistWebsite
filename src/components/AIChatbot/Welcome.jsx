/** @format */

import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import cancel from "../../assets/cancel.svg";
import chatbot from "../../assets/chatbot.svg";
import Chatbot from "./Chatbot";
export default function Welcome({ handleClose, isChatbot, setIsChatbot }) {
  const [logindetail, setLoginDetail] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("user_name"));
    const email = JSON.parse(localStorage.getItem("email"));

    if (name && email) {
      setLoginDetail({ name, email });
      setIsChatbot(true); // Open chatbot directly
    }
  }, []);
  function LoginDetail(e) {
    setLoginDetail({ ...logindetail, [e.target.name]: e.target.value });
  }
  function handleClick() {
    const newErrors = {};

    if (!logindetail.name) {
      newErrors.name = "Name is required.";
    }
    if (!logindetail.email) {
      newErrors.email = "Email address is required.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("user_name", JSON.stringify(logindetail.name));

      localStorage.setItem("email", JSON.stringify(logindetail.email));

      setIsChatbot(true);
    }
  }
  function Close() {
    setIsChatbot(false);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={handleClose}></div>
      {isChatbot ? (
        <Chatbot
          Close={Close}
          handleClose={handleClose}
          logindetail={logindetail}
        />
      ) : (
        <div className={styles.welcome}>
          <div className={styles.header}>
            <div className={styles.header__logo}>
              <img src={logo} alt='' />
              <img
                src={cancel}
                alt=''
                className={styles.cancel}
                onClick={handleClose}
              />
            </div>
            <h2>Hello, how can we help you today? 👋</h2>
          </div>

          <div className={styles.form}>
            <div className={styles.input}>
              <span>Name:</span>
              <div className={styles.name}>
                <input
                  type='text'
                  name='name'
                  id=''
                  value={logindetail.name}
                  onChange={(e) => LoginDetail(e)}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>
            </div>
            <div className={styles.input}>
              <span>Email Address:</span>
              <div className={styles.email}>
                <input
                  type='email'
                  name='email'
                  id=''
                  value={logindetail.email}
                  onChange={(e) => LoginDetail(e)}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.text}>
              <img src={chatbot} alt='' />
              <span>
                Ask all your questions and generate essays, articles, reports,
                success stories & more
              </span>
            </div>
            <button onClick={handleClick}>Chat with us</button>
          </div>
        </div>
      )}
    </div>
  );
}
