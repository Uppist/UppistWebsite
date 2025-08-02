/** @format */
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Case from './components/Case/Case'; // Import Case component
import Contact from './components/Contact/Contact';
import Blogs from './components/Blogs/Blogs'; // Import Blogs component
import BlogDetail from './components/Blogs/BlogDetail'; // Import BlogDetail component
import Creative from './components/Service/Creative/Creative'; // Import Creative component
import Technology from './components/Service/Technology/Technology'; // Import Technology component
import Footer from './components/Footer/Footer';
import Logo from "./components/AIChatbot/Logo";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login/Login";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import styles from './App.module.css';

/**
 * Main App component with routing for Home, About, Case Studies, Contact, Blogs, and Services pages.
 */

function App() {
  const location = useLocation();

  const adminRoutes = ["/admin", "/login", "/dashboard"];
  return (
    <>  
      {!adminRoutes.includes(location.pathname) && <Logo />}
      <div className={styles.app}>
        {!adminRoutes.includes(location.pathname) && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<Case />} /> {/* Case Studies route */}
            <Route path="/contact" element={<Contact />} /> {/* Contact route */}
            <Route path="/blogs" element={<Blogs />} /> {/* Blogs route */}
            <Route path="/blogs/:id" element={<BlogDetail />} /> {/* BlogDetail route */}
            <Route path="/services/creative" element={<Creative />} /> {/* Creative route */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services/technology" element={<Technology />} /> {/* Technology route */}
          </Routes>
        </main>
        {!adminRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
}

export default App;