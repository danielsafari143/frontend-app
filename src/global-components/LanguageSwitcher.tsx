import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => {
          const newLang = i18n.language === 'fr' ? 'en' : 'fr';
          changeLanguage(newLang);
        }}
      >
        <Globe className="h-4 w-4 mr-2" />
        {i18n.language === 'fr' ? t('fr') : t('en')}
      </button>
    </div>
  );
} 