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
  const [serviceItemClicked, setServiceItemClicked] = useState(false);
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
      (item) => item.path === location.pathname || (item.id === 'services' && location.pathname.startsWith('/services'))
    );
    // If on a blog detail page (/blogs/:id), set activeItem to 'blogs'
    if (location.pathname.startsWith('/blogs')) {
      setActiveItem('blogs');
    } else {
      setActiveItem(currentNavItem ? currentNavItem.id : 'home');
    }
    setServiceItemClicked(location.pathname.startsWith('/services'));
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
      setIsServicesOpen((prev) => {
        const nextState = !prev;

        setTimeout(() => {
          const dropdown = dropdownRef.current;
          if (dropdown && nextState) {
            dropdown.classList.add(styles.clickAnim);
            setTimeout(() => dropdown.classList.remove(styles.clickAnim), 300);
          }
        }, 50);

        return nextState;
      });

      // Don't show yellow line yet until submenu is clicked
      setServiceItemClicked(false);
    } else {
      navigate(path);
      setIsServicesOpen(false);
      setServiceItemClicked(false);
    }
  };

  const handleServiceClick = (event, path) => {
    event.stopPropagation();
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.classList.add(styles.clickAnim);
      setTimeout(() => dropdown.classList.remove(styles.clickAnim), 300);
    }
    setIsServicesOpen(false);
    navigate(path);
    setActiveItem('services');
    setServiceItemClicked(true); // Show underline only after submenu is clicked
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div
          className={styles.logoLink}
          onClick={() => {
            navigate('/');
            setActiveItem('home');
            setIsServicesOpen(false);
            setServiceItemClicked(false);
          }}
        >
          <img src={logo} alt="Uppist Logo" className={styles.logoImg} />
        </div>
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
            {id === 'services' && activeItem === 'services' && serviceItemClicked && (
              <span className={styles.underlineServices}>
                <FaMinus />
              </span>
            )}
            {id === 'about' && activeItem === 'about' && (
              <span className={styles.underlineAboutUs}>
                <FaMinus />
              </span>
            )}
            {id === 'case-studies' && activeItem === 'case-studies' && (
              <span className={styles.underlineCaseStudies}>
                <FaMinus />
              </span>
            )}
            {id === 'contact' && activeItem === 'contact' && (
              <span className={styles.underlineContactUs}>
                <FaMinus />
              </span>
            )}
            {id === 'blogs' && activeItem === 'blogs' && (
              <span className={styles.underline}>
                <FaMinus />
              </span>
            )}
            {id === 'home' && activeItem === 'home' && (
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
                  onClick={(event) => handleServiceClick(event, '/services/creative')}
                >
                  Creative & Digital Marketing
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={(event) => handleServiceClick(event, '/services/technology')}
                >
                  Technology Solutions
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className={styles.consultationButton}
        onClick={() => window.open('https://calendly.com/uppist/15min', '_blank')}>
        BOOK A FREE CONSULTATION
      </button>
    </nav>
  );
}

export default Header;