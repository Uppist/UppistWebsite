/** @format */

import React from "react";
import styles from "./footer.module.css";
import SocialMedia from "./SocialMedia";
import { NavLink } from "react-router-dom";
import UppistLogo from "./UppistLogo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container1}>
        <div className={styles.location}>
          <svg
            width='24'
            height='32'
            viewBox='0 0 24 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_48_1957)'>
              <path
                d='M24 12C24 20.728 13.8463 30.982 13.4145 31.4142C13.0394 31.7892 12.5307 31.9999 12.0002 31.9999C11.4698 31.9999 10.9611 31.7892 10.586 31.4142C10.1538 30.9817 0 20.728 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12ZM12 18C13.1867 18 14.3467 17.6481 15.3334 16.9888C16.3201 16.3295 17.0892 15.3925 17.5433 14.2961C17.9974 13.1997 18.1162 11.9933 17.8847 10.8295C17.6532 9.66557 17.0818 8.59647 16.2426 7.75736C15.4035 6.91824 14.3344 6.3468 13.1705 6.11529C12.0067 5.88378 10.8003 6.0026 9.7039 6.45672C8.60754 6.91085 7.67047 7.67988 7.01118 8.66658C6.35189 9.65327 6 10.8133 6 12C5.99997 12.7879 6.15514 13.5682 6.45666 14.2961C6.75817 15.0241 7.20013 15.6856 7.75729 16.2427C8.31444 16.7999 8.97589 17.2418 9.70386 17.5433C10.4318 17.8449 11.2121 18 12 18Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_48_1957'>
                <rect width='24' height='32' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <div>
            <span>Location</span>
            <p>1A Hughes Avenue, Off Hebert Macaulay Avenue, Yaba, Lagos</p>
          </div>
        </div>
        <div className={styles.location}>
          {" "}
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_48_1965)'>
              <path
                d='M3 8.25V9.75H1.5C1.30109 9.75 1.11032 9.67098 0.96967 9.53033C0.829018 9.38968 0.75 9.19891 0.75 9C0.75 8.80109 0.829018 8.61032 0.96967 8.46967C1.11032 8.32902 1.30109 8.25 1.5 8.25H3ZM3 11.25V12.75H1.5C1.30109 12.75 1.11032 12.671 0.96967 12.5303C0.829018 12.3897 0.75 12.1989 0.75 12C0.75 11.8011 0.829018 11.6103 0.96967 11.4697C1.11032 11.329 1.30109 11.25 1.5 11.25H3ZM3 14.25V15.75H1.5C1.30109 15.75 1.11032 15.671 0.96967 15.5303C0.829018 15.3897 0.75 15.1989 0.75 15C0.75 14.8011 0.829018 14.6103 0.96967 14.4697C1.11032 14.329 1.30109 14.25 1.5 14.25H3Z'
                fill='white'
              />
              <path
                d='M21 0H4.5C3.90326 0 3.33097 0.237053 2.90901 0.65901C2.48705 1.08097 2.25 1.65326 2.25 2.25V8.25H4.5C4.69891 8.25 4.88968 8.32902 5.03033 8.46967C5.17098 8.61032 5.25 8.80109 5.25 9C5.25 9.19891 5.17098 9.38968 5.03033 9.53033C4.88968 9.67098 4.69891 9.75 4.5 9.75H2.25V11.25H4.5C4.69891 11.25 4.88968 11.329 5.03033 11.4697C5.17098 11.6103 5.25 11.8011 5.25 12C5.25 12.1989 5.17098 12.3897 5.03033 12.5303C4.88968 12.671 4.69891 12.75 4.5 12.75H2.25V14.25H4.5C4.69891 14.25 4.88968 14.329 5.03033 14.4697C5.17098 14.6103 5.25 14.8011 5.25 15C5.25 15.1989 5.17098 15.3897 5.03033 15.5303C4.88968 15.671 4.69891 15.75 4.5 15.75H2.25V21.75C2.25 22.3467 2.48705 22.919 2.90901 23.341C3.33097 23.7629 3.90326 24 4.5 24H21C21.5967 24 22.169 23.7629 22.591 23.341C23.0129 22.919 23.25 22.3467 23.25 21.75V2.25C23.25 1.65326 23.0129 1.08097 22.591 0.65901C22.169 0.237053 21.5967 0 21 0V0ZM12.75 7.125C13.1208 7.125 13.4834 7.23497 13.7917 7.44099C14.1 7.64702 14.3404 7.93986 14.4823 8.28247C14.6242 8.62508 14.6613 9.00208 14.589 9.3658C14.5166 9.72951 14.338 10.0636 14.0758 10.3258C13.8136 10.588 13.4795 10.7666 13.1158 10.839C12.7521 10.9113 12.3751 10.8742 12.0325 10.7323C11.6899 10.5904 11.397 10.35 11.191 10.0417C10.985 9.73335 10.875 9.37084 10.875 9C10.875 8.50272 11.0725 8.02581 11.4242 7.67417C11.7758 7.32254 12.2527 7.125 12.75 7.125ZM16.875 16.5C16.875 16.5995 16.8355 16.6948 16.7652 16.7652C16.6948 16.8355 16.5995 16.875 16.5 16.875H9C8.90054 16.875 8.80516 16.8355 8.73483 16.7652C8.66451 16.6948 8.625 16.5995 8.625 16.5V15.75C8.62698 14.8555 8.9832 13.9982 9.6157 13.3657C10.2482 12.7332 11.1055 12.377 12 12.375H13.5C14.3945 12.377 15.2518 12.7332 15.8843 13.3657C16.5168 13.9982 16.873 14.8555 16.875 15.75V16.5Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_48_1965'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <div>
            <span>Contact</span>
            <a href='mailto:support@uppist.xyz'>
              <b>Email:</b> support@uppist.xyz
            </a>
            <a href='tel:02017003091'>
              <b>Phone:</b> 02017003091
            </a>{" "}
          </div>
        </div>
        <div className={styles.location}>
          {" "}
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 1C9.82441 1 7.69767 1.64514 5.88873 2.85383C4.07979 4.06253 2.66989 5.78049 1.83733 7.79048C1.00477 9.80047 0.786929 12.0122 1.21137 14.146C1.6358 16.2798 2.68345 18.2398 4.22183 19.7782C5.76021 21.3166 7.72022 22.3642 9.85401 22.7886C11.9878 23.2131 14.1995 22.9952 16.2095 22.1627C18.2195 21.3301 19.9375 19.9202 21.1462 18.1113C22.3549 16.3023 23 14.1756 23 12C23 9.08262 21.8411 6.28473 19.7782 4.22183C17.7153 2.15893 14.9174 1 12 1ZM16 13H12C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13Z'
              fill='white'
            />
          </svg>
          <div>
            <span>Work Hours</span>
            <p style={{ width: "100%" }}>
              Monday to Friday
              <br />
              9am - 5pm
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.container2}>
        <div className={styles.info}>
          <div className={styles.img}>
            <UppistLogo />
            <p>Powering enterprise with breakthrough technologies.</p>
          </div>
          <div className={styles.quick}>
            <label htmlFor=''>Quick Links</label>
            <div>
              {" "}
              <NavLink to='/' className={styles.notactive}>
                <li>Home</li>
              </NavLink>
              <NavLink to='/products' className={styles.notactive}>
                <li>Product</li>
              </NavLink>
              <NavLink to='/solutions' className={styles.notactive}>
                <li>Solutions</li>
              </NavLink>
              <NavLink to='/pricing' className={styles.notactive}>
                <li>Pricing</li>
              </NavLink>
              <NavLink to='/About' className={styles.notactive}>
                <li>About</li>
              </NavLink>
              <NavLink to='/contact' className={styles.notactive}>
                <li>Contact</li>
              </NavLink>
              <NavLink to='/request-a-demo' className={styles.notactive}>
                <li>Request a Demo</li>
              </NavLink>
            </div>
          </div>
          <div className={styles.stay}>
            <label htmlFor=''>Stay Connected</label>
            <div>
              <input type='text' placeholder='Enter your email address' />
              <button
                type='button'
                onClick={() => alert("Thank you for subscribing!")}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className={styles.connect}>
          <span>Connect with us</span>
          <SocialMedia />
        </div>
        <span
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          © UPPIST 2026. All rights reserved
        </span>
      </div>
    </footer>
  );
}
