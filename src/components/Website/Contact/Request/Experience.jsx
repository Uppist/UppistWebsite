/** @format */

import React from "react";
import styles2 from "../../Product/Section1/styles.module.css";
import Input from "../Section1/Input";
import styles3 from "../../Home/Section2/styles.module.css";
import styles from "./styles.module.css";
import check from "../../../../assets/Website_images/Home/check.svg";

export default function Experience({ submit, details, handleChange }) {
  const result = [
    { text: "How AI handles customer inquiries in real time", img: check },
    { text: "How conversations are managed across channels", img: check },
    { text: "How your team can monitor and control interactions", img: check },
    {
      text: "How automation reduces workload and improves efficiency",
      img: check,
    },
  ];
  return (
    <div className={styles.experience}>
      <div className={styles2.div1}>
        <h2>See Uppist in Action</h2>
        <span>
          Discover how Uppist transforms customer support into a scalable,
          AI-powered operation.
        </span>
      </div>

      <div className={styles3.customer}>
        <div>
          <h2>What You’ll Experience</h2>
          <span>During your demo, you’ll see:</span>

          <div>
            {" "}
            <div className={styles3.result}>
              {result.map((data, index) => (
                <div key={index}>
                  <img src={data.img} alt='' />
                  <span>{data.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Input submit={submit} details={details} handleChange={handleChange} />
      </div>
    </div>
  );
}
