import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Edit2,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Clock,
  User,
  Tag,
} from 'lucide-react';
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

export default function DocumentDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch document data from API
    // For now, using mock data
    const mockDocument: Document = {
      id: id || '',
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
    };
    setDocument(mockDocument);
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting document:', document);
    navigate('/crm/documents');
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

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/documents')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{document.name}</h1>
            <p className="text-gray-500">Code: {document.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/crm/documents/${document.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button
            onClick={() => {/* TODO: Implement download */}}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" /> Télécharger
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Document Preview */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              {getFileTypeIcon(document.type)}
              <span className="ml-2 text-gray-600">{document.name}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600">{document.description}</p>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Info */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informations</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <div className="flex items-center gap-2 mt-1">
                  {getFileTypeIcon(document.type)}
                  <span className="text-gray-900">{document.type.toUpperCase()}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Catégorie</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full mt-1 ${getCategoryColor(document.category)}`}>
                  {document.category === 'contract' ? 'Contrat' :
                   document.category === 'invoice' ? 'Facture' :
                   document.category === 'report' ? 'Rapport' : 'Autre'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taille</p>
                <p className="text-gray-900">{document.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="text-gray-900">{document.version}</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activité</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-900">Téléversé par {document.uploadedBy}</p>
                  <p className="text-xs text-gray-500">{document.uploadDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-900">Dernière modification</p>
                  <p className="text-xs text-gray-500">{document.lastModified}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title="Supprimer le document"
        itemName={document.name}
        itemType="document"
        customMessage={`Cette action supprimera définitivement le document "${document.name}". Cette action est irréversible.`}
      />
    </div>
  );
} 