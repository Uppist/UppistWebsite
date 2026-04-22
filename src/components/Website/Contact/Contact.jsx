/** @format */

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Touch from "./Section1/Touch";
import Experience from "./Request/Experience";
import Matters from "./Request/Matters";
import styles from "./Section1/styles.module.css";

export default function Contact() {
  const location = useLocation();

  const [details, setDetails] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const submit =
    details.name?.trim() &&
    details.company?.trim() &&
    details.email?.trim() &&
    details.phone?.trim().length >= 8 &&
    details.message?.trim();

  return (
    <div className={styles.contact}>
      {location.pathname === "/contact" ? (
        <Touch submit={submit} handleChange={handleChange} details={details} />
      ) : (
        <>
          <Experience
            submit={submit}
            handleChange={handleChange}
            details={details}
          />
          <Matters />
        </>
      )}
    </div>
  );
}
