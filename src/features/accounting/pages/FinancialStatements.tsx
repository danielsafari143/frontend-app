import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  FileSpreadsheet,
  BarChart3,
  PieChart,
  TrendingUp,
  FileBarChart,
  Plus,
  Search,
  Edit2,
  Trash2,
  FileCheck,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FinancialStatement {
  id: string;
  type: 'balance' | 'income' | 'cashflow';
  period: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'final';
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  sections: FinancialStatementSection[];
}

interface FinancialStatementSection {
  id: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  total: number;
  items: FinancialStatementItem[];
}

interface FinancialStatementItem {
  id: string;
  name: string;
  amount: number;
  previousAmount?: number;
  change?: number;
}

export default function FinancialStatements() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q1');
  const [expandedStatement, setExpandedStatement] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStatements, setExpandedStatements] = useState<Set<string>>(new Set());

  // Sample data
  const statements: FinancialStatement[] = [
    {
      id: '1',
      type: 'balance',
      period: '2024-Q1',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'final',
      totalAssets: 1500000,
      totalLiabilities: 800000,
      totalEquity: 700000,
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,
      sections: [
        {
          id: '1-1',
          name: 'Actifs',
          type: 'asset',
          total: 1500000,
          items: [
            {
              id: '1-1-1',
              name: 'Actifs immobilisés',
              amount: 800000,
              previousAmount: 750000,
              change: 6.67,
            },
            {
              id: '1-1-2',
              name: 'Actifs circulants',
              amount: 700000,
              previousAmount: 650000,
              change: 7.69,
            },
          ],
        },
        {
          id: '1-2',
          name: 'Passifs',
          type: 'liability',
          total: 800000,
          items: [
            {
              id: '1-2-1',
              name: 'Capitaux propres',
              amount: 700000,
              previousAmount: 650000,
              change: 7.69,
            },
            {
              id: '1-2-2',
              name: 'Dettes',
              amount: 100000,
              previousAmount: 150000,
              change: -33.33,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      type: 'income',
      period: '2024-Q1',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'final',
      totalAssets: 0,
      totalLiabilities: 0,
      totalEquity: 0,
      totalRevenue: 1200000,
      totalExpenses: 900000,
      netIncome: 300000,
      sections: [
        {
          id: '2-1',
          name: 'Produits',
          type: 'revenue',
          total: 1200000,
          items: [
            {
              id: '2-1-1',
              name: 'Ventes',
              amount: 1000000,
              previousAmount: 900000,
              change: 11.11,
            },
            {
              id: '2-1-2',
              name: 'Autres produits',
              amount: 200000,
              previousAmount: 150000,
              change: 33.33,
            },
          ],
        },
        {
          id: '2-2',
          name: 'Charges',
          type: 'expense',
          total: 900000,
          items: [
            {
              id: '2-2-1',
              name: 'Achats',
              amount: 600000,
              previousAmount: 550000,
              change: 9.09,
            },
            {
              id: '2-2-2',
              name: 'Frais généraux',
              amount: 300000,
              previousAmount: 250000,
              change: 20,
            },
          ],
        },
      ],
    },
  ];

  const toggleStatement = (statementId: string) => {
    setExpandedStatement(expandedStatement === statementId ? null : statementId);
  };

  const getStatementTypeIcon = (type: string) => {
    switch (type) {
      case 'balance':
        return <BarChart3 className="w-5 h-5" />;
      case 'income':
        return <TrendingUp className="w-5 h-5" />;
      case 'cashflow':
        return <PieChart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatementTypeName = (type: string) => {
    switch (type) {
      case 'balance':
        return 'Bilan';
      case 'income':
        return 'Compte de résultat';
      case 'cashflow':
        return 'Tableau de flux de trésorerie';
      default:
        return type;
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
              <FileBarChart className="w-7 h-7 text-blue-600" />
              États Financiers
            </h1>
            <p className="text-gray-500">Gestion des états financiers</p>
          </div>
        </div>
        <div className="flex gap-4">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" /> Exporter
          </button>
        </div>
      </div>

      {/* Statements */}
      <div className="space-y-6">
        {statements.map((statement) => (
          <div key={statement.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatementTypeIcon(statement.type)}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {getStatementTypeName(statement.type)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(statement.startDate).toLocaleDateString('fr-FR')} - {new Date(statement.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <Printer className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <FileSpreadsheet className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleStatement(statement.id)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                  >
                    {expandedStatement === statement.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {statement.type === 'balance' && (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">Total Actifs</div>
                      <div className="text-2xl font-bold text-blue-700">{formatAmount(statement.totalAssets)}</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-600 font-medium">Total Passifs</div>
                      <div className="text-2xl font-bold text-red-700">{formatAmount(statement.totalLiabilities)}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">Capitaux Propres</div>
                      <div className="text-2xl font-bold text-green-700">{formatAmount(statement.totalEquity)}</div>
                    </div>
                  </>
                )}
                {statement.type === 'income' && (
                  <>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">Total Produits</div>
                      <div className="text-2xl font-bold text-green-700">{formatAmount(statement.totalRevenue)}</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-600 font-medium">Total Charges</div>
                      <div className="text-2xl font-bold text-red-700">{formatAmount(statement.totalExpenses)}</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">Résultat Net</div>
                      <div className="text-2xl font-bold text-blue-700">{formatAmount(statement.netIncome)}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Details */}
              {expandedStatement === statement.id && (
                <div className="space-y-6">
                  {statement.sections.map((section) => (
                    <div key={section.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-medium text-gray-900">{section.name}</h3>
                      </div>
                      <div className="divide-y">
                        {section.items.map((item) => (
                          <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              {item.previousAmount && (
                                <div className="text-sm text-gray-500">
                                  Période précédente: {formatAmount(item.previousAmount)}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{formatAmount(item.amount)}</div>
                              {item.change !== undefined && (
                                <div className="text-sm">{formatChange(item.change)}</div>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                          <div className="font-medium text-gray-900">Total {section.name}</div>
                          <div className="font-medium text-gray-900">{formatAmount(section.total)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 