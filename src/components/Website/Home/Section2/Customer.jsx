/** @format */

import React from "react";
import styles from "./styles.module.css";
import image from "../../../../assets/Website_images/Home/customer.svg";
import check from "../../../../assets/Website_images/Home/check.svg";

export default function Customer() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Delayed responses", img: check },
    { text: "Inconsistent customer experiences", img: check },
    { text: "Rising operational costs", img: check },
    { text: "Limited scalability", img: check },
  ];
  return (
    <div className={styles.customer}>
      {mobile && (
        <div>
          {" "}
          <h2>Customer Support is Broken at Scale</h2>
          <span>Today’s customers expect instant, seamless communication.</span>
        </div>
      )}
      <img src={image} alt='' />

      <div>
        {!mobile && <h2>Customer Support is Broken at Scale</h2>}
        {!mobile && (
          <span>Today’s customers expect instant, seamless communication.</span>
        )}
        <p>
          But most enterprises are still managing customer support through
          disconnected systems, slow workflows, and large human teams.
        </p>

        <div>
          <span>The result:</span>
          <div className={styles.result}>
            {result.map((data, index) => (
              <div key={index}>
                <img src={data.img} alt='' />
                <span>{data.text}</span>
              </div>
            ))}
          </div>
          <span>This model no longer works in a digital-first world.</span>
        </div>
      </div>
    </div>
  );
}
