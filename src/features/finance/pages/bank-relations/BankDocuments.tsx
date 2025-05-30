import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
} from 'lucide-react';

interface BankDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'valid' | 'expired' | 'pending';
  expiryDate?: string;
  size: string;
  version: string;
}

export default function BankDocuments() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const documentTypes = [
    'Convention',
    'Autorisation',
    'PV',
    'Contrat',
    'Attestation',
    'Autre',
  ];

  const documents: BankDocument[] = [
    {
      id: '1',
      name: 'Convention de compte UBA',
      type: 'Convention',
      uploadDate: '2024-01-15',
      uploadedBy: 'Marie Martin',
      status: 'valid',
      expiryDate: '2025-01-15',
      size: '2.5 MB',
      version: '1.0',
    },
    {
      id: '2',
      name: 'Autorisation de signature Ecobank',
      type: 'Autorisation',
      uploadDate: '2024-02-20',
      uploadedBy: 'Pierre Dupont',
      status: 'expired',
      expiryDate: '2024-03-20',
      size: '1.8 MB',
      version: '2.1',
    },
    {
      id: '3',
      name: 'Procès-verbal BOA',
      type: 'PV',
      uploadDate: '2024-03-01',
      uploadedBy: 'Sophie Bernard',
      status: 'pending',
      size: '3.2 MB',
      version: '1.0',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'expired':
        return <XCircle className="w-5 h-5" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/finance/bank-relations/${id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents Bancaires</h1>
            <p className="text-gray-500">Gestion des documents liés à la banque</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewDocumentModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau Document
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
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les types</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
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

      {/* Documents List */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{doc.type}</span>
                    <span className="text-sm text-gray-500">v{doc.version}</span>
                    <span className="text-sm text-gray-500">{doc.size}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Uploadé le {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>par {doc.uploadedBy}</span>
                    </div>
                    {doc.expiryDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Expire le {new Date(doc.expiryDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                  {doc.status === 'valid' ? 'Valide' :
                   doc.status === 'expired' ? 'Expiré' : 'En attente'}
                </span>
                <button
                  onClick={() => navigate(`/finance/bank-relations/${id}/documents/${doc.id}`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 