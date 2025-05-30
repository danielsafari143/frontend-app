import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ChevronDown,
  PieChart,
  LineChart,
  BarChart3,
  AlertTriangle,
  Box,
  Truck,
} from 'lucide-react';

interface InventoryMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface StockCategory {
  name: string;
  quantity: number;
  percentage: number;
  color: string;
}

interface LowStockItem {
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  lastRestock: string;
}

interface StockMovement {
  type: 'in' | 'out';
  product: string;
  quantity: number;
  date: string;
  reference: string;
}

export default function InventoryReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: InventoryMetric[] = [
    {
      title: 'Valeur du Stock',
      value: '75,000,000 FCFA',
      change: 3.2,
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Articles en Stock',
      value: '1,250',
      change: 5.5,
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: 'Articles Faibles',
      value: '25',
      change: -2.1,
      trend: 'down',
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: 'Rotation du Stock',
      value: '4.2',
      change: 0.8,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const stockCategories: StockCategory[] = [
    {
      name: 'Électronique',
      quantity: 450,
      percentage: 36,
      color: 'bg-blue-500',
    },
    {
      name: 'Vêtements',
      quantity: 350,
      percentage: 28,
      color: 'bg-green-500',
    },
    {
      name: 'Alimentation',
      quantity: 250,
      percentage: 20,
      color: 'bg-yellow-500',
    },
    {
      name: 'Autres',
      quantity: 200,
      percentage: 16,
      color: 'bg-gray-500',
    },
  ];

  const lowStockItems: LowStockItem[] = [
    {
      name: 'Smartphone X',
      category: 'Électronique',
      currentStock: 5,
      minStock: 10,
      lastRestock: '2024-03-15',
    },
    {
      name: 'Laptop Pro',
      category: 'Électronique',
      currentStock: 3,
      minStock: 8,
      lastRestock: '2024-03-10',
    },
    {
      name: 'T-shirt Premium',
      category: 'Vêtements',
      currentStock: 15,
      minStock: 20,
      lastRestock: '2024-03-20',
    },
  ];

  const recentMovements: StockMovement[] = [
    {
      type: 'in',
      product: 'Smartphone X',
      quantity: 50,
      date: '2024-03-25',
      reference: 'REC-001',
    },
    {
      type: 'out',
      product: 'Laptop Pro',
      quantity: 10,
      date: '2024-03-24',
      reference: 'SALE-002',
    },
    {
      type: 'in',
      product: 'T-shirt Premium',
      quantity: 100,
      date: '2024-03-23',
      reference: 'REC-003',
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
                <h1 className="text-2xl font-bold text-gray-900">Rapport d'Inventaire</h1>
                <p className="text-gray-500 mt-1">Analyse des stocks et des mouvements</p>
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
            {/* Stock Categories */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition par Catégorie</h2>
              <div className="space-y-4">
                {stockCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <Box className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {category.quantity} articles
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{category.percentage}% du stock</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Items */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Articles en Stock Faible</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="pb-4">Article</th>
                      <th className="pb-4">Catégorie</th>
                      <th className="pb-4">Stock Actuel</th>
                      <th className="pb-4">Stock Minimum</th>
                      <th className="pb-4">Dernier Réappro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {lowStockItems.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4">
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-500">{item.category}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-red-600">
                            {item.currentStock} unités
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-900">{item.minStock} unités</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-500">{item.lastRestock}</span>
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
            {/* Recent Movements */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Mouvements Récents</h2>
              <div className="space-y-4">
                {recentMovements.map((movement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      movement.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {movement.type === 'in' ? (
                        <Truck className="w-5 h-5 text-green-600" />
                      ) : (
                        <Package className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{movement.product}</span>
                        <span className={`text-sm font-medium ${
                          movement.type === 'in' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.type === 'in' ? '+' : '-'}{movement.quantity} unités
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{movement.date}</span>
                        <span className="text-xs text-gray-500">{movement.reference}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Value Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Valeur du Stock</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Inventory Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de l'Inventaire</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Valeur Totale</span>
                  <span className="text-sm font-medium text-green-600">75,000,000 FCFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Articles en Stock</span>
                  <span className="text-sm font-medium text-gray-900">1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Articles Faibles</span>
                  <span className="text-sm font-medium text-red-600">25</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Rotation du Stock</span>
                    <span className="text-sm font-medium text-green-600">4.2 fois/an</span>
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