/** @format */
import React from 'react';
import styles from './Creative.module.css';
import people2 from './Creative-assets/people2.png';
import tickIcon from './Creative-assets/tickIcon2.svg';

const Creative = () => {
  return (
    <>
      <section className={styles.creative}>
        <h1 className={styles.creativeTitle}>Creative & Digital Marketing</h1>
        <div className={styles.creativeContainer}>
          <img src={people2} alt="Uppist Team" className={styles.creativeImage} />
          <div className={styles.creativeText}>
            <p className={styles.creativeDescription}>
                Customer needs are evolving. Helping businesses keep up with change is at the heart of what we do. As a
                results-driven digital marketing and technology firm in Nigeria, we help businesses:
            </p>
            <div className={styles.creativeBox}>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Build strong and recognizable brand identities.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Launch engaging websites and apps and software products.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Connect authentically with their target audience.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Drive real growth through digital marketing campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.creativeContent}>
          <p>
            We don’t just build websites or apps, we build solutions designed to grow your business, increase
            visibility, and make your brand stand out.
          </p>
        </div>
      </section>
    </>
  );
};

export default Creative;
