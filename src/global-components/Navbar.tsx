import { CircleUser, Menu, Bell, Search, X } from "lucide-react";
import garcon from '../assets/images/garcon.png';
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
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
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Bell size={20} />
          </button>
          <>
            <LanguageSwitcher/>
          </>
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

      {isMobileMenuOpen && <Sidebar onCollapse={function (collapsed: boolean): void {
        throw new Error("Function not implemented.");
      } }/>}
    </nav>
  );
}
