/** @format */
import React, { useState } from 'react';
import styles from './Case.module.css';

// Sample images and icon
import companyImage1 from './Case-assets/company1.png'; // Image for Cobalt Industries
import companyImage2 from './Case-assets/company2.png'; // Image for Roothe-Kharis
import yellowIcon from './Case-assets/yellowIcon.svg'; // Yellow icon

const CaseCard = ({ title, description, onSeeMore, isExpanded, image, expandedContent }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.caseCard}>
        <img src={image} alt="Company Logo" className={styles.cardImage} />
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
            <h2 className={styles.cardTitle}>{title}</h2>
          </div>
          <p className={styles.cardDescription}>{description}</p>
          <div className={styles.faintLine}></div>
          {!isExpanded && (
            <div className={styles.buttonContainer}>
              <button className={styles.seeMoreButton} onClick={onSeeMore}>
                See More
              </button>
            </div>
          )}
        </div>
      </div>
      {isExpanded && expandedContent && (
        <div className={`${styles.caseCard} ${styles.expandedCard} ${styles.fadeInOut}`}>
          <div className={styles.cardContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Challenges</h3>
              <p className={styles.sectionDescription}>{expandedContent.challenges}</p>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Solution</h3>
              <p className={styles.sectionDescription}>{expandedContent.solution}</p>
            </div>
            <div className={styles.faintLine}></div>
            <div className={styles.buttonContainer}>
              <button className={styles.seeLessButton} onClick={() => onSeeMore(null)}>
                See Less
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Case = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleSeeMore = (title, description, challenges, solution) => {
    if (expandedCard?.title === title) {
      setExpandedCard(null); // Close if clicking the same card
    } else {
      setExpandedCard({ title, description, challenges, solution }); // Open new card, close others
    }
  };

  return (
    <section className={styles.case}>
      <h1 className={styles.caseTitle}>Case Study</h1>
      <div className={styles.caseContainer}>
        <CaseCard
          title="Cobalt Industries"
          description="Cobalt Industries is a dynamic service provider that is committed to shaping the future of key sectors in Nigeria and beyond with a vision to empower ventures and communities that unlock shared value."
          image={companyImage1}
          onSeeMore={() =>
            handleSeeMore(
              "Cobalt Industries",
              "Helped Cobalt Industries boost their online presence with a custom digital marketing strategy.",
              "They needed a website that not only served as digital proof but also told their story and what they stand for.",
              "Uppist developed a clean, responsive and mobile-friendly website that made it easy for potential clients and partners to find them and explore their offerings."
            )
          }
          isExpanded={expandedCard?.title === "Cobalt Industries"}
          expandedContent={expandedCard?.title === "Cobalt Industries" ? expandedCard : null}
        />
        <CaseCard
          title="Roothe-Kharis and Partners"
          description="Roothe-Kharis & Partners is a Lagos-based legal firm offering tailored legal solutions that support the growth of businesses through innovation, sustainable practices, and global standards."
          image={companyImage2}
          onSeeMore={() =>
            handleSeeMore(
              "Roothe-Kharis and Partners",
              "Enhanced Roothe-Kharis' digital presence with a professional website and targeted marketing.",
              "The firm needed a digital presence that reflected their professional expertise and helped them connect with SMEs and corporate clients. Beyond website design, they also wanted to increase brand awareness and online engagement.",
              "Uppist developed a website tailored to highlight Roothe-Kharis’ practice areas and expertise. We implemented a targeted digital marketing strategy, including branded content and social media campaigns."
            )
          }
          isExpanded={expandedCard?.title === "Roothe-Kharis and Partners"}
          expandedContent={expandedCard?.title === "Roothe-Kharis and Partners" ? expandedCard : null}
        />
      </div>
    </section>
  );
};

export default Case;