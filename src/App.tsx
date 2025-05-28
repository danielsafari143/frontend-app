import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./features/dashboard/Dashboard";
import Settings from "./features/settings/Settings";
import './i18n';
import AppRoutes from './routes/routes';

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
