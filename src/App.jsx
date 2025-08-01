/** @format */
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Case from './components/Case/Case'; // Import Case component
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

/**
 * Main App component with routing for Home, About, and Case Studies pages.
 */

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<Case />} /> {/* Add Case Studies route */}
            <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;