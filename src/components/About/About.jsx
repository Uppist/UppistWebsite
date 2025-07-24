/** @format */
import styles from './About.module.css';

/**
 * About component renders the About Us page content.
 * Displays a heading, introductory paragraph, and placeholder sections.
 */
function About() {
  return (
    <div className={styles.about}>
      <h1>About Uppist</h1>
      <p className={styles.intro}>
        At Uppist, we empower businesses with innovative solutions in creative
        marketing and technology. Learn more about our mission and team.
      </p>
      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver cutting-edge digital marketing and technology
          solutions that drive growth and success for our clients. We combine
          creativity and technical expertise to create impactful results.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Team</h2>
        <p>
          Our team consists of passionate professionals dedicated to pushing
          boundaries in creative and digital spaces. We work collaboratively to
          bring your vision to life.
        </p>
      </section>
    </div>
  );
}

export default About;