/** @format */
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/uppist.svg';
import { FaMinus, FaChevronDown } from 'react-icons/fa';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const servicesRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'case-studies', label: 'Case studies', path: '/case-studies' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  useEffect(() => {
    const currentNavItem = navItems.find(
      (item) => item.path === location.pathname
    );
    setActiveItem(currentNavItem ? currentNavItem.id : 'home');
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isServicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

  const handleItemClick = (id, path) => {
    setActiveItem(id);
    if (id === 'services') {
      setIsServicesOpen((prev) => !prev); // Toggle dropdown only
    } else {
      navigate(path); // Navigate for other items
      setIsServicesOpen(false);
    }
  };

  const handleDropdownItemClick = (path) => {
    navigate(path); // Navigate to the specific service path
    setIsServicesOpen(false); // Close dropdown
    setActiveItem('services'); // Keep Services active
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
          <img src={logo} alt="Uppist Logo" className={styles.logoImg} />
        </a>
      </div>
      <div className={styles.navLinks}>
        {navItems.map(({ id, label, path }) => (
          <div
            key={id}
            ref={id === 'services' ? servicesRef : null}
            onClick={() => handleItemClick(id, path)}
            className={`${styles.navItem} ${activeItem === id ? styles.active : ''}`}
          >
            <div className={styles.navItemContent}>
              <span>{label}</span>
              {id === 'services' && (
                <FaChevronDown className={styles.dropdownIcon} />
              )}
            </div>
            {activeItem === id && (
              <span className={styles.underline}>
                <FaMinus />
              </span>
            )}
            {id === 'services' && isServicesOpen && (
              <div
                ref={dropdownRef}
                className={`${styles.dropdownMenu} ${isServicesOpen ? styles.open : ''}`}
              >
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownItemClick('/services/creative')}
                >
                  Creative & Digital Marketing
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownItemClick('/services/technology')}
                >
                  Technology Solutions
                </div>
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