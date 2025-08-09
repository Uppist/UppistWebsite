/** @format */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import man from '../../assets/man.png';
import people from './Home-assets/people2.png';
import tick1 from './Home-assets/tick1.svg';
import tick2 from './Home-assets/tick2.svg';
import woman from './Home-assets/woman.png';
import icon4 from './Home-assets/icon4.svg';
import man1 from './Home-assets/man1.png';
import girl from './Home-assets/girl.png';
import client1 from './Home-assets/client1.png';
import client2 from './Home-assets/client2.png';
import client3 from './Home-assets/client3.png';
import client4 from './Home-assets/client4.png';
import client5 from './Home-assets/client5.png';
import client6 from './Home-assets/client6.png';
import client7 from './Home-assets/client7.png';
import Testimonials from './Testimonials.jsx';

const Home = () => {
  const navigate = useNavigate();

  // Scroll to top whenever Home mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.content}>
          <h1>
            Empowering Brands and Businesses with{' '}
            <span className={styles.highlight}>Digital Marketing, Brand Design</span>{' '}
            and <span className={styles.highlight}>Technology</span>.
          </h1>
          <p>
            Our expert services in digital marketing, brand identity design and technology development help 
            position you as an authority in your industry, attract the right audience, and generate high-quality leads.
          </p>
          <button className={styles.cta} onClick={() => navigate('/contact')}>
            Let’s Get Started →
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img src={man} alt="Smiling man" />
        </div>
      </section>

      <section className={styles.people}>
        <div className={styles.peopleImage}>
          <img src={people} alt="Team collaboration" />
        </div>
        <div className={styles.peopleContent}>
          <h2 className={styles.peopleTitle}>Who We Are</h2>
          <p className={styles.peopleText}>
            Uppist is a forward-thinking firm committed to helping brands succeed in today's digital-first world. <br /> <br />
            Through our offerings in creative and digital marketing, as well as technology development, we enable businesses in Nigeria and beyond unlock new
          </p> <br />
          <button className={styles.peopleCta} onClick={() => navigate('/about')}>Learn More →</button>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <div className={styles.missionColumn}>
            <img src={tick1} alt="Mission tick" className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              To elevate the human potential through first-class professional services and technology. <br /> <br />
              We aim to empower people and businesses to do more, achieve more, and grow beyond limits. <br /> <br />
              By combining expert professional services with innovative technology, we help unlock new opportunities and transform everyday digital challenges into success.
            </p>
          </div>
          <div className={styles.missionColumn}>
            <img src={tick2} alt="Vision tick" className={styles.missionIcon} />
            <h2 className={styles.missionTitle}>Our Vision</h2>
            <p className={styles.missionText}>
              To be a distinguished global business conglomerate, designing cutting-edge products and services that transform the human experience.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <h2 className={styles.servicesTitle}>Our Services</h2>
        <p className={styles.servicesText}>
          Uppist combines creativity and technology to offer a full range of digital services that help businesses in
          Nigeria and beyond to compete, scale, and thrive.
        </p>
        <div className={styles.serviceBody}>
          <div className={styles.servicesContainer}>
            <img src={woman} alt="Professional woman" className={styles.servicesImage} />
            <div className={styles.serviceBox}>
              <div className={styles.servicesCard}>
                <img src={icon4} alt="Yellow line icon" className={styles.servicesCardIcon} />
                <h3 className={styles.servicesCardTitle}>Creative and Digital Marketing</h3>
                <p className={styles.servicesCardText}>
                  Customer needs are evolving. Helping businesses keep up with change is at the heart of what we do.
                </p>
                <button className={styles.servicesCardButton} onClick={() => navigate('/services/creative')}>Learn More →</button>
              </div>
            </div>
          </div>
          <div className={styles.servicesContainer2}>
            <div className={styles.serviceBox2}>
              <div className={styles.servicesCard2}>
                <img src={icon4} alt="Yellow line icon" className={styles.servicesCardIcon} />
                <h3 className={styles.servicesCardTitle}>Technology Solutions</h3>
                <p className={styles.servicesCardText}>
                  Beyond marketing, we deliver custom technology solutions that help businesses become more efficient, scalable, and innovative.
                </p>
                <button className={styles.servicesCardButton} onClick={() => navigate('/services/technology')}>Learn More →</button>
              </div>
            </div>
            <img src={man1} alt="Professional man" className={styles.servicesImage2} />
          </div>
        </div>
      </section>

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
            <button
              className={styles.chooseButton}
              onClick={() => window.open('https://calendly.com/uppist/15min', '_blank')}>
              BOOK A FREE CONSULTATION
            </button>
          </div>
          <img src={girl} alt="Professional lady" className={styles.chooseImage} />
        </div>
      </section>

      <section className={styles.clients}>
        <h2 className={styles.clientsTitle}>Our Clients</h2>
        <div className={styles.clientsContainer}>
          <img src={client1} alt="Client 1" className={styles.clientImage} />
          <img src={client2} alt="Client 2" className={styles.clientImage} />
          <img src={client3} alt="Client 3" className={styles.clientImage} />
          <img src={client4} alt="Client 4" className={styles.clientImage} />
          <img src={client5} alt="Client 5" className={styles.clientImage} />
          <img src={client6} alt="Client 6" className={styles.clientImage} />
          <img src={client7} alt="Client 7" className={styles.clientImage} />
        </div>
        <Testimonials />
      </section>
    </>
  );
};

export default Home;
