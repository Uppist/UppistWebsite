/** @format */

import React from "react";
import styles from "../Dashboard/Transaction/Settings/AddUser/style.module.css";
import { toast, ToastContainer } from "react-toastify";

export default function Reassign({ onClose }) {
  const [addrole, setAddRole] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState("Add role");

  function handleClick(item) {
    setSelectedRole(item);
    setAddRole(false);
  }
  function Send() {
    toast.success("Chat assigned successfully");

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  const disabledLink = selectedRole !== "Add role";

  const Role = ["Super Admin", "Manager", "Live Agent"];
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
          <h3>Assign New Agent</h3>
          <span>
            To assign new agent, select an agent from below, the chat will
            forwarded to another agent.
          </span>
          <div className={styles.div1}>
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
            Assign
          </button>
        </div>
      </div>
      <ToastContainer className={styles.toast} />
    </div>
  );
}
