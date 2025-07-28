/** @format */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import styles from './App.module.css';

/**
 * Main App component with routing for Home and About pages.
 */
function App() {
  return (
    <Router basename="/UppistWebsite"> {/* Add basename to match the subdirectory */}
      <div className={styles.app}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes for Services, Blogs, etc., as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;