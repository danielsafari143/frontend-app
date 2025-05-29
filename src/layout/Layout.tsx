import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../global-components/Navbar';
import Sidebar from '../global-components/Sidebar';
import Footer from '../global-components/Footer';

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setIsSidebarCollapsed(sidebar.classList.contains('w-20'));
      }
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Create a MutationObserver to watch for class changes on the sidebar
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1 pt-16 relative">
        <Sidebar onCollapse={setIsSidebarCollapsed} />
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out p-4 md:p-6 w-full ${
            isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          } ${isMobile ? 'ml-0' : ''}`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
} 