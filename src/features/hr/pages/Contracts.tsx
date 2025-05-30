import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  FileText,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  FileSignature,
  AlertCircle,
} from 'lucide-react';

interface Contract {
  id: string;
  employeeName: string;
  type: 'cdi' | 'cdd' | 'stage' | 'interim';
  startDate: string;
  endDate: string | null;
  status: 'active' | 'expired' | 'terminated' | 'pending';
  department: string;
  position: string;
  salary: number;
  createdBy: string;
  createdAt: string;
}

export default function Contracts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [expandedContract, setExpandedContract] = useState<string | null>(null);

  // Sample data
  const contracts: Contract[] = [
    {
      id: '1',
      employeeName: 'Jean Dupont',
      type: 'cdi',
      startDate: '2023-01-01',
      endDate: null,
      status: 'active',
      department: 'Développement',
      position: 'Développeur Full Stack',
      salary: 45000,
      createdBy: 'Marie Martin',
      createdAt: '2022-12-15',
    },
    {
      id: '2',
      employeeName: 'Sophie Martin',
      type: 'cdd',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      department: 'Marketing',
      position: 'Chargée de Marketing',
      salary: 38000,
      createdBy: 'Marie Martin',
      createdAt: '2023-12-01',
    },
  ];

  const typeOptions = [
    { value: 'cdi', label: 'CDI', color: 'bg-green-100 text-green-800' },
    { value: 'cdd', label: 'CDD', color: 'bg-blue-100 text-blue-800' },
    { value: 'stage', label: 'Stage', color: 'bg-purple-100 text-purple-800' },
    { value: 'interim', label: 'Intérim', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800' },
    { value: 'expired', label: 'Expiré', color: 'bg-red-100 text-red-800' },
    { value: 'terminated', label: 'Résilié', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const getTypeColor = (type: Contract['type']) => {
    return typeOptions.find(option => option.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  const getTypeText = (type: Contract['type']) => {
    return typeOptions.find(option => option.value === type)?.label || type;
  };

  const getStatusColor = (status: Contract['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Contract['status']) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(contract.type);
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(salary);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contrats</h1>
            <p className="text-gray-500">Gérez les contrats de travail</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/hr/contracts/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau contrat
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
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
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {typeOptions.map(option => (
          <button
            key={option.value}
            onClick={() => toggleType(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedTypes.includes(option.value)
                ? option.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-xl border shadow-sm">
        {filteredContracts.map(contract => (
          <div key={contract.id} className="border-b last:border-b-0">
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpandedContract(expandedContract === contract.id ? null : contract.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{contract.employeeName}</h3>
                    <p className="text-sm text-gray-500">
                      {contract.position} - {contract.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(contract.type)}`}>
                    {getTypeText(contract.type)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                    {getStatusText(contract.status)}
                  </span>
                  {expandedContract === contract.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {expandedContract === contract.id && (
              <div className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Du {formatDate(contract.startDate)}
                      {contract.endDate ? ` au ${formatDate(contract.endDate)}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileSignature className="w-5 h-5" />
                    <span>{formatSalary(contract.salary)} / an</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>Créé par {contract.createdBy}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/hr/contracts/${contract.id}`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Voir les détails
                  </button>
                  <button
                    onClick={() => navigate(`/hr/contracts/${contract.id}/edit`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 