/** @format */
import { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/uppist.svg';
import { FaMinus } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

function Header() {
  const [activeItem, setActiveItem] = useState('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { id: 'homes', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'case-studies', label: 'Case studies' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (id === 'services') {
      setIsServicesOpen((prev) => !prev);
    } else {
      setIsServicesOpen(false);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Uppist Logo" className={styles.logoImg} />
      </div>
      <div className={styles.navLinks}>
        {navItems.map(({ id, label }) => (
          <div
            key={id}
            onClick={() => handleItemClick(id)}
            className={`${styles.navItem} ${activeItem === id ? styles.active : ''}`}
          >
            <div className={styles.navItemContent}>
              <span>{label}</span>
              {id === 'services' && (
                <FaChevronDown className={styles.dropdownIcon} />
              )}
            </div>
            {activeItem === id && <span className={styles.underline}><FaMinus /></span>}
            {id === 'services' && isServicesOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownItem}>Creative & Digital Marketing</div>
                <div className={styles.dropdownItem}>Technology Solutions</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <a href="#consultation" className={styles.consultationButton}>
        BOOK A FREE CONSULTATION
      </a>
    </nav>
  );
}

export default Header;
