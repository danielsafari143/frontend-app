import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Building2,
  Globe,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Euro,
  PoundSterling,
  Banknote,
  ChevronRight,
  Plus,
  Download,
  Calendar,
  CreditCard,
  Users,
} from 'lucide-react';
import LoadingSpinner from '../../../global-components/ui/LoadingSpinner';

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
  icon: React.ReactNode;
}

interface Module {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    // ... existing state ...
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockData = {
      // ... existing mock data ...
    };
    setDashboardData(mockData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const metrics: FinancialMetric[] = [
    {
      title: 'Solde Total',
      value: '125,000,000 FCFA',
      change: 5.2,
      trend: 'up',
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: 'Encaissements du Mois',
      value: '45,000,000 FCFA',
      change: 3.1,
      trend: 'up',
      icon: <ArrowUpRight className="w-6 h-6" />,
    },
    {
      title: 'Décaissements du Mois',
      value: '38,000,000 FCFA',
      change: -2.4,
      trend: 'down',
      icon: <ArrowDownRight className="w-6 h-6" />,
    },
    {
      title: 'Prévisions Mensuelles',
      value: '42,000,000 FCFA',
      change: 1.8,
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const currencyBalances: CurrencyBalance[] = [
    {
      currency: 'FCFA',
      balance: 85000000,
      icon: <Banknote className="w-6 h-6" />,
    },
    {
      currency: 'USD',
      balance: 25000,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      currency: 'EUR',
      balance: 18000,
      icon: <Euro className="w-6 h-6" />,
    },
    {
      currency: 'GBP',
      balance: 12000,
      icon: <PoundSterling className="w-6 h-6" />,
    },
  ];

  const modules: Module[] = [
    {
      title: 'Trésorerie',
      description: 'Gestion des comptes bancaires et flux de trésorerie',
      icon: <Wallet className="w-8 h-8" />,
      path: '/finance/treasury',
      color: 'bg-blue-500',
    },
    {
      title: 'Encaissements & Décaissements',
      description: 'Gestion des entrées et sorties de fonds',
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/finance/cash-flow',
      color: 'bg-green-500',
    },
    {
      title: 'Budgets & Prévisions',
      description: 'Planification et suivi budgétaire',
      icon: <TrendingUp className="w-8 h-8" />,
      path: '/finance/budgeting',
      color: 'bg-yellow-500',
    },
    {
      title: 'Analyse Financière',
      description: 'Tableaux de bord et analyses',
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/finance/analysis',
      color: 'bg-pink-500',
    },
    {
      title: 'Relations Bancaires',
      description: 'Gestion des relations avec les banques',
      icon: <Building2 className="w-8 h-8" />,
      path: '/finance/bank-relations',
      color: 'bg-purple-500',
    },
    {
      title: 'Gestion des Devises',
      description: 'Gestion des risques de change',
      icon: <Globe className="w-8 h-8" />,
      path: '/finance/forex',
      color: 'bg-teal-500',
    },
    {
      title: 'Gestion des Emprunts',
      description: 'Suivi des prêts et dettes',
      icon: <FileText className="w-8 h-8" />,
      path: '/finance/loans',
      color: 'bg-indigo-500',
    },
    {
      title: 'Investissements',
      description: 'Gestion des placements financiers',
      icon: <TrendingUp className="w-8 h-8" />,
      path: '/finance/investments',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Financier</h1>
              <p className="text-gray-500 mt-1">Vue d'ensemble de la situation financière</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/finance/reports')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-5 h-5" />
                Rapports
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-5 h-5" />
                Nouvelle Opération
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Soldes par Devise</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {currencyBalances.map((balance, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {balance.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{balance.currency}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {balance.balance.toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => navigate(module.path)}
                  className="flex items-start p-6 bg-white rounded-xl border hover:shadow-md transition-all group"
                >
                  <div className={`p-3 rounded-lg ${module.color} mr-4`}>
                    {module.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{module.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Payments */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Échéances à Venir</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Calendrier
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Paiement de prêt
                    </p>
                    <p className="text-sm text-yellow-600">
                      5,000,000 FCFA dans 3 jours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Facture fournisseur
                    </p>
                    <p className="text-sm text-blue-600">
                      2,500,000 FCFA dans 5 jours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Alertes</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Voir tout
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-900">
                      Solde faible sur le compte principal
                    </p>
                    <p className="text-sm text-red-600">
                      Le solde est inférieur au minimum requis
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Échéance de prêt à venir
                    </p>
                    <p className="text-sm text-yellow-600">
                      Paiement de 5,000,000 FCFA dans 3 jours
                    </p>
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