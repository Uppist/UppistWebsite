/** @format */

import React from "react";
import styles from "./styles.module.css";
import image from "../../../../assets/Website_images/Home/enterprise.svg";
import check from "../../../../assets/Website_images/Home/check.svg";

export default function Enterprise() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Banking and financial services", img: check },
    { text: "Healthcare providers", img: check },
    { text: "Logistics and transportation companies", img: check },
    { text: "High-growth digital platforms", img: check },
  ];
  return (
    <div className={styles.customer}>
      {mobile && (
        <div>
          {" "}
          <h2>Built for Modern Enterprises</h2>
          <span>
            Uppist is designed for organizations that handle high volumes of
            customer interactions:
          </span>
        </div>
      )}

      <div>
        {!mobile && <h2>Built for Modern Enterprises</h2>}
        {!mobile && (
          <span>
            Uppist is designed for organizations that handle high volumes of
            customer interactions:
          </span>
        )}

        <div>
          <div className={styles.result}>
            {result.map((data, index) => (
              <div key={index}>
                <img src={data.img} alt='' />
                <span>{data.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img src={image} alt='' />
    </div>
  );
}
