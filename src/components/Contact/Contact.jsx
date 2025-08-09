/** @format */
import React from 'react';
import styles from './Contact.module.css';
import contactLady from './Contact-assets/contactLady.png'; // Explicit path
import ScrollToTop from '../ScrollToTop/ScrollToTop'; // correct relative path from components/Contact

const Contact = () => {
  return (
    <>
      <ScrollToTop /> {/* scrolls the app container or window on mount */}
      <section className={styles.contact}>
        <h1 className={styles.contactTitle}>Get In Touch</h1>
        <p className={styles.contactSubtitle}>Use the form below to contact us</p>
        <div className={styles.contactContainer}>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Full Name" className={styles.formInput} />
            <input type="text" placeholder="Phone Number" className={styles.formInput} />
            <input type="email" placeholder="Email Address" className={styles.formInput} />
            <textarea placeholder="Message" className={styles.formTextarea}></textarea>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
          <img src={contactLady} alt="Contact Lady" className={styles.contactImage} />
        </div>
      </section>
    </>
  );
};

export default Contact;
