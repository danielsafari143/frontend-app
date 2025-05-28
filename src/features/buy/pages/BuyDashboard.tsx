import React from 'react';
import {
  BarChart3,
  ShoppingBag,
  Package,
  Receipt,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function BuyDashboard() {
  const stats = [
    {
      name: "Commandes en cours",
      value: "12",
      change: "+2",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      name: "Réceptions en attente",
      value: "5",
      change: "-1",
      trend: "down",
      icon: Package,
      color: "bg-green-500",
    },
    {
      name: "Factures à payer",
      value: "8",
      change: "+3",
      trend: "up",
      icon: Receipt,
      color: "bg-yellow-500",
    },
    {
      name: "Retours fournisseurs",
      value: "2",
      change: "0",
      trend: "neutral",
      icon: AlertCircle,
      color: "bg-red-500",
    },
  ];

  const recentActivities = [
    {
      type: "Commande",
      description: "Commande #PO-2024-001 créée",
      date: "Il y a 2 heures",
      status: "En attente",
    },
    {
      type: "Réception",
      description: "Réception #REC-2024-003 validée",
      date: "Il y a 4 heures",
      status: "Terminée",
    },
    {
      type: "Facture",
      description: "Facture #INV-2024-008 reçue",
      date: "Il y a 1 jour",
      status: "À payer",
    },
    {
      type: "Retour",
      description: "Retour #RET-2024-002 initié",
      date: "Il y a 2 jours",
      status: "En cours",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord des achats</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble de vos activités d'achat
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <BarChart3 className="h-5 w-5 mr-2 text-gray-400" />
            Exporter le rapport
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : stat.trend === 'down' ? (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                ) : null}
                <span
                  className={`ml-1 text-sm font-medium ${
                    stat.trend === 'up'
                      ? 'text-green-500'
                      : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">{stat.value}</h3>
              <p className="mt-1 text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Activités récentes</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivities.map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{activity.date}</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'Terminée'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'En attente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : activity.status === 'À payer'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 