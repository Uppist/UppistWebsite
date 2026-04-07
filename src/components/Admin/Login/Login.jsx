/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";

import Navbar from "../../Admin/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import image from "../../../assets/Dashboard/login.png";
import uppist from "../../../assets/uppist2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [logindetail, setLogindetail] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData] = useState([]);

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
      .post("http://139.162.173.87:2005/api/auth/login", data)
      .then((res) => {
        toast.success("Login successful");
        localStorage.setItem("Token", res.data.token);

        setTimeout(() => {
          // setUserData(res.data);
          navigate("/dashboard");
          console.log(res.data);
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
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
