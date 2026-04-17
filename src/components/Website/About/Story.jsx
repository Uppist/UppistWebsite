/** @format */

import React from "react";
import styles from "./styles.module.css";
import styles2 from "../Product/Section1/styles.module.css";
import image from "../../../assets/Website_images/about/img1.svg";
import styles3 from "../Home/Section2/styles.module.css";
import mission1 from "../../../assets/Website_images/about/mission.svg";
import vision from "../../../assets/Website_images/about/mission.svg";

export default function Story() {
  const mobile = window.innerWidth <= 999;

  const mission = [
    {
      img: mission1,
      h4: "Our Mission",
      span: "To enable enterprises to deliver fast, intelligent, and scalable customer support using AI.",
    },
    {
      img: vision,
      h4: "Our Vision",
      span: "To become the leading AI infrastructure powering customer conversations across Africa and emerging markets.",
    },
  ];
  return (
    <div className={styles.story}>
      <div className={styles2.div1}>
        <h2>About Uppist</h2>
        <span>
          Uppist AI is building the future of enterprise customer communication.
        </span>
      </div>

      <div className={styles3.customer}>
        {mobile && (
          <div>
            {" "}
            <h2>Our Story</h2>
          </div>
        )}
        <img src={image} alt='' />

        <div>
          {!mobile && <h2>Our Story</h2>}

          <p>
            Since 2021, Uppist has been helping organizations improve business
            outcomes with technology.
          </p>
          <p>
            As demand for automation has grown in recent times, we have evolved
            into a full-scale AI platform — designed to power customer
            conversations at enterprise scale.
          </p>
          <p>
            Today, we operate from Lagos, Nigeria, serving high-growth
            businesses across emerging markets.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {mission.map((data) => (
          <div className={styles.container}>
            <img src={data.img} alt='' />
            <h4>{data.h4}</h4>
            <span>{data.span}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
