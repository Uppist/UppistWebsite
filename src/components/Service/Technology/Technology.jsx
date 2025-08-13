/** @format */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add navigation
import styles from './Technology.module.css';
import guy from '../Technology/Technology-assets/guy.png';
import girl from '../../Home/Home-assets/girl.png';
import dotIcon from '../Technology/Technology-assets/dot.svg';
import offerImage from '../Technology/Technology-assets/offer.png';
import yellowIcon from '../Technology/Technology-assets/yellowIcon.svg';
import brandImage from '../Technology/Technology-assets/brandImage.png';
import offerImage2 from '../Technology/Technology-assets/offer2.png';
import luround from '../Technology/Technology-assets/luround.png';
import man2 from '../Technology/Technology-assets/man2.png';

const Technology = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation function

  return (
    <>
      <section className={styles.technology}>
        <div className={styles.contentContainer}>
          <img src={guy} alt="Technology Solutions" className={styles.technologyImage} />
          <div>
            <h1 className={styles.technologyTitle}>Technology Solutions</h1>
            <p className={styles.technologyContent}>
              Beyond marketing, we deliver custom technology solutions that help businesses become more efficient,
              <br /> scalable, and innovative
            </p>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className={styles.coreOfferings}>
        <h1 className={styles.coreTitle}>Core Offerings</h1>
        <div className={styles.coreContainer}>
          <img src={offerImage} alt="Core Offerings" className={styles.offerImage} />
          <div className={styles.coreText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>AI Chatbot Solutions</h2>
            </div>
            <p className={styles.brandDescription}>
              Enhance customer support and engagement with our AI-powered chatbot that delivers instant, human-like
              conversations, available 24/7 to answer FAQs, qualify leads, or guide users.
            </p>

            {/* Call to action */}
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>
              Let’s Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Cloud Solutions Section */}
      <section className={styles.brandMarketing}>
        <div className={styles.brandContainer}>
          <img src={brandImage} alt="Core Offerings" className={styles.brandImage} />
          <div className={styles.brandText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>Cloud Solution</h2>
            </div>
            <p className={styles.brandDescription}>
              Move faster and reduce costs by migrating to secure and scalable cloud infrastructures. We design and
              implement cloud architectures tailored to your business goals.
            </p>
            {/* Call to action */}
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>
              Let’s Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Custom Software Engineering Section */}
      <section className={styles.coreOfferings}>
        <div className={styles.coreContainer}>
          <img src={offerImage2} alt="Core Offerings" className={styles.offerImage} />
          <div className={styles.coreText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>Custom Software Engineering</h2>
            </div>
            <p className={styles.brandDescription}>
              From custom web applications and mobile app development to specialized internal tools, we build
              software solutions that solve real business challenges.
            </p>

            {/* Call to action */}
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>
              Let’s Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Luround Section */}
      <section className={styles.brandMarketing}>
        <div className={styles.brandContainer}>
          <img src={luround} alt="Core Offerings" className={styles.luroundImage} />
          <div className={styles.brandText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>Luround</h2>
            </div>
            <p className={styles.brandDescription}>
              Luround is an all-in-one client management app for professional services providers that simplifies how prospects and 
              clients interact with a business's service offerings.
            </p>
            {/* Call to action */}
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>
              Let’s Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Technology Consulting Section */}
      <section className={styles.coreOfferings}>
        <div className={styles.coreContainer}>
          <img src={man2} alt="Core Offerings" className={styles.offerImage} />
          <div className={styles.coreText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>Technology Consulting</h2>
            </div>
            <p className={styles.brandDescription}>
              Unsure where to start? Our experts help define your digital strategy, choose the right tools and
              technologies, and build a roadmap to transform your ideas into results.
            </p>

            {/* Call to action */}
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>
              Let’s Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Uppist Section */}
      <section className={styles.choose}>
        <div className={styles.chooseContainer}>
          <div className={styles.chooseContent}>
            <h2 className={styles.chooseTitle}>Why Choose Uppist?</h2>
            <p className={styles.chooseText}>
              We combine the creativity and storytelling strength of digital marketing with the technical depth and
              precision of our technological expertise. This unique blend means Uppist can help your business do more
              than just exist online: we help you craft a brand that resonates, build digital products that scale, and implement strategies that deliver measurable growth.
              <br /><br />
              Whether you’re a startup looking to launch your first product, an SME aiming to increase visibility and
              engagement, or an established enterprise ready to embrace digital transformation, Uppist is here to guide
              and build with you, turning your ideas into powerful, scalable solutions that keep you competitive in
              today’s digital-first world.
              <br /><br />
              We don’t just build for today; we help you build what’s next.
            </p>
            <button className={styles.chooseButton} onClick={() => navigate('/contact')}>
              BOOK A FREE CONSULTATION
            </button>
          </div>
          <img src={girl} alt="Professional lady" className={styles.chooseImage} />
        </div>
      </section>
    </>
  );
};

export default Technology;
