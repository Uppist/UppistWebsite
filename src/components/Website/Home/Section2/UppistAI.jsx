/** @format */

import React from "react";
import styles from "./styles.module.css";
import image from "../../../../assets/Website_images/Home/ai.svg";
import check from "../../../../assets/Website_images/Home/check.svg";

export default function UppistAI() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Respond instantly with AI-powered automation", img: check },
    {
      text: "Manage conversations across all channels in one place",
      img: check,
    },
    { text: "Reduce support costs while improving performance", img: check },
    {
      text: "Scale customer engagement without expanding your team",
      img: check,
    },
  ];
  return (
    <div className={styles.customer}>
      {mobile && (
        <div>
          {" "}
          <h2>Meet Uppist AI</h2>
          <span>One Platform. Every Customer Conversation.</span>
        </div>
      )}

      <div>
        {!mobile && <h2>Meet Uppist AI</h2>}
        {!mobile && <span>One Platform. Every Customer Conversation.</span>}
        <p>
          Uppist is an AI-powered omnichannel customer support platform designed
          for enterprise organizations
        </p>

        <div>
          <span>We help you:</span>
          <div className={styles.result}>
            {result.map((data, index) => (
              <div key={index}>
                <img src={data.img} alt='' />
                <span>{data.text}</span>
              </div>
            ))}
          </div>
          <span>
            Support 10x more customers — without increasing headcount.
          </span>
        </div>
      </div>

      <img src={image} alt='' />
    </div>
  );
}
