import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  MoreVertical,
} from 'lucide-react';

interface Declaration {
  id: string;
  type: string;
  period: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  amount: number;
  submittedDate?: string;
}

export default function TaxDeclaration() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const declarations: Declaration[] = [
    {
      id: '1',
      type: 'TVA',
      period: 'Q1 2024',
      dueDate: '2024-04-30',
      status: 'pending',
      amount: 15000,
    },
    {
      id: '2',
      type: 'Impôt sur les sociétés',
      period: '2023',
      dueDate: '2024-05-15',
      status: 'pending',
      amount: 45000,
    },
    {
      id: '3',
      type: 'Cotisations sociales',
      period: 'Mars 2024',
      dueDate: '2024-04-25',
      status: 'overdue',
      amount: 8500,
    },
    {
      id: '4',
      type: 'TVA',
      period: 'Q4 2023',
      dueDate: '2024-01-31',
      status: 'completed',
      amount: 12500,
      submittedDate: '2024-01-25',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const filteredDeclarations = declarations.filter((declaration) => {
    const matchesSearch = declaration.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      declaration.period.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || declaration.status === statusFilter;
    const matchesType = typeFilter === 'all' || declaration.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Déclarations fiscales</h1>
          <p className="mt-2 text-gray-600">
            Gérez et suivez vos déclarations fiscales
          </p>
        </div>
        <button
          onClick={() => navigate('/fiscalites/declarations/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle déclaration</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une déclaration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="completed">Complétée</option>
            <option value="overdue">En retard</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="TVA">TVA</option>
            <option value="Impôt sur les sociétés">Impôt sur les sociétés</option>
            <option value="Cotisations sociales">Cotisations sociales</option>
          </select>
        </div>
      </div>

      {/* Declarations Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Échéance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeclarations.map((declaration) => (
                <tr key={declaration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{declaration.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {declaration.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">
                        {new Date(declaration.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {declaration.amount.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(declaration.status)}`}>
                      {getStatusIcon(declaration.status)}
                      <span>
                        {declaration.status === 'completed'
                          ? 'Complétée'
                          : declaration.status === 'overdue'
                          ? 'En retard'
                          : 'En attente'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {declaration.status === 'completed' && (
                        <button
                          onClick={() => {/* Handle download */}}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Télécharger"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/fiscalites/declarations/${declaration.id}`)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Plus d'options"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 