/** @format */

import React from "react";
import styles from "./styles.module.css";
import icon1 from "../../../../assets/Website_images/Home/icon1.svg";
import icon2 from "../../../../assets/Website_images/Home/icon2.svg";
import icon3 from "../../../../assets/Website_images/Home/icon3.svg";
import icon4 from "../../../../assets/Website_images/Home/icon4.svg";

export default function Built() {
  const enterprise = [
    {
      img: icon1,
      h4: "Instant Responses",
      span: "Deliver real-time replies across every channel.",
    },
    {
      img: icon2,
      h4: "Reduced Costs",
      span: "Automate repetitive inquiries and reducedependency on large support teams.",
    },
    {
      img: icon3,
      h4: "Unified Experience",
      span: "Maintain consistency across all communication touchpoints.",
    },
    {
      img: icon4,
      h4: "Scalable Infrastructure",
      span: "Handle thousands to millions of interactions effortlessly.",
    },
  ];
  return (
    <div className={styles.built}>
      <h2>Built for Enterprise Performance</h2>
      <div className={styles.container}>
        {enterprise.map((data) => (
          <div>
            <img src={data.img} alt='' />
            <h4>{data.h4}</h4>
            <span>{data.span}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
