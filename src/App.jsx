/** @format */
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import About from './components/About/About';
import Case from './components/Case/Case';
import Contact from './components/Contact/Contact';
import Blogs from './components/Blogs/Blogs';
import BlogDetail from './components/Blogs/BlogDetail';
import Creative from './components/Service/Creative/Creative';
import Technology from './components/Service/Technology/Technology';
import Footer from './components/Footer/Footer';
import Logo from "./components/AIChatbot/Logo";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login/Login";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import styles from './App.module.css';

function AppContent() {
  const location = useLocation();
  const adminRoutes = ["/admin", "/login", "/dashboard"];

  return (
    <>
      {!adminRoutes.includes(location.pathname) && <Logo />}
      {/* NOTE: added id="app-scroll" */}
      <div id="app-scroll" className={styles.app}>
        {!adminRoutes.includes(location.pathname) && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<Case />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/services/creative" element={<Creative />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services/technology" element={<Technology />} />
          </Routes>
        </main>
        {!adminRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop /> {/* you can leave this global or still add per-page; global is fine */}
      <AppContent />
    </>
  );
}
