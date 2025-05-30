import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  FileText,
  Users,
  Building2,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
} from 'lucide-react';

interface Budget {
  id: string;
  name: string;
  department: string;
  year: number;
  total: number;
  spent: number;
  remaining: number;
  status: 'on-track' | 'over-budget' | 'under-budget';
  lastUpdated: string;
}

interface BudgetVersion {
  id: string;
  name: string;
  year: number;
  status: 'draft' | 'approved' | 'archived';
  createdAt: string;
  createdBy: string;
}

export default function Budgeting() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showNewBudgetModal, setShowNewBudgetModal] = useState(false);

  // Sample data
  const budgets: Budget[] = [
    {
      id: '1',
      name: 'Budget Marketing',
      department: 'Marketing',
      year: 2024,
      total: 50000000,
      spent: 15000000,
      remaining: 35000000,
      status: 'on-track',
      lastUpdated: '2024-03-15',
    },
    {
      id: '2',
      name: 'Budget IT',
      department: 'Informatique',
      year: 2024,
      total: 75000000,
      spent: 45000000,
      remaining: 30000000,
      status: 'over-budget',
      lastUpdated: '2024-03-18',
    },
    {
      id: '3',
      name: 'Budget RH',
      department: 'Ressources Humaines',
      year: 2024,
      total: 30000000,
      spent: 10000000,
      remaining: 20000000,
      status: 'under-budget',
      lastUpdated: '2024-03-20',
    },
  ];

  const budgetVersions: BudgetVersion[] = [
    {
      id: '1',
      name: 'Budget Initial 2024',
      year: 2024,
      status: 'approved',
      createdAt: '2023-12-15',
      createdBy: 'Marie Martin',
    },
    {
      id: '2',
      name: 'Budget Révisé 2024',
      year: 2024,
      status: 'draft',
      createdAt: '2024-03-01',
      createdBy: 'Pierre Dupont',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600 bg-green-50';
      case 'over-budget':
        return 'text-red-600 bg-red-50';
      case 'under-budget':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'Dans les limites';
      case 'over-budget':
        return 'Dépassé';
      case 'under-budget':
        return 'Sous-budget';
      default:
        return status;
    }
  };

  const getVersionStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'draft':
        return 'text-yellow-600 bg-yellow-50';
      case 'archived':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getVersionStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivé';
      default:
        return status;
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
            <h1 className="text-2xl font-bold text-gray-900">Budgets & Prévisions</h1>
            <p className="text-gray-500">Planification et suivi budgétaire</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewBudgetModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau Budget
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
              placeholder="Rechercher un budget..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>
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

      {/* Budget Versions */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Versions du Budget</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {budgetVersions.map(version => (
            <div key={version.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{version.name}</h3>
                <p className="text-sm text-gray-500">
                  Créé le {new Date(version.createdAt).toLocaleDateString('fr-FR')} par {version.createdBy}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getVersionStatusColor(version.status)}`}>
                  {getVersionStatusText(version.status)}
                </span>
                <button
                  onClick={() => navigate(`/finance/budgeting/${version.id}`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budgets List */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {budgets.map(budget => (
          <div key={budget.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{budget.name}</h3>
                  <p className="text-sm text-gray-500">{budget.department}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">
                      Dernière mise à jour: {new Date(budget.lastUpdated).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium text-gray-900">
                      {budget.total.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dépensé</p>
                    <p className="font-medium text-gray-900">
                      {budget.spent.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Restant</p>
                    <p className="font-medium text-gray-900">
                      {budget.remaining.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(budget.status)}`}>
                  {getStatusText(budget.status)}
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${(budget.spent / budget.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* New Budget Modal */}
      {showNewBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Nouveau Budget
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du budget
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Département
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="marketing">Marketing</option>
                  <option value="it">Informatique</option>
                  <option value="hr">Ressources Humaines</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant total
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowNewBudgetModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowNewBudgetModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 