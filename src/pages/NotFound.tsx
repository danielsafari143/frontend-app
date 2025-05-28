import React from "react";
import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-blue-100 select-none">404</h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Oups! Page non trouvée
          </h2>
          <p className="text-gray-600 text-lg">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Home size={20} />
            <span>Retour à l'accueil</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md border border-gray-200"
          >
            <ArrowLeft size={20} />
            <span>Page précédente</span>
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 text-gray-600">
            <Search size={20} className="text-blue-500" />
            <p>Essayez de rechercher ce que vous cherchez</p>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Besoin d'aide ?{" "}
          <Link to="/support" className="text-blue-600 hover:text-blue-700 font-medium">
            Contactez notre support
          </Link>
        </p>
      </div>
    </div>
  );
} 