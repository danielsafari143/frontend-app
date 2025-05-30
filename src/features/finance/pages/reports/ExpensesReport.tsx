import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Filter,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Tag,
  Building2,
  Users,
  ShoppingCart,
  Wrench,
  Truck,
} from 'lucide-react';

interface ExpenseMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  vendor: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
}

export default function ExpensesReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: ExpenseMetric[] = [
    {
      title: 'Dépenses Totales',
      value: '38,000,000 FCFA',
      change: 2.4,
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Dépenses Fixes',
      value: '15,000,000 FCFA',
      change: 0.5,
      trend: 'up',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: 'Dépenses Variables',
      value: '23,000,000 FCFA',
      change: -1.2,
      trend: 'down',
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: 'Économies',
      value: '2,000,000 FCFA',
      change: 5.8,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const categories: ExpenseCategory[] = [
    {
      name: 'Personnel',
      amount: 12000000,
      percentage: 32,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      name: 'Fournitures',
      amount: 8000000,
      percentage: 21,
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      name: 'Maintenance',
      amount: 5000000,
      percentage: 13,
      icon: <Wrench className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      name: 'Transport',
      amount: 4000000,
      percentage: 11,
      icon: <Truck className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      name: 'Services',
      amount: 9000000,
      percentage: 23,
      icon: <Tag className="w-6 h-6" />,
      color: 'bg-red-500',
    },
  ];

  const recentExpenses: Expense[] = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Salaires du personnel',
      amount: 5000000,
      category: 'Personnel',
      vendor: 'RH',
      status: 'paid',
      paymentMethod: 'Virement',
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Fournitures de bureau',
      amount: 2500000,
      category: 'Fournitures',
      vendor: 'Office Supplies Co.',
      status: 'pending',
      paymentMethod: 'Carte',
    },
    {
      id: '3',
      date: '2024-03-13',
      description: 'Maintenance équipements',
      amount: 1500000,
      category: 'Maintenance',
      vendor: 'Tech Services',
      status: 'paid',
      paymentMethod: 'Virement',
    },
    {
      id: '4',
      date: '2024-03-12',
      description: 'Services de transport',
      amount: 2000000,
      category: 'Transport',
      vendor: 'Logistics Pro',
      status: 'overdue',
      paymentMethod: 'Chèque',
    },
  ];

  const getStatusColor = (status: Expense['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/finance/reports')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analyse des Dépenses</h1>
                <p className="text-gray-500 mt-1">Répartition et analyse des dépenses</p>
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
            {/* Expense Categories */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition par Catégorie</h2>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${category.color} text-white`}>
                      {category.icon}
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

            {/* Recent Expenses */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Dépenses Récentes</h2>
              </div>
              <div className="divide-y">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Tag className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{expense.description}</h3>
                        <p className="text-sm text-gray-500">{expense.vendor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-900">
                        {expense.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                        {expense.status === 'paid' ? 'Payé' : expense.status === 'pending' ? 'En attente' : 'En retard'}
                      </span>
                      <span className="text-sm text-gray-500">{expense.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Dépenses</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <PieChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Expense Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Dépenses</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Dépenses Fixes</span>
                  <span className="text-sm font-medium text-gray-900">15,000,000 FCFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Dépenses Variables</span>
                  <span className="text-sm font-medium text-gray-900">23,000,000 FCFA</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Total</span>
                    <span className="text-sm font-medium text-gray-900">38,000,000 FCFA</span>
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