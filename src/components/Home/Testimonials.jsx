/** @format */
import React, { useEffect, useRef } from 'react';
import styles from './Home.module.css';
import lady1 from './Home-assets/lady1.png';
import star from './Home-assets/star.svg';
import leftarrow from './Home-assets/leftarrow.svg';
import rightarrow from './Home-assets/rightarrow.svg';

const Testimonials = () => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    let currentIndex = parseInt(carouselRef.current.style.transform.replace(/translateX\(-(\d+)px\)/, '$1') || 0) / (500 + 40);
    const totalItems = carouselRef.current.children.length;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    carouselRef.current.style.transform = `translateX(-${currentIndex * (500 + 40)}px)`;
  };

  const handleNext = () => {
    let currentIndex = parseInt(carouselRef.current.style.transform.replace(/translateX\(-(\d+)px\)/, '$1') || 0) / (500 + 40);
    const totalItems = carouselRef.current.children.length;
    currentIndex = (currentIndex + 1) % totalItems;
    carouselRef.current.style.transform = `translateX(-${currentIndex * (500 + 40)}px)`;
  };

  useEffect(() => {
    let currentIndex = 0;
    const carousel = carouselRef.current;
    const items = carousel.children;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth + 40; // Width + gap

    const autoScroll = () => {
      currentIndex = (currentIndex + 1) % totalItems;
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    const interval = setInterval(autoScroll, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const testimonials = [
    {
      quote: "Uppist transformed our online presence with their creative marketing strategies. Highly recommend!",
      author: "Jane Doe, CEO of InnovateX",
    },
    {
      quote: "The technology solutions they provided scaled our business efficiently. Amazing team!",
      author: "John Smith, CTO of TechGrow",
    },
    {
      quote: "Their digital marketing expertise helped us double our engagement in just three months!",
      author: "Emily Johnson, Marketing Director at BrightFuture",
    },
    {
      quote: "A perfect blend of creativity and tech—our brand now stands out like never before.",
      author: "Michael Brown, Founder of VisionaryCo",
    },
    {
      quote: "Uppist guided us through digital transformation with ease. Truly professional!",
      author: "Sarah Lee, Operations Manager at ScaleUp",
    },
  ];

  return (
    <>
      <h2 className={styles.testimonialsTitle}>Testimonials</h2>
      <section className={styles.testimonials}>
        <img src={lady1} alt="Testimonial scene" className={styles.testimonialImageStandalone} />
        <div className={styles.testimonialsCarousel}>
          <button className={styles.carouselButton} onClick={handlePrev}>
            <img src={leftarrow} alt="Previous" className={styles.arrowIcon} />
          </button>
          <div className={styles.carouselTrack} ref={carouselRef}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <div className={styles.stars}>
                    {Array(5).fill().map((_, i) => (
                      <img key={i} src={star} alt="Star" className={styles.starIcon} />
                    ))}
                  </div>
                  <p className={styles.testimonialQuote}>{testimonial.quote}</p>
                  <p className={styles.testimonialAuthor}>{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.carouselButton} onClick={handleNext}>
            <img src={rightarrow} alt="Next" className={styles.arrowIcon} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Testimonials;