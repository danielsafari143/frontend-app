import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  FileSpreadsheet,
  FileText,
  FileCheck,
  FileWarning,
  FileX,
  BarChart3,
  PieChart,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  category: string;
  balance: number;
  previousBalance: number;
  change: number;
}

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  status: 'draft' | 'posted' | 'cancelled';
  total: number;
  lines: JournalEntryLine[];
}

interface JournalEntryLine {
  id: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
}

export default function GeneralLedger() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q1');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  // Sample data for accounts
  const accounts: Account[] = [
    {
      id: '1',
      code: '101',
      name: 'Caisse',
      type: 'asset',
      category: 'Actifs',
      balance: 5000000,
      previousBalance: 4500000,
      change: 11.11,
    },
    {
      id: '2',
      code: '102',
      name: 'Banque',
      type: 'asset',
      category: 'Actifs',
      balance: 15000000,
      previousBalance: 14000000,
      change: 7.14,
    },
    // Add more accounts...
  ];

  // Sample data for journal entries
  const entries: JournalEntry[] = [
    {
      id: '1',
      date: '2024-03-15',
      reference: 'JV-2024-001',
      description: 'Vente de marchandises',
      status: 'posted',
      total: 5000,
      lines: [
        {
          id: '1-1',
          accountCode: '411',
          accountName: 'Clients',
          description: 'Vente de marchandises',
          debit: 5000,
          credit: 0,
        },
        {
          id: '1-2',
          accountCode: '707',
          accountName: 'Ventes de marchandises',
          description: 'Vente de marchandises',
          debit: 0,
          credit: 5000,
        },
      ],
    },
    // Add more entries...
  ];

  const toggleEntry = (entryId: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const formatChange = (change: number) => {
    const color = change >= 0 ? 'text-green-600' : 'text-red-600';
    const sign = change >= 0 ? '+' : '';
    return <span className={color}>{sign}{change.toFixed(2)}%</span>;
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
              <BookOpen className="w-7 h-7 text-blue-600" />
              Grand Livre
            </h1>
            <p className="text-gray-500">Gestion du grand livre</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nouvelle écriture
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2024-Q1">Q1 2024</option>
          <option value="2023-Q4">Q4 2023</option>
          <option value="2023-Q3">Q3 2023</option>
          <option value="2023-Q2">Q2 2023</option>
        </select>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="draft">Brouillon</option>
          <option value="posted">Comptabilisé</option>
          <option value="cancelled">Annulé</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Accounts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actifs</h2>
          <div className="space-y-4">
            {accounts
              .filter(account => account.type === 'asset')
              .map(account => (
                <div key={account.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatAmount(account.balance)}</div>
                    <div className="text-sm">{formatChange(account.change)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Passifs</h2>
          <div className="space-y-4">
            {accounts
              .filter(account => account.type === 'liability')
              .map(account => (
                <div key={account.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatAmount(account.balance)}</div>
                    <div className="text-sm">{formatChange(account.change)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Capitaux Propres</h2>
          <div className="space-y-4">
            {accounts
              .filter(account => account.type === 'equity')
              .map(account => (
                <div key={account.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{formatAmount(account.balance)}</div>
                    <div className="text-sm">{formatChange(account.change)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Écritures Comptables</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <React.Fragment key={entry.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEntry(entry.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedEntries.has(entry.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm text-gray-900">{entry.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{entry.reference}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{entry.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{formatAmount(entry.total)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(entry.status)}`}>
                        {entry.status === 'posted' ? 'Comptabilisé' : 
                         entry.status === 'draft' ? 'Brouillon' : 'Annulé'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEntries.has(entry.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Compte</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Débit</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Crédit</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {entry.lines.map((line) => (
                                <tr key={line.id}>
                                  <td className="px-4 py-2">
                                    <div className="text-sm font-medium text-gray-900">{line.accountCode}</div>
                                    <div className="text-sm text-gray-500">{line.accountName}</div>
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900">{line.description}</td>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-right">
                                    {line.debit > 0 ? formatAmount(line.debit) : ''}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 text-right">
                                    {line.credit > 0 ? formatAmount(line.credit) : ''}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 