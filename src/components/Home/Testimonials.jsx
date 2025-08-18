/** @format */
import React, { useEffect, useRef } from 'react';
import styles from './Home.module.css';
import lady1 from './Home-assets/lady1.png';
import star from './Home-assets/star.svg';
import leftarrow from './Home-assets/leftarrow.svg';
import rightarrow from './Home-assets/rightarrow.svg';

const Testimonials = () => {
  const carouselRef = useRef(null);
  const currentIndexRef = useRef(0);

  const handlePrev = () => {
    const totalItems = carouselRef.current.children.length;
    currentIndexRef.current =
      (currentIndexRef.current - 1 + totalItems) % totalItems;
    carouselRef.current.style.transform = `translateX(-${
      currentIndexRef.current * 100
    }%)`;
  };

  const handleNext = () => {
    const totalItems = carouselRef.current.children.length;
    currentIndexRef.current = (currentIndexRef.current + 1) % totalItems;
    carouselRef.current.style.transform = `translateX(-${
      currentIndexRef.current * 100
    }%)`;
  };

  useEffect(() => {
    const autoScroll = () => {
      const totalItems = carouselRef.current.children.length;
      currentIndexRef.current =
        (currentIndexRef.current + 1) % totalItems;
      carouselRef.current.style.transform = `translateX(-${
        currentIndexRef.current * 100
      }%)`;
    };
    const interval = setInterval(autoScroll, 5000);
    return () => clearInterval(interval);
  }, []);

  // === Touch Swipe Support (Mobile / Touch devices) ===
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let startX = 0;
    let endX = 0;
    const SWIPE_THRESHOLD = 50; // px distance to trigger swipe

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > SWIPE_THRESHOLD) {
        // swipe left → go next
        handleNext();
      } else if (diff < -SWIPE_THRESHOLD) {
        // swipe right → go prev
        handlePrev();
      }
    };

    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchend", handleTouchEnd);

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const testimonials = [
    {
      quote:
        "Our company's rebranding was a game-changer, thanks to this amazing design agency. The logo they created perfectly captures our vision, and the branding materials were stunning!",
      name: 'Mavis Izegbune',
      position: 'Founder, First and Last Wellness',
    },
    {
      quote:
        "Their team took our social media presence to the next level! The creative content and strategic management helped us connect with our audience in ways we never imagined.",
      name: 'Olufeyisayo Soewu',
      position: 'C.E.O, Squaredlab Advisory Services',
    },
    {
      quote:
        "From our new logo to the overall branding, their work exceeded our expectations. The designs are sleek, modern, and truly represent who we are as a company.",
      name: 'Chinedu Okafor',
      position: 'C.E.O, The BroomApp',
    },
    {
      quote:
        "I was impressed with how they designed our company profile. It’s now professional, engaging, and communicates our brand identity effectively. Highly recommend their services!",
      name: 'Adaobi Eze',
      position: 'Operations Director, BrightPath Enterprises',
    },
  ];

  return (
    <section className={styles.testimonials}>
      <span className={styles.mobileHighlight2}> Testimonials </span>
      <img
        src={lady1}
        alt="Testimonial scene"
        className={styles.testimonialImageStandalone}
      />
      <div className={styles.testimonialsCarousel}>
        <h2 className={styles.testimonialsTitle}> 
          <span className={styles.desktopHighlight2}> Testimonials </span> 
        </h2>

        {/* Arrows */}
        <button
          className={`${styles.carouselButton} ${styles.leftArrow}`}
          onClick={handlePrev}
        >
          <img src={leftarrow} alt="Previous" className={styles.arrowIcon} />
        </button>

        <button
          className={`${styles.carouselButton} ${styles.rightArrow}`}
          onClick={handleNext}
        >
          <img src={rightarrow} alt="Next" className={styles.arrowIcon} />
        </button>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack} ref={carouselRef}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src={star}
                        alt="Star"
                        className={styles.starIcon}
                      />
                    ))}
                </div>
                <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                <p className={styles.testimonialAuthor}>{testimonial.name}</p>
                <p className={styles.testimonialPosition}>
                  {testimonial.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
