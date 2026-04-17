/** @format */

import React from "react";
import styles from "./styles.module.css";
import img1 from "../../../../assets/Website_images/solution/img1.jpg";
import img2 from "../../../../assets/Website_images/solution/img2.jpg";
import img3 from "../../../../assets/Website_images/solution/img3.jpg";
import img4 from "../../../../assets/Website_images/solution/img4.jpg";
import img5 from "../../../../assets/Website_images/solution/img5.svg";
import icon1 from "../../../../assets/Website_images/solution/icon1.svg";
import icon2 from "../../../../assets/Website_images/solution/icon2.svg";
import icon3 from "../../../../assets/Website_images/solution/icon3.svg";
import icon4 from "../../../../assets/Website_images/solution/icon4.svg";
import check from "../../../../assets/Website_images/Home/check.svg";

import styles2 from "../../Product/Section1/styles.module.css";
import styles3 from "../../Home/Section2/styles.module.css";

export default function Industries() {
  const industry = [
    {
      icon: icon1,
      img: img1,
      h4: "AI Customer Support Automation",
      span: "Automate customer interactions with intelligent AI agents that understand and respond in real time. Handle common inquiries instantly while reducing response times and operational workload.",
    },
    {
      icon: icon2,
      img: img2,
      h4: "Omnichannel Messaging",
      span: "Engage customers across WhatsApp, website and mobile app live chat, email, SMS, voice, and social messaging platforms. Deliver a seamless experience regardless of where conversations begin.",
    },
    {
      icon: icon3,
      img: img3,
      h4: "Unified Support Dashboard",
      span: "Manage every customer interaction from a single interface. Track conversations, monitor performance, and maintain full visibility across all channels.",
    },
    {
      icon: icon4,
      img: img4,
      h4: "Smart Escalation",
      span: "When human intervention is required, Uppist AI ensures a smooth transition. AI identifies complex cases and escalates them to support agents with full context.",
    },
  ];

  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Manage high volumes of customer interactions", img: check },
    { text: "Improve response speed", img: check },
    { text: "Reduce operational complexity", img: check },
  ];
  return (
    <div className={styles.industry}>
      <div className={styles2.div1}>
        <h2>Solutions for High-Volume Industries</h2>
        <span>
          Uppist AI is built for organizations where customer communication is
          critical to operations.
        </span>
      </div>
      <div className={styles.container}>
        {industry.map((data) => (
          <div className={styles.container1}>
            <img src={data.img} alt='' />
            <div>
              <img src={data.icon} alt='' />
              <h4>{data.h4}</h4>
              <span>{data.span}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles3.customer}>
        {mobile && (
          <div>
            {" "}
            <h2>Built for Scale</h2>
            <span>No matter your industry, Uppist AI enables you to:</span>
          </div>
        )}
        <img src={img5} alt='' />

        <div>
          {!mobile && <h2>Built for Scale</h2>}
          {!mobile && (
            <span>No matter your industry, Uppist AI enables you to:</span>
          )}

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
    </div>
  );
}
