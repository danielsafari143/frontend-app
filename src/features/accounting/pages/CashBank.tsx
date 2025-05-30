import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  FileSpreadsheet,
  Banknote,
  CreditCard,
  PiggyBank,
  TrendingUp,
  FileCheck,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank';
  balance: number;
  currency: string;
  lastReconciliation: string;
  status: 'reconciled' | 'pending';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'in' | 'out';
  account: string;
  status: 'cleared' | 'pending';
}

export default function CashBank() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());

  // Sample data for accounts
  const accounts: Account[] = [
    {
      id: '1',
      name: 'Caisse principale',
      type: 'cash',
      balance: 2000000,
      currency: 'FCFA',
      lastReconciliation: '2024-03-31',
      status: 'reconciled',
    },
    {
      id: '2',
      name: 'Banque BICICI',
      type: 'bank',
      balance: 8000000,
      currency: 'FCFA',
      lastReconciliation: '2024-03-28',
      status: 'pending',
    },
    // Add more accounts...
  ];

  // Sample data for transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-04-01',
      description: 'Dépôt espèces',
      amount: 500000,
      type: 'in',
      account: 'Caisse principale',
      status: 'cleared',
    },
    {
      id: '2',
      date: '2024-03-30',
      description: 'Paiement fournisseur',
      amount: 300000,
      type: 'out',
      account: 'Banque BICICI',
      status: 'pending',
    },
    // Add more transactions...
  ];

  const toggleAccount = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/accounting')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-7 h-7 text-orange-600" />
              Trésorerie
            </h1>
            <p className="text-gray-500">Gestion de la trésorerie</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Plus className="w-4 h-4" /> Nouveau mouvement
          </button>
        </div>
      </div>

      {/* Accounts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{account.name}</div>
                <div className="text-sm text-gray-500 capitalize">{account.type === 'cash' ? 'Caisse' : 'Banque'}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formatAmount(account.balance)}</div>
                <div className="text-xs text-gray-500">{account.currency}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-500">Dernier rapprochement: {account.lastReconciliation}</div>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                account.status === 'reconciled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {account.status === 'reconciled' ? 'Rapproché' : 'À rapprocher'}
              </span>
            </div>
            <button
              onClick={() => toggleAccount(account.id)}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {expandedAccounts.has(account.id) ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Voir les transactions
                </>
              )}
            </button>
            {expandedAccounts.has(account.id) && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Transactions récentes</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Montant</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.filter(t => t.account === account.name).map((t) => (
                        <tr key={t.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{t.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{t.description}</td>
                          <td className={`px-4 py-2 text-sm text-right ${t.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'in' ? '+' : '-'}{formatAmount(t.amount)}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                              t.status === 'cleared' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {t.status === 'cleared' ? 'Validé' : 'En attente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filters and Export */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Période: Ce mois</option>
          <option>Période: Le mois dernier</option>
          <option>Période: Cette année</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>
    </div>
  );
} 