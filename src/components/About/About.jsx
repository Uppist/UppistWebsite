/** @format */
import React, { useEffect } from 'react';
import styles from './About.module.css';
import people2 from '../Home/Home-assets/people2.png'; // Import image
import tickIcon from './About-assets/tickIcon2.svg'; // Import icon
import tick1 from '../Home/Home-assets/tick1.svg';
import tick2 from '../Home/Home-assets/tick2.svg';

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section className={styles.about}>
        <h1 className={styles.aboutTitle}>Who We Are</h1>
        <div className={styles.aboutContainer}>
          <img src={people2} alt="Uppist Team" className={styles.aboutImage} />
          <div className={styles.aboutText}>
            <p className={styles.aboutDescription}>
              Uppist is a forward-thinking firm committed to helping brands succeed in today's digital-first world.
              <br /> <br />
              We bring together strategy, design, marketing, and technology services to help businesses:
            </p>
            <div className={styles.missionBox}>
              <div className={styles.missionItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.missionText}>
                  Build strong and recognizable brand identities.
                </p>
              </div>
              <div className={styles.missionItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.missionText}>
                  Launch engaging websites and apps and software products.
                </p>
              </div>
              <div className={styles.missionItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.missionText}>
                  Connect authentically with their target audience.
                </p>
              </div>
              <div className={styles.missionItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.missionText}>
                  Drive real growth through digital marketing campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.missionContent}>
          <p>
            We don’t just build websites or apps, we build solutions designed to grow your business, increase
            visibility, and make your brand stand out.
          </p>
        </div>
      </section>

      <section className={styles.mission2}>
        <div className={styles.missionContent2}>
          <div className={styles.missionColumn2}>
            <img src={tick1} alt="Mission tick" className={styles.missionIcon2} />
            <h2 className={styles.missionTitle2}>Our Mission</h2>
            <p className={styles.missionText2}>
              To elevate the human potential through first-class professional services and technology. <br /> <br />
              We aim to empower people and businesses to do more, achieve more, and grow beyond limits. <br /> <br />
              By combining expert professional services with innovative technology, we help unlock new opportunities
              and transform everyday digital challenges into success.
            </p>
          </div>
          <div className={styles.missionColumn2}>
            <img src={tick2} alt="Vision tick" className={styles.missionIcon2} />
            <h2 className={styles.missionTitle2}>Our Vision</h2>
            <p className={styles.missionText2}>
              To be a distinguished global business conglomerate, designing cutting-edge products and services that
              transform the human experience.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.mission3}>
        <div>
          <h1> </h1>
        </div>
      </section>
    </>
  );
};

export default About;
