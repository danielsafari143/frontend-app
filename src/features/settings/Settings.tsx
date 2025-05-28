import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  ShoppingCart,
  Package,
  Calculator,
  Bell,
  FileText,
  CreditCard,
  Globe,
  ChevronRight,
} from "lucide-react";
import GeneralSettings from "./components/GeneralSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "general",
      label: "Paramètres Généraux",
      icon: <Globe className="w-5 h-5" />,
      component: <GeneralSettings />,
    },
    {
      id: "company",
      label: "Paramètres de l'entreprise",
      icon: <Building2 className="w-5 h-5" />,
      component: <div>Paramètres de l'entreprise</div>,
    },
    {
      id: "sales",
      label: "Paramètres des ventes",
      icon: <ShoppingCart className="w-5 h-5" />,
      component: <div>Paramètres des ventes</div>,
    },
    {
      id: "purchase",
      label: "Paramètres des achats",
      icon: <Package className="w-5 h-5" />,
      component: <div>Paramètres des achats</div>,
    },
    {
      id: "inventory",
      label: "Paramètres de l'inventaire",
      icon: <Package className="w-5 h-5" />,
      component: <div>Paramètres de l'inventaire</div>,
    },
    {
      id: "accounting",
      label: "Paramètres de la comptabilité",
      icon: <Calculator className="w-5 h-5" />,
      component: <div>Paramètres de la comptabilité</div>,
    },
    {
      id: "notifications",
      label: "Paramètres des notifications",
      icon: <Bell className="w-5 h-5" />,
      component: <div>Paramètres des notifications</div>,
    },
    {
      id: "documents",
      label: "Paramètres des documents",
      icon: <FileText className="w-5 h-5" />,
      component: <div>Paramètres des documents</div>,
    },
    {
      id: "payments",
      label: "Paramètres des paiements",
      icon: <CreditCard className="w-5 h-5" />,
      component: <div>Paramètres des paiements</div>,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">Gérez les paramètres de votre application</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-full flex items-center justify-between p-4 border-b border-gray-100"
        >
          <div className="flex items-center gap-2">
            {activeTabData?.icon}
            <span className="font-medium text-gray-900">{activeTabData?.label}</span>
          </div>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-gray-100">
            <div className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Tabs Navigation */}
        <div className="hidden lg:block border-b border-gray-100">
          <div className="flex flex-wrap gap-2 p-2 md:p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {activeTabData?.component}
        </div>
      </div>
    </div>
  );
} 