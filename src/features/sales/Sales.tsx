import React from 'react';
import { Link } from 'react-router';
import {
  FileText,
  ShoppingCart,
  Package,
  Receipt,
  RotateCcw,
  Percent,
  BarChart3,
  ArrowRight,
  Plus,
} from 'lucide-react';

export default function Sales() {
  const sections = [
    {
      name: "Devis",
      description: "Gérez vos devis et propositions commerciales",
      href: '/quotations',
      icon: FileText,
      color: 'bg-blue-500',
      stats: "12 devis en cours",
    },
    {
      name: "Commandes",
      description: "Suivez vos commandes clients",
      href: '/sales/orders',
      icon: ShoppingCart,
      color: 'bg-green-500',
      stats: "5 commandes en attente",
    },
    {
      name: "Livraisons",
      description: "Gérez vos livraisons et expéditions",
      href: '/sales/deliveries',
      icon: Package,
      color: 'bg-purple-500',
      stats: "3 livraisons en cours",
    },
    {
      name: "Factures",
      description: "Créez et suivez vos factures",
      href: '/sales/invoices',
      icon: Receipt,
      color: 'bg-yellow-500',
      stats: "8 factures en attente",
    },
    {
      name: "Retours",
      description: "Gérez les retours et remboursements",
      href: '/sales/returns',
      icon: RotateCcw,
      color: 'bg-red-500',
      stats: "2 retours en cours",
    },
    {
      name: "Remises",
      description: "Configurez vos remises et promotions",
      href: '/sales/discounts',
      icon: Percent,
      color: 'bg-indigo-500',
      stats: "4 remises actives",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Ventes</h1>
              <p className="mt-1 text-sm text-gray-500">Gérez vos ventes en toute simplicité</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/sales/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.href}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                    <section.icon className={`h-6 w-6 ${section.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                      {section.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{section.stats}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/quotations/create"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouveau devis
            </Link>
            <Link
              to="/sales/orders/create"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouvelle commande
            </Link>
            <Link
              to="/sales/invoices/create"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouvelle facture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 