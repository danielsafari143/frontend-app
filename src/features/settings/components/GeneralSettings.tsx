import React from "react";

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Language */}
        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Langue
          </label>
          <select
            id="language"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Devise
          </label>
          <select
            id="currency"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="CDF">Franc Congolais (CDF)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="space-y-2">
          <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
            Format de date
          </label>
          <input
            type="text"
            id="dateFormat"
            defaultValue="DD/MM/YYYY"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
            Fuseau horaire
          </label>
          <input
            type="text"
            id="timezone"
            defaultValue="Africa/Kinshasa"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Decimal Precision */}
        <div className="space-y-2">
          <label htmlFor="decimalPrecision" className="block text-sm font-medium text-gray-700">
            Précision décimale
          </label>
          <input
            type="number"
            id="decimalPrecision"
            defaultValue={2}
            min={0}
            max={4}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
            Couleur principale
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              id="primaryColor"
              defaultValue="#2563EB"
              className="w-10 h-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              defaultValue="#2563EB"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Logo
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Logo</span>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
            Changer le logo
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
} 