/** @format */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/uppist.svg';
import { FaBars, FaTimes, FaChevronRight } from 'react-icons/fa'; // Re-added FaTimes

function HeaderMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'case-studies', label: 'Case Studies', path: '/case-studies' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  useEffect(() => {
    const currentNavItem = navItems.find(
      (item) => item.path === location.pathname || (item.id === 'services' && location.pathname.startsWith('/services'))
    );
    if (location.pathname.startsWith('/blogs')) {
      setActiveItem('blogs');
    } else {
      setActiveItem(currentNavItem ? currentNavItem.id : 'home');
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsServicesOpen(false); // Close sub-menu when closing main menu
    }
  };

  const handleItemClick = (id, path) => {
    if (id === 'services') {
      setIsServicesOpen(!isServicesOpen);
    } else {
      navigate(path);
      setIsMenuOpen(false);
      setIsServicesOpen(false);
      setActiveItem(id);
    }
  };

  const handleServiceClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setActiveItem('services');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="https://www.google.com" className={styles.logoLink}>
          <img src={logo} alt="Uppist Logo" className={styles.logoImg} />
        </a>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu} aria-expanded={isMenuOpen}>
        {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between FaBars and FaTimes */}
      </div>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavItems}>
          {navItems.map(({ id, label, path }) => (
            <div key={id}>
              {id === 'services' ? (
                <div
                  className={`${styles.mobileNavItem} ${activeItem === id ? styles.active : ''}`}
                  onClick={() => handleItemClick(id, path)}
                >
                  <div className={styles.servicesDropdown}>
                    <span className={styles.servicesLabel}>{label}</span>
                    <FaChevronRight
                      className={`${styles.chevron} ${isServicesOpen ? styles.open : ''}`}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.mobileNavItem} ${activeItem === id ? styles.active : ''}`}
                  onClick={() => handleItemClick(id, path)}
                >
                  <span className={styles.mobileNavLabel}>{label}</span>
                </div>
              )}
              {id === 'services' && isServicesOpen && (
                <div className={styles.mobileSubMenu}>
                  <div
                    className={styles.mobileSubItem}
                    onClick={() => handleServiceClick('/services/creative')}
                  >
                    Creative & Digital <br /> Marketing
                  </div>
                  <div
                    className={styles.mobileSubItem}
                    onClick={() => handleServiceClick('/services/technology')}
                  >
                    Technology  <br /> Solutions
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className={styles.mobileFooterButton}
          onClick={() => {
            window.open('https://calendly.com/uppist/15min', '_blank');
            setIsMenuOpen(false);
          }}
        >
          BOOK A FREE CONSULTATION
        </button>
      </div>
    </nav>
  );
}

export default HeaderMobile;