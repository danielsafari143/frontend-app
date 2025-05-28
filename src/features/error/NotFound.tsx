import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">Page non trouvée</p>
        <p className="text-gray-500 mt-2">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
} 