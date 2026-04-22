/** @format */
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import Header from "./components/Header/Header";
// import HeaderMobile from "./components/Header/HeaderMobile";
import Logo from "./components/AIChatbot/Logo";
import Login from "./components/Admin/Login/Login";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import useIsMobile from "./hooks/useIsMobile";
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
import Home from "./components/Website/Home/Home";
import Footer from "./components/Website/Footer/Footer";
import Navbar from "./components/Website/Navbar/Navbar";
import Product from "./components/Website/Product/Product";
import Solutions from "./components/Website/Solutions/Solutions";
import Pricing from "./components/Website/Pricing/Pricing";
import About from "./components/Website/About/About";
import Contact from "./components/Website/Contact/Contact";

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
  // const isMobile = useIsMobile();

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
        {!adminRoutes && <Navbar />}
        {/* <Navbar /> */}
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Product />} />
            <Route path='/solutions' element={<Solutions />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/request-a-demo' element={<Contact />} />
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
