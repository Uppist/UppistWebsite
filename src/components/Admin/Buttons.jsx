/** @format */

import React, { useEffect } from "react";
import styles from "./style.module.css";
import back from "../../assets/back.svg";
import forward from "../../assets/forward.svg";

export default function Buttons({ currentPage, setCurrentPage, totalPages }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <button
          className={styles.back}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <img src={back} alt="back" /> Back
        </button>

        <div className={styles.pages}>
          {pages.map((p) => (
            <button
              key={p}
              className={currentPage === p ? styles.active : undefined}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className={styles.next}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next <img src={forward} alt="next" />
        </button>
      </div>
    </div>
  );
}
