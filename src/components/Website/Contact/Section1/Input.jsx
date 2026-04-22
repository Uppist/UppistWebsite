/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

export default function Input({ handleChange, details, submit }) {
  const location = useLocation();

  const demo =
    details.name?.trim() &&
    details.company?.trim() &&
    details.email?.trim() &&
    details.phone?.trim().length >= 8;

  return (
    <div className={styles.div}>
      <div className={styles.details}>
        <div>
          <label htmlFor='Name'>Name</label>
          <input
            type='text'
            name='name'
            value={details.name}
            onChange={handleChange}
            placeholder='Your Name'
            id=''
          />
        </div>
        <div>
          {" "}
          <label htmlFor='Company'>Company</label>
          <input
            type='text'
            name='company'
            value={details.company}
            onChange={handleChange}
            placeholder='company name'
            id=''
          />
        </div>
      </div>
      <div className={styles.details}>
        <div>
          <label htmlFor='Email'>Email</label>
          <input
            type='email'
            name='email'
            value={details.email}
            onChange={handleChange}
            placeholder='you@company.com'
            id=''
          />
        </div>
        <div>
          {" "}
          <label htmlFor='Phone'>Phone</label>
          <input
            type='tel'
            name='phone'
            value={details.phone}
            onChange={handleChange}
            placeholder='+234...'
            id=''
          />
        </div>
      </div>

      {location.pathname === "/contact" && (
        <div className={styles.message}>
          <label htmlFor='Message'>Message</label>
          <textarea
            name='message'
            id=''
            value={details.message}
            onChange={handleChange}
            placeholder='tell us about your needs'
          />
        </div>
      )}

      <button
        type='button'
        disabled={location.pathname === "/contact" ? !submit : !demo}
      >
        {location.pathname === "/contact" ? "Submit" : "Schedule a Demo"}
      </button>
    </div>
  );
}
