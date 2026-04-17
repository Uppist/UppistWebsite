/** @format */

import React from "react";
import styles from "./styles.module.css";
import image from "../../../../assets/Website_images/Home/platform.svg";
import check from "../../../../assets/Website_images/Home/check.svg";
export default function Platform() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "AI Customer Support Agents", img: check },
    { text: "Omnichannel Messaging Hub", img: check },
    { text: "Unified Support Dashboard", img: check },
    { text: "Smart Escalation to Human Agents", img: check },
    { text: "Advanced Analytics & Insights", img: check },
  ];
  return (
    <div className={styles.customer}>
      {mobile && (
        <div>
          {" "}
          <h2>The Uppist AI Platform</h2>
          <span>
            A powerful, unified system for managing customer conversations.
          </span>
        </div>
      )}
      <img src={image} alt='' />

      <div>
        {!mobile && <h2>The Uppist AI Platform</h2>}
        {!mobile && (
          <span>
            A powerful, unified system for managing customer conversations.
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
    </div>
  );
}
