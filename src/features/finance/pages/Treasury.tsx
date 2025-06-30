import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Banknote,
  DollarSign,
  Euro,
  PoundSterling,
  ChevronDown,
  ChevronRight,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  Calendar,
} from 'lucide-react';
import LoadingSpinner from '../../../global-components/ui/LoadingSpinner';

interface BankAccount {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  currency: string;
  balance: number;
  lastReconciliation: string;
  status: 'reconciled' | 'pending' | 'overdue';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'in' | 'out';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

export default function Treasury() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [treasuryData, setTreasuryData] = useState<{
    accounts: BankAccount[];
    transactions: Transaction[];
    balances: Record<string, number>;
  }>({
    accounts: [],
    transactions: [],
    balances: {},
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockData = {
      accounts: [
        {
          id: '1',
          name: 'Compte Principal',
          bank: 'UBA',
          accountNumber: 'CI0012345678',
          currency: 'XOF',
          balance: 25000000,
          lastReconciliation: '2024-03-15',
          status: 'reconciled' as const,
        },
        {
          id: '2',
          name: 'Compte Épargne',
          bank: 'SGBCI',
          accountNumber: 'CI0098765432',
          currency: 'XOF',
          balance: 15000000,
          lastReconciliation: '2024-03-10',
          status: 'pending' as const,
        },
      ],
      transactions: [
        {
          id: '1',
          date: '2024-03-20',
          description: 'Virement client',
          amount: 5000000,
          type: 'in' as const,
          status: 'completed' as const,
          reference: 'INV-2024-001',
        },
        {
          id: '2',
          date: '2024-03-19',
          description: 'Paiement fournisseur',
          amount: 2500000,
          type: 'out' as const,
          status: 'pending' as const,
          reference: 'PO-2024-002',
        },
      ],
      balances: {
        'XOF': 40000000,
        'USD': 50000,
        'EUR': 30000,
      },
    };
    setTreasuryData(mockData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-5 h-5" />;
      case 'EUR':
        return <Euro className="w-5 h-5" />;
      case 'GBP':
        return <PoundSterling className="w-5 h-5" />;
      default:
        return <Banknote className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reconciled':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
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
            <h1 className="text-2xl font-bold text-gray-900">Gestion de Trésorerie</h1>
            <p className="text-gray-500">Gestion des comptes bancaires et flux de trésorerie</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/finance/treasury/new-account')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau Compte
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
              placeholder="Rechercher un compte ou une transaction..."
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

      {/* Bank Accounts */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {treasuryData.accounts.map(account => (
          <div key={account.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getCurrencyIcon(account.currency)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500">
                    {account.bank} - {account.accountNumber}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-medium text-gray-900">
                      {account.balance.toLocaleString('fr-FR')} {account.currency}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(account.status)}`}>
                      {account.status === 'reconciled' ? 'Réconcilié' :
                       account.status === 'pending' ? 'En attente' : 'En retard'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowReconciliationModal(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/finance/treasury/${account.id}`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Transactions Récentes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {treasuryData.transactions.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'in' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {transaction.type === 'in' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'in' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'in' ? '+' : '-'}
                  {transaction.amount.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reconciliation Modal */}
      {showReconciliationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Réconciliation Bancaire
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de réconciliation
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Solde bancaire
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowReconciliationModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowReconciliationModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Réconcilier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 