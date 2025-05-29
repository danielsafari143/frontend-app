import { CircleUser, Menu, Bell, Search, X } from "lucide-react";
import garcon from '../assets/images/garcon.png';
import React, { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Left section - Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Center section - Search */}
        {/* <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div> */}

        {/* Right section - User & Notifications */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-gray-700 font-medium">Mr.Daniel Safari</span>
            <button className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full">
              <img 
                src={garcon} 
                alt="user icon" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <span>Paramètres</span>
                  </a>
                </li>
                <li>
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <span>Profil</span>
                  </a>
                </li>
                <li>
                  <a href="/help" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <span>Aide</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
