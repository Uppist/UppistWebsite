/** @format */

import React, { useState } from "react";
import styles from "./style.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function AddUser({ onClose }) {
  const [addrole, setAddRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Add role");
  const [email, setEmail] = useState("");

  const Role = ["Super Admin", "Manager", "Live Agent"];

  function handleClick(item) {
    setSelectedRole(item);
    setAddRole(false);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function Send() {
    toast.success("New agent added successfully");

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  const disabledLink = email.trim() !== "" && selectedRole !== "Add role";

  return (
    <div className={styles.dropdown}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.adduser}>
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
            stroke='#1D2E2E'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>

        <div className={styles.container}>
          <h3>Add New User</h3>
          <span>
            To add new user, input their email address in the space provided
            below, a link would be sent to them to create an account.
          </span>
          <div className={styles.div1}>
            <div className={styles.email}>
              <label htmlFor=''>Email Address</label>
              <input
                type='email'
                placeholder='new user email address'
                name='email'
                value={email}
                onChange={handleEmail}
                id=''
              />
            </div>
            <div className={styles.email}>
              <label htmlFor=''>Role</label>
              <div className={styles.role} onClick={() => setAddRole(!addrole)}>
                {selectedRole}{" "}
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.34521 7.27367L8.8574 13.4028C9.49915 14.0068 10.5002 14.0068 11.142 13.4028L17.6541 7.27367C17.9893 6.95824 18.0053 6.43084 17.6898 6.0957C17.3744 5.76055 16.847 5.74457 16.5119 6.06L9.99968 12.1891L3.48748 6.06C3.15234 5.74457 2.62494 5.76055 2.30951 6.09569C1.99408 6.43084 2.01006 6.95823 2.34521 7.27367Z'
                    fill='#2B2B2B'
                    fill-opacity='0.8'
                  />
                </svg>
              </div>

              {addrole && (
                <div className={styles.addrole}>
                  {Role.map((data, index) => (
                    <span key={index} onClick={() => handleClick(data)}>
                      {data}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={Send} disabled={!disabledLink}>
            Send Link
          </button>
        </div>
      </div>
      <ToastContainer className={styles.toast} />
    </div>
  );
}
