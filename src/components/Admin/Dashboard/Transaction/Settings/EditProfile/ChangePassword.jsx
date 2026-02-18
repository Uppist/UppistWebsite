/** @format */

import React from "react";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChangePassword({ onClose }) {
  const [loading, setLoading] = React.useState(false);
  function ForgotPassword() {
    toast.success("A link has been sent. Kindly check your email");
  }

  const [passwords, setPasswords] = React.useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  function handleChange(e) {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const Submit =
    passwords.current_password &&
    passwords.new_password &&
    passwords.confirm_password;

  function handleSubmit() {
    toast.success("Password updated successfully");
    setLoading(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.password_label}>
        <svg
          onClick={onClose}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.75806 17.2428L12.0011 11.9998L17.2441 17.2428M17.2441 6.75684L12.0001 11.9998L6.75806 6.75684'
            stroke='currentColor'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>

        <div className={styles.password_input}>
          <label htmlFor=''>Change Password</label>
          <div className={styles.password_div}>
            <div>
              <label htmlFor='current'>Current Password</label>
              <input
                type='password'
                name='current_password'
                value={passwords.current_password}
                onChange={handleChange}
                id=''
              />
              <span onClick={ForgotPassword}>Forgot Password</span>
            </div>
            <div>
              <label htmlFor='new'>New Password</label>
              <input
                type='password'
                name='new_password'
                value={passwords.new_password}
                onChange={handleChange}
                id=''
              />
            </div>
            <div>
              <label htmlFor='confirm'>Confirm Password</label>
              <input
                type='password'
                name='confirm_password'
                value={passwords.confirm_password}
                onChange={handleChange}
                id=''
              />
            </div>

            <button disabled={!Submit} onClick={handleSubmit}>
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>{" "}
      <ToastContainer className={styles.toast} />
    </div>
  );
}
