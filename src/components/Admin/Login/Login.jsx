/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Admin/Navbar/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import image from "../../../assets/Dashboard/login.png";
import uppist from "../../../assets/uppist2.png";

export default function Login() {
  const [logindetail, setLogindetail] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    axios
      .post("https://api.luround.com/v1/auth/login", data)
      .then(() => {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
        // window.location.reload();
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
        setLoading(false);
      });
  }

  return (
    <div className={styles.login}>
      <Navbar />
      <div className={styles.login2}>
        <img src={image} alt='' />

        <div className={styles.container}>
          <div className={styles.h3}>
            <img src={uppist} alt='' />
            <h3>AI Chatbot System</h3>
          </div>
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
            <button type='submit' disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
