import React from 'react';
import { Link } from 'react-router';
import {
  BarChart3,
  FileText,
  Package,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
} from 'lucide-react';

export default function SalesDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord des ventes</h1>
        <div className="flex gap-3">
          <Link
            to="/sell-buy/orders/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Nouvelle commande
          </Link>
          <Link
            to="/sell-buy/quotations/new"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Nouveau devis
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Chiffre d'affaires"
          value="1,234,567 CDF"
          change="+12.5%"
          isPositive={true}
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        />
        <MetricCard
          title="Commandes"
          value="156"
          change="+8.2%"
          isPositive={true}
          icon={<ShoppingCart className="h-6 w-6 text-green-600" />}
        />
        <MetricCard
          title="Devis en attente"
          value="23"
          change="-3.1%"
          isPositive={false}
          icon={<FileText className="h-6 w-6 text-yellow-600" />}
        />
        <MetricCard
          title="Livraisons"
          value="89"
          change="+5.4%"
          isPositive={true}
          icon={<Package className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Commandes récentes</h2>
          <div className="space-y-4">
            {/* Add recent orders list here */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Factures en attente</h2>
          <div className="space-y-4">
            {/* Add pending invoices list here */}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span
          className={`ml-2 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
} 