/** @format */

import React, { useEffect } from "react";
import styles from "./style.module.css";
import back from "../../assets/back.svg";
import forward from "../../assets/forward.svg";

export default function Buttons({ currentPage, setCurrentPage, totalPages }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const getPaginationRange = () => {
    const delta = 1;
    const range = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");

    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className={styles.buttons}>
      <div className={styles.pageInfo}>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <div className={styles.pageButtons}>
        {paginationRange.map((page, idx) => (
          <button
            key={idx}
            disabled={page === "..."}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => {
              if (page !== "...") setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
      <div className={styles.navigation}>
        <button
          className={styles.previous}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <img src={back} alt='' />
          Previous
        </button>
        <button
          className={styles.next}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <img src={forward} alt='' />
        </button>
      </div>
    </div>
  );
}
