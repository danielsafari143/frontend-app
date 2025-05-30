import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  PieChart,
  LineChart,
} from 'lucide-react';

interface FinancialMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface RevenueCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function FinancialReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: FinancialMetric[] = [
    {
      title: 'Chiffre d\'Affaires',
      value: '125,000,000 FCFA',
      change: 5.2,
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Bénéfice Net',
      value: '25,000,000 FCFA',
      change: 3.1,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Dépenses Totales',
      value: '95,000,000 FCFA',
      change: -2.4,
      trend: 'down',
      icon: <ArrowDownRight className="w-6 h-6" />,
    },
    {
      title: 'Marge Brute',
      value: '30,000,000 FCFA',
      change: 1.8,
      trend: 'up',
      icon: <ArrowUpRight className="w-6 h-6" />,
    },
  ];

  const revenueCategories: RevenueCategory[] = [
    {
      name: 'Ventes de Produits',
      amount: 75000000,
      percentage: 60,
      color: 'bg-blue-500',
    },
    {
      name: 'Services',
      amount: 35000000,
      percentage: 28,
      color: 'bg-green-500',
    },
    {
      name: 'Autres Revenus',
      amount: 15000000,
      percentage: 12,
      color: 'bg-yellow-500',
    },
  ];

  const expenseCategories: ExpenseCategory[] = [
    {
      name: 'Personnel',
      amount: 40000000,
      percentage: 42,
      color: 'bg-red-500',
    },
    {
      name: 'Fournitures',
      amount: 25000000,
      percentage: 26,
      color: 'bg-purple-500',
    },
    {
      name: 'Marketing',
      amount: 15000000,
      percentage: 16,
      color: 'bg-indigo-500',
    },
    {
      name: 'Autres Dépenses',
      amount: 15000000,
      percentage: 16,
      color: 'bg-gray-500',
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
                <h1 className="text-2xl font-bold text-gray-900">Rapport Financier</h1>
                <p className="text-gray-500 mt-1">Analyse détaillée des performances financières</p>
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
            {/* Revenue Categories */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition des Revenus</h2>
              <div className="space-y-4">
                {revenueCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {category.amount.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{category.percentage}% du total</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Categories */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition des Dépenses</h2>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      <ArrowDownRight className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {category.amount.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{category.percentage}% du total</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Revenus</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Expense Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Dépenses</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <PieChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé Financier</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Revenus Totaux</span>
                  <span className="text-sm font-medium text-green-600">125,000,000 FCFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Dépenses Totales</span>
                  <span className="text-sm font-medium text-red-600">-95,000,000 FCFA</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Bénéfice Net</span>
                    <span className="text-sm font-medium text-green-600">+30,000,000 FCFA</span>
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