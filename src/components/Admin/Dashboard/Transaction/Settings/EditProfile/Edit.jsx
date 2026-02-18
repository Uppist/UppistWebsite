/** @format */

import React from "react";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

export default function Edit({ onClose }) {
  const [details, setDetails] = React.useState({
    first_name: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const Update = details.first_name && details.email;

  function handleUpdate() {
    toast.success("Profile updated successfully");
    setLoading(true);

    setTimeout(() => {
      onClose();
      setLoading(false);
    }, 4000);
  }
  return (
    <>
      <div className={styles.edit_svg} onClick={onClose}>
        <svg
          width='26'
          height='26'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M10.2329 4.18414C10.4626 4.423 10.4551 4.80282 10.2163 5.0325L7.06605 8L10.2163 10.9675C10.4551 11.1972 10.4626 11.577 10.2329 11.8159C10.0032 12.0547 9.62339 12.0622 9.38452 11.8325L5.78452 8.4325C5.66688 8.31938 5.60039 8.16321 5.60039 8C5.60039 7.83679 5.66688 7.68062 5.78452 7.5675L9.38452 4.1675C9.62339 3.93782 10.0032 3.94527 10.2329 4.18414Z'
            fill='currentColor'
            fill-opacity='0.8'
          />
        </svg>
        <span>Edit Profile</span>
      </div>
      <div className={styles.input_edit}>
        <p>Update your profile</p>

        <div className={styles.input_field}>
          <div>
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              name='first_name'
              placeholder='e.g Sarah Ossai'
              id='first_name'
              value={details.first_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              placeholder='e.g sarah.ossai@uppist.com'
              name='email'
              value={details.email}
              onChange={handleChange}
              id='email'
            />
          </div>

          <button disabled={!Update} onClick={handleUpdate}>
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
      <ToastContainer className={styles.toast} />
    </>
  );
}
