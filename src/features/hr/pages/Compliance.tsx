import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Shield,
  FileWarning,
  AlertTriangle,
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  category: 'legal' | 'safety' | 'data' | 'environmental' | 'labor';
  status: 'compliant' | 'non-compliant' | 'pending' | 'expired';
  dueDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  description: string;
  requirements: string[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    uploadedBy: string;
  }[];
  createdBy: string;
  createdAt: string;
}

export default function Compliance() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Sample data
  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'Conformité RGPD',
      category: 'data',
      status: 'compliant',
      dueDate: '2024-12-31',
      lastReviewDate: '2024-01-15',
      nextReviewDate: '2024-07-15',
      description: 'Conformité aux exigences du Règlement Général sur la Protection des Données',
      requirements: [
        'Registre des traitements',
        'Politique de confidentialité',
        'Procédures de gestion des données',
        'Formation des employés'
      ],
      documents: [
        {
          id: '1',
          name: 'Politique RGPD.pdf',
          type: 'application/pdf',
          uploadedAt: '2024-01-15',
          uploadedBy: 'Marie Martin'
        }
      ],
      createdBy: 'Marie Martin',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Sécurité au travail',
      category: 'safety',
      status: 'pending',
      dueDate: '2024-06-30',
      lastReviewDate: '2023-12-15',
      nextReviewDate: '2024-06-15',
      description: 'Conformité aux normes de sécurité au travail',
      requirements: [
        'Équipements de protection',
        'Formation sécurité',
        'Procédures d\'urgence',
        'Registre des incidents'
      ],
      documents: [
        {
          id: '2',
          name: 'Rapport sécurité.pdf',
          type: 'application/pdf',
          uploadedAt: '2023-12-15',
          uploadedBy: 'Pierre Dupont'
        }
      ],
      createdBy: 'Pierre Dupont',
      createdAt: '2023-12-01'
    }
  ];

  const categoryOptions = [
    { value: 'legal', label: 'Juridique', color: 'bg-blue-100 text-blue-800' },
    { value: 'safety', label: 'Sécurité', color: 'bg-red-100 text-red-800' },
    { value: 'data', label: 'Données', color: 'bg-purple-100 text-purple-800' },
    { value: 'environmental', label: 'Environnement', color: 'bg-green-100 text-green-800' },
    { value: 'labor', label: 'Travail', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const statusOptions = [
    { value: 'compliant', label: 'Conforme', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    { value: 'non-compliant', label: 'Non conforme', color: 'bg-red-100 text-red-800', icon: XCircle },
    { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'expired', label: 'Expiré', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
  ];

  const getCategoryColor = (category: ComplianceItem['category']) => {
    return categoryOptions.find(option => option.value === category)?.color || 'bg-gray-100 text-gray-800';
  };

  const getCategoryText = (category: ComplianceItem['category']) => {
    return categoryOptions.find(option => option.value === category)?.label || category;
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: ComplianceItem['status']) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  const getStatusIcon = (status: ComplianceItem['status']) => {
    const StatusIcon = statusOptions.find(option => option.value === status)?.icon || AlertCircle;
    return <StatusIcon className="w-5 h-5" />;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
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
            <h1 className="text-2xl font-bold text-gray-900">Conformité</h1>
            <p className="text-gray-500">Gérez la conformité réglementaire</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/hr/compliance/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle exigence
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

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categoryOptions.map(option => (
          <button
            key={option.value}
            onClick={() => toggleCategory(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedCategories.includes(option.value)
                ? option.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Compliance Items List */}
      <div className="bg-white rounded-xl border shadow-sm">
        {filteredItems.map(item => (
          <div key={item.id} className="border-b last:border-b-0">
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                    {getCategoryText(item.category)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                  {expandedItem === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {expandedItem === item.id && (
              <div className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Dernière revue: {formatDate(item.lastReviewDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Prochaine revue: {formatDate(item.nextReviewDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileWarning className="w-5 h-5" />
                    <span>Échéance: {formatDate(item.dueDate)}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/hr/compliance/${item.id}`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Voir les détails
                  </button>
                  <button
                    onClick={() => navigate(`/hr/compliance/${item.id}/edit`)}
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