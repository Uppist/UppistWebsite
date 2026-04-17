/** @format */

import React from "react";
import styles from "./styles.module.css";
import img from "../../../assets/Website_images/about/img2.svg";
import check from "../../../assets/Website_images/Home/check.svg";

export default function Believe() {
  const list = [
    { img: check, span: "Customer experience is a competitive advantage" },
    { img: check, span: "AI is the future of customer operations" },
    { img: check, span: "Scalability should not come at the cost of quality" },
  ];
  return (
    <div className={styles.believe}>
      <div className={styles.div}>
        <h2>What We Believe</h2>
        <div className={styles.div1}>
          {list.map((data) => (
            <div>
              <img src={data.img} alt='' />
              <span>{data.span}</span>
            </div>
          ))}
        </div>
      </div>

      <img src={img} alt='' />
    </div>
  );
}
