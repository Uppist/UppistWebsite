/** @format */
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderMobile from "./components/Header/HeaderMobile";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Case from "./components/Case/Case";
import Contact from "./components/Contact/Contact";
import Blogs from "./components/Blogs/Blogs";
import BlogDetail from "./components/Blogs/BlogDetail";
import Creative from "./components/Service/Creative/Creative";
import Technology from "./components/Service/Technology/Technology";
import Footer from "./components/Footer/Footer";
import Logo from "./components/AIChatbot/Logo";
import Login from "./components/Admin/Login/Login";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import useIsMobile from "./hooks/useIsMobile";
import styles from "./App.module.css"; // Import the CSS module

function AppContent() {
  const location = useLocation();
  const adminRoutes = ["/admin", "/login", "/dashboard"];
  const isMobile = useIsMobile();

  return (
    <>
      {!adminRoutes.includes(location.pathname) && <Logo />}
      <div id='app-scroll' className={styles.app}>
        {" "}
        {/* Apply the class */}
        {!adminRoutes.includes(location.pathname) &&
          (isMobile ? <HeaderMobile /> : <Header />)}
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/case-studies' element={<Case />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:id' element={<BlogDetail />} />
            <Route path='/services/creative' element={<Creative />} />

            <Route path='/services/technology' element={<Technology />} />
          </Routes>
        </main>
        {!adminRoutes.includes(location.pathname) && <Footer />}
        {/*Admin Login and other routes */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppContent />
    </>
  );
}
