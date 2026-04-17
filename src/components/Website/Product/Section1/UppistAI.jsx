/** @format */

import React from "react";
import styles from "./styles.module.css";
import image from "../../../../assets/Website_images/product/image1.jpeg";
import icon1 from "../../../../assets/Website_images/product/icon1.svg";
import icon2 from "../../../../assets/Website_images/product/icon2.svg";
import icon3 from "../../../../assets/Website_images/product/icon3.svg";
import icon4 from "../../../../assets/Website_images/product/icon4.svg";
import icon5 from "../../../../assets/Website_images/product/icon5.svg";
import icon6 from "../../../../assets/Website_images/product/icon6.svg";

export default function UppistAI() {
  const support = [
    {
      icon: icon1,
      h4: "AI Customer Support Automation",
      span: "Automate customer interactions with intelligent AI agents that understand and respond in real time. Handle common inquiries instantly while reducing response times and operational workload.",
    },
    {
      icon: icon2,
      h4: "Omnichannel Messaging",
      span: "Engage customers across WhatsApp, website and mobile app live chat, email, SMS, voice, and social messaging platforms. Deliver a seamless experience regardless of where conversations begin.",
    },
    {
      icon: icon3,
      h4: "Unified Support Dashboard",
      span: "Manage every customer interaction from a single interface. Track conversations, monitor performance, and maintain full visibility across all channels.",
    },
    {
      icon: icon4,
      h4: "Smart Escalation",
      span: "When human intervention is required, Uppist AI ensures a smooth transition. AI identifies complex cases and escalates them to support agents with full context.",
    },
    {
      icon: icon5,
      h4: "Analytics & Insights",
      span: "Gain actionable insights into customer behavior, response performance, and support efficiency. Make data-driven decisions to improve customer experience.",
    },
    {
      icon: icon6,
      h4: "Enterprise Integrations",
      span: "Uppist AI integrates seamlessly with your existing systems, including CRM platforms and internal tools.",
    },
  ];
  return (
    <div className={styles.container1}>
      <div className={styles.div1}>
        <h2>Uppist AI</h2>
        <span>
          A complete AI-powered system for managing customer conversations at
          enterprise scale.
        </span>
        <img src={image} alt='' />
      </div>
      <div className={styles.container2}>
        {support.map((data) => (
          <div>
            <img src={data.icon} alt='' />
            <h4>{data.h4}</h4>
            <span>{data.span}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
