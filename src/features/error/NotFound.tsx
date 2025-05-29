import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, HelpCircle, Sparkles } from "lucide-react";

// Define animations using CSS-in-JS
const styles = {
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' }
  },
  '@keyframes spin-slow': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  '@keyframes bounce-slow': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-5px)' }
  },
  '@keyframes pulse-slow': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 }
  },
  '.animate-float': {
    animation: 'float 3s ease-in-out infinite'
  },
  '.animate-spin-slow': {
    animation: 'spin-slow 8s linear infinite'
  },
  '.animate-bounce-slow': {
    animation: 'bounce-slow 2s ease-in-out infinite'
  },
  '.animate-pulse-slow': {
    animation: 'pulse-slow 3s ease-in-out infinite'
  }
};

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Add animations to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = Object.entries(styles)
      .map(([selector, rules]) => {
        if (selector.startsWith('@keyframes')) {
          return `${selector} { ${Object.entries(rules)
            .map(([key, value]) => `${key} { ${Object.entries(value)
              .map(([prop, val]) => `${prop}: ${val}`)
              .join('; ')} }`)
            .join(' ')} }`;
        }
        return `${selector} { ${Object.entries(rules)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ')} }`;
      })
      .join('\n');
    document.head.appendChild(styleSheet);

    // Trigger entrance animation
    setIsLoaded(true);

    // Cleanup
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className={`max-w-2xl w-full text-center transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* 404 Number with enhanced animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-blue-100 select-none animate-pulse-slow">404</h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-16 h-16 text-blue-500 animate-spin-slow" />
          </div>
        </div>

        {/* Message with fade-in animation */}
        <div className={`mt-8 space-y-4 transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800">
            Oups! Page non trouvée
          </h2>
          <p className="text-gray-600 text-lg">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions with slide-up animation */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link
            to="/"
            className="group flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          >
            <Home size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
            <span>Retour à l'accueil</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:scale-105"
          >
            <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Page précédente</span>
          </button>
        </div>

        {/* Search Suggestion with slide-up animation */}
        <div className={`mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 transform transition-all duration-1000 delay-700 hover:shadow-md ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center gap-3 text-gray-600">
            <Search size={20} className="text-blue-500 animate-bounce-slow" />
            <p>Essayez de rechercher ce que vous cherchez</p>
          </div>
          <div className="mt-4 relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Help Text with fade-in animation */}
        <div className={`mt-8 text-sm text-gray-500 transform transition-all duration-1000 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="flex items-center justify-center gap-2">
            <HelpCircle size={16} className="text-blue-500" />
            Besoin d'aide ?{" "}
            <Link 
              to="/support" 
              className="text-blue-600 hover:text-blue-700 font-medium group"
            >
              Contactez notre support
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 