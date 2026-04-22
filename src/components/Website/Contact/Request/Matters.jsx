/** @format */

import React from "react";
// import styles2 from "../../Product/Section1/styles.module.css";
// import Input from "../Section1/Input";
import styles3 from "../../Home/Section2/styles.module.css";
import check from "../../../../assets/Website_images/Home/check.svg";
import img2 from "../../../../assets/Website_images/contact/img2.svg";

export default function Matters() {
  const mobile = window.innerWidth <= 999;
  const result = [
    { text: "Respond instantly to customers", img: check },
    { text: "Reduce support costs", img: check },
    { text: "Scale operations without growing your team", img: check },
  ];

  return (
    <div>
      <img src='' alt='' />
      <div className={styles3.customer}>
        {mobile && (
          <div>
            {" "}
            <h2>Why It Matters</h2>
            <span>Uppist AI enables you to:</span>
          </div>
        )}
        <img src={img2} alt='' />

        <div>
          {!mobile && <h2>Why It Matters</h2>}
          {!mobile && <span>Uppist AI enables you to:</span>}

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
