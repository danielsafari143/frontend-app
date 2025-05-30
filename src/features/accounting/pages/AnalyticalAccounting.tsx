import React, { useState } from 'react';
import {
  PieChart,
  Plus,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  FileSpreadsheet,
  TrendingUp,
  FileCheck,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CostCenter {
  id: string;
  name: string;
  type: 'cost' | 'profit';
  budget: number;
  actual: number;
  variance: number;
}

interface Project {
  id: string;
  name: string;
  budget: number;
  actual: number;
  status: 'active' | 'completed' | 'on-hold';
}

export default function AnalyticalAccounting() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCenters, setExpandedCenters] = useState<Set<string>>(new Set());

  // Sample data for cost centers
  const costCenters: CostCenter[] = [
    {
      id: '1',
      name: 'Centre de Coût Production',
      type: 'cost',
      budget: 10000000,
      actual: 9500000,
      variance: 500000,
    },
    {
      id: '2',
      name: 'Centre de Profit Ventes',
      type: 'profit',
      budget: 12000000,
      actual: 13000000,
      variance: -1000000,
    },
    // Add more centers...
  ];

  // Sample data for projects
  const projects: Project[] = [
    {
      id: '1',
      name: 'Projet ERP',
      budget: 5000000,
      actual: 4800000,
      status: 'active',
    },
    {
      id: '2',
      name: 'Projet Expansion',
      budget: 8000000,
      actual: 9000000,
      status: 'completed',
    },
    // Add more projects...
  ];

  const toggleCenter = (centerId: string) => {
    const newExpanded = new Set(expandedCenters);
    if (newExpanded.has(centerId)) {
      newExpanded.delete(centerId);
    } else {
      newExpanded.add(centerId);
    }
    setExpandedCenters(newExpanded);
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
              <PieChart className="w-7 h-7 text-yellow-600" />
              Comptabilité Analytique
            </h1>
            <p className="text-gray-500">Gestion de la comptabilité analytique</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            <Plus className="w-4 h-4" /> Nouveau centre
          </button>
        </div>
      </div>

      {/* Cost Centers Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Centres de coûts & profits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Réalisé</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Écart</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {costCenters.map((center) => (
                <React.Fragment key={center.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCenter(center.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedCenters.has(center.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{center.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${center.type === 'cost' ? 'text-blue-600' : 'text-green-600'}`}>{center.type === 'cost' ? 'Coût' : 'Profit'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">{formatAmount(center.budget)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">{formatAmount(center.actual)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm ${center.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>{center.variance >= 0 ? '+' : ''}{formatAmount(center.variance)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCenters.has(center.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Budget: {formatAmount(center.budget)}</div>
                            <div className="text-sm text-gray-500">Réalisé: {formatAmount(center.actual)}</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                              Générer rapport
                            </button>
                          </div>
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

      {/* Projects Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Projets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Réalisé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-900">{formatAmount(project.budget)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-900">{formatAmount(project.actual)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status === 'active' ? 'Actif' :
                       project.status === 'completed' ? 'Terminé' : 'En pause'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un centre ou projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option>Période: Cette année</option>
          <option>Période: L&apos;année dernière</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>
    </div>
  );
} 