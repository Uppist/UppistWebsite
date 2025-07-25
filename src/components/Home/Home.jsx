/** @format */
import React from 'react';
import styles from './Home.module.css';
import man from '../../assets/man.png';
import people from './Home-assets/people2.png'
import tick1 from './Home-assets/tick1.svg';
import tick2 from './Home-assets/tick2.svg';
import hand from './Home-assets/hand.jpg';

const Home = () => {
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.content}>
          <h1>
            Empowering Brands and Businesses with{' '}
            <span className={styles.highlight}>Digital Marketing, Brand Design</span>{' '}
            and <span className={styles.highlight}>Technology</span>.
          </h1>
          <p>
            Our expert services in digital marketing, brand identity design and technology development help 
            position you as an authority in your industry, attract the right audience, and generate high-quality leads.
          </p>
          <button className={styles.cta}>Let’s Get Started →</button>
        </div>
        <div className={styles.imageContainer}>
          <img src={man} alt="Smiling man" />
        </div>
      </section>
      <section className={styles.people}>
        <div className={styles.peopleImage}>
          <img src={people} alt="Team collaboration" />
        </div>
        <div className={styles.peopleContent}>
          <h2 className={styles.peopleTitle}>Who We Are</h2>
          <p className={styles.peopleText}>
            Uppist is a forward-thinking firm committed to helping brands succeed in today's digital-first world. <br /> <br />
            Through our offerings in creative and digital marketing, as well as technology development, we enable businesses in Nigeria and beyond unlock new
          </p> <br />
          <button className={styles.peopleCta}>Learn More →</button>
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <div className={styles.missionColumn}>
            <img src={tick1} alt="Mission tick" className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              To elevate the human potential through first-class professional services and technology. <br />
              We aim to empower people and businesses to do more, achieve more, and grow beyond limits. <br />
              By combining expert professional services with innovative technology, we help unlock new opportunities and transform everyday digital challenges into success.
            </p>
          </div>
          <div className={styles.missionColumn}>
            <img src={tick2} alt="Vision tick" className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Our Vision</h2>
            <p className={styles.missionText}>
              To be a distinguished global business conglomerate, designing cutting-edge products and services that transform the human experience.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;