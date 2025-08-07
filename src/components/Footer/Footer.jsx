/** @format */
import React from 'react';
import styles from './Footer.module.css';
import locationIcon from './Footer-assets/location.svg';
import contactIcon from './Footer-assets/contact.svg';
import workIcon from './Footer-assets/work.svg';
import uppistLogo from './Footer-assets/uppist.svg';
import facebookIcon from './Footer-assets/facebook.svg';
import igIcon from './Footer-assets/ig.svg';
import xIcon from './Footer-assets/x.svg';
import linkedinIcon from './Footer-assets/linkedin.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.contactItem}>
          <img src={locationIcon} alt="Location" className={styles.icon} />
          <h3 className={styles.sectionTitle}>Location <br />
            <p>1A Hughes Avenue, Off Hebert Macaulay Avenue, Yaba, Lagos</p>
          </h3>
        </div>
        <div className={styles.contactItem}>
          <img src={contactIcon} alt="Contact" className={styles.icon} />
          <h3 className={styles.sectionTitle}>Contact
            <p><span className={styles.contactLabel}> Email: </span> support@uppist.xyz<br />
                <span className={styles.contactLabel}>Phone: </span> 02017003091</p>
          </h3>
        </div>
        <div className={styles.contactItem}>
          <img src={workIcon} alt="Work Hours" className={styles.icon} />
          <h3 className={styles.sectionTitle}>Work Hours
            <p>Monday to Friday<br />9am - 5pm</p>
          </h3>
        </div>
      </div>
      <div className={styles.yellowLine}><h3></h3></div>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <img src={uppistLogo} alt="Uppist Logo" className={styles.logo} />
          <p className={styles.description}>
            POWERING ENTERPRISE WITH <br /> BREAKTHROUGH TECHNOLOGIES.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.sectionQuick}>Quick Links</h3>
          <div className={styles.sectionQuickLinks}>
            <p>Home</p>
            <p>About Us</p>
            <p>Creative & Digital Marketing</p>
            <p>Technology Solutions</p>
            <p>Blogs</p>
            <p>Case Studies</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3 className={styles.sectionStay}>Stay Connected</h3>
          <div className={styles.subscriptionBox}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.subscriptionInput}
            />
            <button className={styles.subscriptionButton}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className={styles.socialSection}>
        <h3 className={styles.sectionConnect}>Connect with us</h3>
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/share/1CKYwPdxKs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com/uppisthq?igsh=MWtlanFkYjhkajI1Ng==" target="_blank" rel="noopener noreferrer">
            <img src={igIcon} alt="Instagram" className={styles.socialIcon} />
          </a>
          <a href="https://x.com/uppisthq?s=21" target="_blank" rel="noopener noreferrer">
            <img src={xIcon} alt="X" className={styles.socialIcon} />
          </a>
          <a href="https://www.linkedin.com/company/uppisthq/people/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; UPPIST 2025. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;