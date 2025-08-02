/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Admin/Navbar/Navbar";

export default function Login() {
  const [logindetail, setLogindetail] = useState({
    email: "",
    password: "",
  });
  const data = {
    email: logindetail.email,
    password: logindetail.password,
  };
  function LoginDetail(e) {
    setLogindetail({ ...logindetail, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    if (!logindetail.email || !logindetail.password) {
      alert("Please fill in all fields");
      return;
    }
    axios.post("https://api.luround.com/v1/auth/login", data).then((res) => {
      // console.log("response", res);
      alert("Login successful");
      navigate("/dashboard");
      window.location.reload();
    });
  }

  return (
    <div className={styles.login}>
      <Navbar />
      <div className={styles.container}>
        <label htmlFor=''>Log into account</label>
        <form className={styles.form} onSubmit={Submit}>
          <div>
            <span>Email Address</span>
            <input
              type='email'
              name='email'
              value={logindetail.email}
              placeholder='Email address'
              onChange={(e) => LoginDetail(e)}
            />
          </div>
          <div>
            <span>Password</span>
            <input
              type='password'
              name='password'
              id=''
              value={logindetail.password}
              placeholder='password'
              onChange={(e) => LoginDetail(e)}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
