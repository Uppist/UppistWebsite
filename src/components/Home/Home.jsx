/** @format */

// src/Home/Home.jsx
import React from 'react';
import styles from './Home.module.css';
import man from '../../assets/man.png';

const Home = () => {
  return (
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
  );
};

export default Home;
