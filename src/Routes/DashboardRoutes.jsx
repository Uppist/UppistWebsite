/** @format */

import { Route } from "react-router-dom";
import ChatLogs from "../components/Admin/Dashboard/Transaction/ChatLogs";
import Agent from "../components/Admin/Dashboard/Transaction/LiveAgent/Agent";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Content from "../components/Admin/Dashboard/Content";
import Settings from "../components/Admin/Dashboard/Transaction/Settings/Settings";

export const DashboardRoute = [
  // DashboardRoutes.jsx
  <Route path='/dashboard' element={<Dashboard />}>
    <Route index element={<Content />} />
    <Route path='website_logs' element={<ChatLogs />} />
    <Route path='whatsapp_logs' element={<ChatLogs />} />
    <Route path='social_media_logs' element={<ChatLogs />} />
    <Route path='live_agents' element={<Agent />} />
    <Route path='settings' element={<Settings />} />
  </Route>,
];
