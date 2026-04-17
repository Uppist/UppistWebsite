/** @format */

import React from "react";
import check from "../../../../assets/Website_images/Home/check.svg";
import styles2 from "../../Product/Section1/styles.module.css";
import styles3 from "../../Home/Section2/styles.module.css";
import styles from "./styles.module.css";
import mark from "../../../../assets/Website_images/pricing/mark.svg";
import img2 from "../../../../assets/Website_images/pricing/img1.svg";

export default function Flexible() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Number of customer conversations", img: check },
    { text: "AI automation usage", img: check },
    { text: "Number of support agents", img: check },
    { text: "Enterprise integrations", img: check },
  ];

  const starter = [
    {
      h4: "Starter",
      span: "For growing teams beginning with AI automation.",
      img: mark,
      li1: "Basic AI support",
      li2: "Limited channels",
      li3: "Standard dashboard",
    },
    {
      h4: "Growth",
      span: "For mid-sized organizations scaling customer operations.",
      img: mark,
      li1: "Advanced AI automation",
      li2: "Omnichannel support",
      li3: "Analytics and reporting",
    },
    {
      h4: "Enterprise",
      span: "For large organizations with complex needs.",
      img: mark,
      li1: "Full AI automation capabilities",
      li2: "Custom integrations",
      li3: "Dedicated support",
      li4: "Scalable infrastructure",
    },
  ];
  return (
    <div className={styles.flexible}>
      <div className={styles2.div1}>
        <h2>Flexible Pricing for Enterprise Scale</h2>
        <span>
          Uppist AI offers a scalable pricing model designed to grow with your
          business.
        </span>
      </div>
      <div className={styles3.customer}>
        {mobile && (
          <div>
            {" "}
            <h2>How Pricing Works</h2>
            <span>Our pricing is based on:</span>
          </div>
        )}
        <img src={img2} alt='' />

        <div>
          {!mobile && <h2>How Pricing Works</h2>}
          {!mobile && <span>Our pricing is based on:</span>}

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
      </div>

      <div className={styles.grid}>
        {starter.map((data) => (
          <div className={styles.data}>
            <h4>{data.h4}</h4>
            <span>{data.span}</span>

            <div className={styles.list}>
              <ul>
                <li>
                  <img src={data.img} alt='' />
                  {data.li1}
                </li>
                <li>
                  {" "}
                  <img src={data.img} alt='' />
                  {data.li2}
                </li>
                <li>
                  {" "}
                  <img src={data.img} alt='' />
                  {data.li3}
                </li>
                <li>
                  {" "}
                  <img src={data.img} alt='' />
                  {data?.li4}
                </li>
              </ul>
            </div>

            <button type='button'>Get a Quote</button>
          </div>
        ))}
      </div>
    </div>
  );
}
