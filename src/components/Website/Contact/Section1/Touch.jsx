/** @format */

import React from "react";
import styles from "./styles.module.css";
import styles2 from "../../Product/Section1/styles.module.css";
import img from "../../../../assets/Website_images/contact/img1.svg";
import Input from "./Input";
export default function Touch({ submit, handleChange, details }) {
  return (
    <div className={styles.touch}>
      <div className={styles2.div1}>
        <h2>Get In Touch</h2>
        <span>
          We’d love to learn more about your business and how Uppist AI can
          help.{" "}
        </span>
      </div>

      <div className={styles.container}>
        <img src={img} alt='' />

        <Input details={details} handleChange={handleChange} submit={submit} />
      </div>
    </div>
  );
}
