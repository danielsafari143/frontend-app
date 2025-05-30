import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Euro,
  PoundSterling,
  Banknote,
  ChevronDown,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';

interface FinancialMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface CurrencyBalance {
  currency: string;
  balance: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'inflow' | 'outflow';
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function TreasuryReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: FinancialMetric[] = [
    {
      title: 'Solde Total',
      value: '125,000,000 FCFA',
      change: 5.2,
      trend: 'up',
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      title: 'Encaissements',
      value: '45,000,000 FCFA',
      change: 3.1,
      trend: 'up',
      icon: <ArrowUpRight className="w-6 h-6" />,
    },
    {
      title: 'Décaissements',
      value: '38,000,000 FCFA',
      change: -2.4,
      trend: 'down',
      icon: <ArrowDownRight className="w-6 h-6" />,
    },
    {
      title: 'Flux Net',
      value: '7,000,000 FCFA',
      change: 1.8,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const currencyBalances: CurrencyBalance[] = [
    {
      currency: 'FCFA',
      balance: 85000000,
      change: 5.2,
      trend: 'up',
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      currency: 'USD',
      balance: 25000,
      change: -1.5,
      trend: 'down',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      currency: 'EUR',
      balance: 18000,
      change: 2.3,
      trend: 'up',
      icon: <Euro className="w-6 h-6" />,
    },
    {
      currency: 'GBP',
      balance: 12000,
      change: -0.8,
      trend: 'down',
      icon: <PoundSterling className="w-6 h-6" />,
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Paiement Client - Facture #1234',
      amount: 5000000,
      type: 'inflow',
      category: 'Ventes',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-03-14',
      description: 'Paiement Fournisseur - Facture #5678',
      amount: 2500000,
      type: 'outflow',
      category: 'Achats',
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-03-13',
      description: 'Paiement Client - Facture #1235',
      amount: 3000000,
      type: 'inflow',
      category: 'Ventes',
      status: 'pending',
    },
    {
      id: '4',
      date: '2024-03-12',
      description: 'Paiement Fournisseur - Facture #5679',
      amount: 1500000,
      type: 'outflow',
      category: 'Achats',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
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
                <h1 className="text-2xl font-bold text-gray-900">Rapport de Trésorerie</h1>
                <p className="text-gray-500 mt-1">Analyse détaillée des flux de trésorerie</p>
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
            {/* Currency Balances */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Soldes par Devise</h2>
              <div className="grid grid-cols-2 gap-4">
                {currencyBalances.map((balance, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {balance.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">{balance.currency}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {balance.balance.toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <span className={`text-sm font-medium ${
                      balance.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {balance.trend === 'up' ? '+' : ''}{balance.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Transactions Récentes</h2>
              </div>
              <div className="divide-y">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'inflow' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {transaction.type === 'inflow' ? (
                          <ArrowUpRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{transaction.description}</h3>
                        <p className="text-sm text-gray-500">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-medium ${
                        transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'inflow' ? '+' : '-'}{transaction.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En cours' : 'Échoué'}
                      </span>
                      <span className="text-sm text-gray-500">{transaction.date}</span>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Évolution du Solde</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Cash Flow Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Flux</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Encaissements</span>
                  <span className="text-sm font-medium text-green-600">+45,000,000 FCFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Décaissements</span>
                  <span className="text-sm font-medium text-red-600">-38,000,000 FCFA</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Flux Net</span>
                    <span className="text-sm font-medium text-green-600">+7,000,000 FCFA</span>
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