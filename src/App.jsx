/** @format */
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import useIsMobile from "./hooks/useIsMobile";
import styles from "./App.module.css"; // Import the CSS module
import ChatLogs from "./components/Admin/Dashboard/Transaction/ChatLogs";

import { useContext, useEffect } from "react";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Content from "./components/Admin/Dashboard/Content";
import Agent from "./components/Admin/Dashboard/Transaction/LiveAgent/Agent";
import Settings from "./components/Admin/Dashboard/Transaction/Settings/Settings";
import ViewMore from "./components/Admin/Dashboard/Transaction/ViewMore";
import { UserDataContext } from "./components/Admin/UserDataContext";
import LiveAgentChat from "./components/Admin/LiveAgentChat/LiveAgentChat";
import Chat from "./components/Admin/LiveAgentChat/Chat";

function AppContent() {
  const { userData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const adminRoutes =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/settings" ||
    location.pathname.startsWith("/logs") ||
    location.pathname === "/live_agents" ||
    location.pathname.startsWith("/messages") ||
    location.pathname === "/notification";
  const isMobile = useIsMobile();

  useEffect(() => {}, []);

  const role = userData?.user?.role;
  useEffect(() => {
    if (role === "admin" && location.pathname === "/dashboard") {
      navigate("/live_agents", { replace: true });
    } else if (
      role === "Live Agent" &&
      (location.pathname === "/dashboard" ||
        location.pathname === "/live_agents")
    ) {
      navigate("/messages", { replace: true });
    } else {
      // navigate("/login", { replace: true });
    }
  }, [role, location.pathname, navigate]);

  return (
    <>
      {!adminRoutes && <Logo />}
      <div id='app-scroll' className={styles.app}>
        {" "}
        {/* Apply the class */}
        {!adminRoutes && (isMobile ? <HeaderMobile /> : <Header />)}
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
            {/*Admin Login and other routes */}
            <Route path='/login' element={<Login />} />
            <Route element={<Dashboard />}>
              <Route path='/dashboard' element={<Content />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/live_agents' element={<Agent />} />
              <Route path='/logs/:type' element={<ChatLogs />} />
              <Route path='/messages' element={<LiveAgentChat />}>
                <Route path=':id' element={<Chat />} />{" "}
              </Route>
              <Route path='/notification' element={<Content />} />
            </Route>
            {/* </Route>{" "} */}
          </Routes>
        </main>{" "}
        {!adminRoutes && <Footer />}
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
