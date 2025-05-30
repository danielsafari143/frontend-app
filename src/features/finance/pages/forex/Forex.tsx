import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change: number;
  lastUpdate: string;
}

interface ForexTransaction {
  id: string;
  date: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  total: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'buy' | 'sell';
}

export default function Forex() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const exchangeRates: ExchangeRate[] = [
    {
      id: '1',
      fromCurrency: 'USD',
      toCurrency: 'FCFA',
      rate: 650.25,
      change: 0.5,
      lastUpdate: '2024-03-20 10:30',
    },
    {
      id: '2',
      fromCurrency: 'EUR',
      toCurrency: 'FCFA',
      rate: 700.15,
      change: -0.3,
      lastUpdate: '2024-03-20 10:30',
    },
    {
      id: '3',
      fromCurrency: 'GBP',
      toCurrency: 'FCFA',
      rate: 820.75,
      change: 0.2,
      lastUpdate: '2024-03-20 10:30',
    },
  ];

  const transactions: ForexTransaction[] = [
    {
      id: '1',
      date: '2024-03-20',
      fromCurrency: 'USD',
      toCurrency: 'FCFA',
      amount: 10000,
      rate: 650.25,
      total: 6502500,
      status: 'completed',
      type: 'buy',
    },
    {
      id: '2',
      date: '2024-03-19',
      fromCurrency: 'EUR',
      toCurrency: 'FCFA',
      amount: 5000,
      rate: 700.15,
      total: 3500750,
      status: 'pending',
      type: 'sell',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      case 'failed':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-5 h-5" />;
      case 'EUR':
        return <Euro className="w-5 h-5" />;
      case 'GBP':
        return <PoundSterling className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Forex</h1>
            <p className="text-gray-500">Gestion des opérations de change</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/finance/forex/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Opération
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une opération..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Exporter
          </button>
        </div>
      </div>

      {/* Exchange Rates */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Taux de Change</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exchangeRates.map(rate => (
            <div key={rate.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCurrencyIcon(rate.fromCurrency)}
                  <span className="font-medium">{rate.fromCurrency}/{rate.toCurrency}</span>
                </div>
                <span className={`text-sm ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rate.change >= 0 ? '+' : ''}{rate.change}%
                </span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{rate.rate}</span>
                <span className="text-sm text-gray-500 ml-2">{rate.toCurrency}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Dernière mise à jour: {rate.lastUpdate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Opérations Récentes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {transaction.type === 'buy' ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {transaction.type === 'buy' ? 'Achat' : 'Vente'} {transaction.fromCurrency}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {transaction.amount.toLocaleString('fr-FR')} {transaction.fromCurrency} @ {transaction.rate}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.total.toLocaleString('fr-FR')} {transaction.toCurrency}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'completed' ? 'Terminé' :
                       transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/finance/forex/${transaction.id}`)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 