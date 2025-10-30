/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Admin/Navbar/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

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
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .post("https://api.luround.com/v1/auth/login", data)
      .then((res) => {
        // console.log("response", res);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 10000);
        // window.location.reload();
      })
      .catch((err) => {
        toast.error("Login failed. Please check your credentials.");
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
              className={styles.input}
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
              className={styles.input}
              value={logindetail.password}
              placeholder='password'
              onChange={(e) => LoginDetail(e)}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
