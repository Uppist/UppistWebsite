/** @format */
import React from 'react';
import styles from './Creative.module.css';
import people2 from './Creative-assets/people2.png';
import tickIcon from './Creative-assets/tickIcon2.svg';
import offerImage from './Creative-assets/offer.png';
import yellowIcon from './Creative-assets/yellowIcon.svg';
import dotIcon from './Creative-assets/dot.svg'; // Yellow dot footnote
import brandImage from './Creative-assets/brandImage.png';
import girl from '../../Home/Home-assets/girl.png';

const Creative = () => {
  return (
    <>
      {/* Creative & Digital Marketing Section */}
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
              {/* List of services */}
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Create <span className={styles.brand}>brand identities</span> that tell your story and connect emotionally.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Design and develop <span className={styles.brand}>conversion-focused websites</span> that reflect your brand and keep visitors engaged.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Plan and run <span className={styles.brand}>digital marketing campaigns</span> across social media and other channels to increase leads and sales.
                </p>
              </div>
              <div className={styles.creativeItem}>
                <img src={tickIcon} alt="Tick Icon" className={styles.tickIcon} />
                <p className={styles.creativeTextItem}>
                  Produce <span className={styles.brand}>engaging content</span> and <span className={styles.brand}>social media strategies tailored</span> to your audience’s interests and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.creativeContent}>
          <p>
            By combining storytelling, design, and data, we don’t just get you seen, we help you get results.
          </p>
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
              <h2 className={styles.brandDesignTitle}>Brand Design</h2>
            </div>
            <p className={styles.brandDescription}>
              Let your brand designs speak clearly, look sharp, and connect instantly. Whether you're just starting out or 
              refreshing your identity, our brand design services help you create a visual language that feels right and gets remembered.
              From your logo to your entire identity system, we handle it all with strategy, style, and purpose, so your brand doesn’t just exist, it stands out.
            </p>
            <h3 className={styles.design}>We design:</h3>

            {/* Dot bullet points */}
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Logo packages (logo, font styling, colours etc)</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Company letterhead</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Business cards</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Company profile</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Website</span>
            </div>

            {/* Call to action */}
            <button className={styles.ctaButton}>Let’s Get Started →</button>
          </div>
        </div>
      </section>

      {/* Brand Marketing Section */}
      <section className={styles.brandMarketing}>
        <div className={styles.brandContainer}>
          <img src={brandImage} alt="Core Offerings" className={styles.brandImage} />
          <div className={styles.brandText}>
            <div className={styles.brandDesign}>
              <img src={yellowIcon} alt="Yellow Icon" className={styles.yellowIcon} />
              <h2 className={styles.brandDesignTitle}>Brand marketing</h2>
            </div>
            <p className={styles.brandDescription}>
              Your brand deserves more than just visibility, it deserves connection, recognition, and loyalty. 
              We don’t do one-size-fits-all. We take time to understand your goals, target audience, and market trends, 
              then build a marketing engine tailored to your brand’s voice and vision. From social media management and content creation to digital advertising, 
              email marketing, and brand storytelling, every tactic is designed to strengthen your presence and deliver real results.
            </p>
            <h3 className={styles.design}>Services include:</h3>

            {/* Dot bullet points */}
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Social media management</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Email marketing</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Ads</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Search engine optimisation</span>
            </div>
            <div className={styles.offerList}>
              <img src={dotIcon} alt="Footnote" className={styles.dotIcon} />
              <span>Analytics</span>
            </div>

            {/* Call to action */}
            <button className={styles.ctaButton}>Let’s Get Started →</button>
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
            <button className={styles.chooseButton}>BOOK A FREE CONSULTATION</button>
          </div>
          <img src={girl} alt="Professional lady" className={styles.chooseImage} />
        </div>
      </section>
    </>
  );
};

export default Creative;
