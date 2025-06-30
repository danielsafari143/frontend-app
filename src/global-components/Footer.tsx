import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-4 z-40">
      <div className="max-w-full px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-end gap-x-10">         
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} nCalc. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Conditions d'utilisation
            </a>
            <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Politique de confidentialité
            </a>
            <a href="/help" className="text-sm text-gray-600 hover:text-gray-900">
              Aide
            </a>
            <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
