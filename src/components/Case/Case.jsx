/** @format */
import React, { useState } from 'react';
import styles from './Case.module.css';

// Sample images and icon
import companyImage1 from './Case-assets/company1.png'; // Image for Cobalt Industries
import companyImage2 from './Case-assets/company2.png'; // Image for Roothe-Kharis
import companyImage3 from './Case-assets/company3.png'; // Image for First and Last Wellness
import companyImage4 from './Case-assets/company4.png'; // Image for October Orange Initiative
import companyImage5 from './Case-assets/company5.png'; // Image for The BroomApp
import companyImage6 from './Case-assets/company6.png'; // Image for Squaredlab Advisory Services
import companyImage7 from './Case-assets/company7.png'; // Image for IRETIHUB AFRICA
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
        <CaseCard
          title="First and Last Wellness"
          description="First & Last Wellness is committed to empowering businesses with better productivity. They equip organizations with best practices that promote employee welfare in order to contribute to productivity."
          image={companyImage3}
          onSeeMore={() =>
            handleSeeMore(
              "First and Last Wellness",
              "Positioned First and Last Wellness as a trustworthy brand with a vibrant identity and website.",
              "They needed a brand identity and a website to clearly communicate their concerns, showcase expertise, and attract potential clients.",
              "Uppist developed a clean, vibrant visual identity, as well as a responsive website that helps to position First and Last Wellness as a trustworthy brand."
            )
          }
          isExpanded={expandedCard?.title === "First and Last Wellness"}
          expandedContent={expandedCard?.title === "First and Last Wellness" ? expandedCard : null}
        />
        <CaseCard
          title="October Orange Initiative"
          description="October Orange Initiative is a nonprofit focused on making significant contributions to communities with daunting challenges through T. E. A. C. H. (Technology, Education, Art, Charitable Trust, and Healthcare)"
          image={companyImage4}
          onSeeMore={() =>
            handleSeeMore(
              "October Orange Initiative",
              "Positioned First and Last Wellness as a trustworthy brand with a vibrant identity and website.",
              "OOI had their goals and vision set, but they needed a website help tell their story as well as accept donation payments from donors.",
              "Uppist developed a specialized website and custom-built software tools designed specifically to accept, monitor and report payments from donors."
            )
          }
          isExpanded={expandedCard?.title === "October Orange Initiative"}
          expandedContent={expandedCard?.title === "October Orange Initiative" ? expandedCard : null}
        />
        <CaseCard
          title="The BroomApp"
          description="The Broom App is an innovative platform connecting homeowners and businesses in need of cleaning services with trusted, thoroughly vetted providers and cleaning professionals in Lagos."
          image={companyImage5}
          onSeeMore={() =>
            handleSeeMore(
              "The BroomApp",
              "Launched The Broom App with a complete digital solution.",
              "The Broom App needed a complete digital launch, from brand design to app development.",
              "Uppist helped The Broom App develop its brand identity, website and mobile app. We also implemented a digital marketing strategy to enable a seamless connection with their target audience."
            )
          }
          isExpanded={expandedCard?.title === "The BroomApp"}
          expandedContent={expandedCard?.title === "The BroomApp" ? expandedCard : null}
        />
        <CaseCard
          title="Squaredlab Advisory Services"
          description="SASL helps startups, SMEs, and established companies unlock peak performance by weaving best practices into company culture with a foundation for sustainable growth."
          image={companyImage6}
          onSeeMore={() =>
            handleSeeMore(
              "Squaredlab Advisory Services",
              "Established a trustworthy digital presence for SASL.",
              "They needed a website and social media management to establish a trust-worthy digital presence.",
              "Uppist developed a clean, mobile-friendly website that portrays the brand beautifully and began managing their social media accounts."
            )
          }
          isExpanded={expandedCard?.title === "Squaredlab Advisory Services"}
          expandedContent={expandedCard?.title === "Squaredlab Advisory Services" ? expandedCard : null}
        />
        <CaseCard
          title="IRETIHUB AFRICA"
          description="Ireti Hub provides creative space for urban youth in Nigeria with the skills, training, and mentorship they need to excel in their career."
          image={companyImage7}
          onSeeMore={() =>
            handleSeeMore(
              "IRETIHUB AFRICA",
              "Created a compelling website for IretiHub Africa.",
              "IretiHub Africa needed a website that reflects its vision to be a creative hub where youth in urban areas have access to health and entrepreneurship resources.",
              "Uppist developed a modern, responsive website that captures their vision and tells their story in a compelling manner."
            )
          }
          isExpanded={expandedCard?.title === "IRETIHUB AFRICA"}
          expandedContent={expandedCard?.title === "IRETIHUB AFRICA" ? expandedCard : null}
        />
      </div>
    </section>
  );
};

export default Case;