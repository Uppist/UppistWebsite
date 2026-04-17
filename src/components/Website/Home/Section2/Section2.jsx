/** @format */

import React from "react";
import Customer from "./Customer";
import UppistAI from "./UppistAI";
import Built from "./Built";
import styles from "./styles.module.css";
import Platform from "./Platform";
import Enterprise from "./Enterprise";

export default function Section2() {
  return (
    <section className={styles.section2}>
      <Customer />
      <UppistAI />
      <Built />
      <Platform />
      <Enterprise />
    </section>
  );
}
