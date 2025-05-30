import React, { useState } from 'react';
import {
  FileText,
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
  File,
  FileCheck,
  FileWarning,
  FileX,
  BarChart3,
  PieChart,
  TrendingUp,
  User,
  ArrowLeft,
  Download,
  Upload,
  Folder,
  FileType,
  FileImage,
  FileArchive,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Document {
  id: string;
  code: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'image' | 'archive';
  category: 'contract' | 'invoice' | 'report' | 'other';
  size: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  status: 'active' | 'archived' | 'deleted';
  description: string;
  tags: string[];
  version: string;
}

export default function Documents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Sample data for documents
  const documents: Document[] = [
    {
      id: '1',
      code: 'DOC001',
      name: 'Contrat Commercial.pdf',
      type: 'pdf',
      category: 'contract',
      size: '2.5 MB',
      uploadedBy: 'Jean Dupont',
      uploadDate: '2024-03-15',
      lastModified: '2024-03-15 14:30',
      status: 'active',
      description: 'Contrat commercial avec le client ABC',
      tags: ['contrat', 'commercial', 'client'],
      version: '1.0',
    },
    {
      id: '2',
      code: 'DOC002',
      name: 'Facture_2024_001.xlsx',
      type: 'xls',
      category: 'invoice',
      size: '1.2 MB',
      uploadedBy: 'Marie Martin',
      uploadDate: '2024-03-15',
      lastModified: '2024-03-15 16:45',
      status: 'active',
      description: 'Facture pour le projet XYZ',
      tags: ['facture', 'projet', 'finances'],
      version: '1.0',
    },
    // Add more documents...
  ];

  const toggleDocument = (documentId: string) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(documentId)) {
      newExpanded.delete(documentId);
    } else {
      newExpanded.add(documentId);
    }
    setExpandedDocuments(newExpanded);
  };

  const getFileTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'xls':
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'image':
        return <FileImage className="w-4 h-4 text-purple-600" />;
      case 'archive':
        return <FileArchive className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'contract':
        return 'bg-blue-100 text-blue-800';
      case 'invoice':
        return 'bg-green-100 text-green-800';
      case 'report':
        return 'bg-purple-100 text-purple-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting document:', selectedDocument);
    setIsDeleteModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-7 h-7 text-blue-600" />
              Documents
            </h1>
            <p className="text-gray-500">Gestion des documents</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/crm/documents/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" /> Téléverser
          </button>
          <button
            onClick={() => navigate('/crm/documents/new-folder')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Folder className="w-4 h-4" /> Nouveau dossier
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="archived">Archivé</option>
          <option value="deleted">Supprimé</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Toutes les catégories</option>
          <option>Contrat</option>
          <option>Facture</option>
          <option>Rapport</option>
          <option>Autre</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière modification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document) => (
                <React.Fragment key={document.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleDocument(document.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedDocuments.has(document.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{document.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getFileTypeIcon(document.type)}
                        <span className="text-sm text-gray-900">{document.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {document.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getCategoryColor(document.category)}`}>
                        {document.category === 'contract' ? 'Contrat' :
                         document.category === 'invoice' ? 'Facture' :
                         document.category === 'report' ? 'Rapport' : 'Autre'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{document.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{document.lastModified}</div>
                      <div className="text-sm text-gray-500">par {document.uploadedBy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/crm/documents/${document.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/crm/documents/${document.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(document)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedDocuments.has(document.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                            <p className="text-sm text-gray-600">{document.description}</p>
                            <div className="mt-2">
                              <h4 className="text-sm font-medium text-gray-900 mb-1">Tags</h4>
                              <div className="flex flex-wrap gap-1">
                                {document.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Informations</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Version:</span> {document.version}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Date de téléversement:</span> {document.uploadDate}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Statut:</span>{' '}
                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                  document.status === 'active' ? 'bg-green-100 text-green-800' :
                                  document.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {document.status === 'active' ? 'Actif' :
                                   document.status === 'archived' ? 'Archivé' : 'Supprimé'}
                                </span>
                              </p>
                            </div>
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

      {/* Delete Confirmation Modal */}
      {selectedDocument && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer le document"
          itemName={selectedDocument.name}
          itemType="document"
          customMessage={`Cette action supprimera définitivement le document "${selectedDocument.name}". Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 