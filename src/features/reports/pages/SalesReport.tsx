import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  ChevronDown,
  Users,
  Package,
  DollarSign,
  PieChart,
  LineChart,
  BarChart3,
} from 'lucide-react';

interface SalesMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface ProductCategory {
  name: string;
  sales: number;
  percentage: number;
  color: string;
}

interface TopProduct {
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

export default function SalesReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: SalesMetric[] = [
    {
      title: 'Ventes Totales',
      value: '85,000,000 FCFA',
      change: 8.5,
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: 'Nombre de Commandes',
      value: '1,250',
      change: 12.3,
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: 'Panier Moyen',
      value: '68,000 FCFA',
      change: -2.1,
      trend: 'down',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Clients Actifs',
      value: '850',
      change: 5.7,
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const productCategories: ProductCategory[] = [
    {
      name: 'Électronique',
      sales: 35000000,
      percentage: 41,
      color: 'bg-blue-500',
    },
    {
      name: 'Vêtements',
      sales: 25000000,
      percentage: 29,
      color: 'bg-green-500',
    },
    {
      name: 'Alimentation',
      sales: 15000000,
      percentage: 18,
      color: 'bg-yellow-500',
    },
    {
      name: 'Autres',
      sales: 10000000,
      percentage: 12,
      color: 'bg-gray-500',
    },
  ];

  const topProducts: TopProduct[] = [
    {
      name: 'Smartphone X',
      category: 'Électronique',
      sales: 150,
      revenue: 15000000,
      growth: 15.5,
    },
    {
      name: 'Laptop Pro',
      category: 'Électronique',
      sales: 80,
      revenue: 12000000,
      growth: 8.2,
    },
    {
      name: 'T-shirt Premium',
      category: 'Vêtements',
      sales: 300,
      revenue: 6000000,
      growth: 12.8,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/reports')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rapport de Ventes</h1>
                <p className="text-gray-500 mt-1">Analyse des ventes et des performances commerciales</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'excel')}
                  className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-5 h-5" />
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selection */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setSelectedPeriod('quarter')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Année
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-5 h-5" />
            Période Personnalisée
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Categories */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition par Catégorie</h2>
              <div className="space-y-4">
                {productCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {category.sales.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{category.percentage}% des ventes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Meilleurs Produits</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="pb-4">Produit</th>
                      <th className="pb-4">Catégorie</th>
                      <th className="pb-4">Ventes</th>
                      <th className="pb-4">Revenus</th>
                      <th className="pb-4">Croissance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="py-4">
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-500">{product.category}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-900">{product.sales} unités</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-900">
                            {product.revenue.toLocaleString('fr-FR')} FCFA
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-green-600">
                            +{product.growth}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Sales Trend Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendance des Ventes</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Sales Distribution Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribution des Ventes</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <PieChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Sales Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Ventes</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Ventes Totales</span>
                  <span className="text-sm font-medium text-green-600">85,000,000 FCFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Nombre de Commandes</span>
                  <span className="text-sm font-medium text-gray-900">1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Panier Moyen</span>
                  <span className="text-sm font-medium text-gray-900">68,000 FCFA</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Croissance</span>
                    <span className="text-sm font-medium text-green-600">+8.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 