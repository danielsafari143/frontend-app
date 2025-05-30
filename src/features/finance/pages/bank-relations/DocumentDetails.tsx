import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  Edit,
  FileText,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  History,
  Tag,
} from 'lucide-react';

interface DocumentVersion {
  id: string;
  version: string;
  uploadDate: string;
  uploadedBy: string;
  changes: string;
  size: string;
}

interface DocumentComment {
  id: string;
  user: string;
  date: string;
  content: string;
}

export default function BankDocumentDetails() {
  const navigate = useNavigate();
  const { id, documentId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sample document data
  const document = {
    id: documentId,
    name: 'Convention de compte UBA',
    type: 'Convention',
    uploadDate: '2024-01-15',
    uploadedBy: 'Marie Martin',
    status: 'valid',
    expiryDate: '2025-01-15',
    size: '2.5 MB',
    version: '1.0',
    description: 'Convention de compte bancaire avec United Bank for Africa',
    tags: ['Compte', 'Convention', 'UBA'],
    bank: 'United Bank for Africa',
  };

  const versions: DocumentVersion[] = [
    {
      id: '1',
      version: '1.0',
      uploadDate: '2024-01-15',
      uploadedBy: 'Marie Martin',
      changes: 'Version initiale',
      size: '2.5 MB',
    },
  ];

  const comments: DocumentComment[] = [
    {
      id: '1',
      user: 'Pierre Dupont',
      date: '2024-01-16',
      content: 'Document validé par le service juridique',
    },
    {
      id: '2',
      user: 'Sophie Bernard',
      date: '2024-01-17',
      content: 'Signature électronique ajoutée',
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/finance/bank-relations/${id}/documents`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{document.name}</h1>
            <p className="text-gray-500">Détails du document</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit className="w-5 h-5" />
            Modifier
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Document Preview */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Aperçu du document</h2>
                <p className="text-gray-500">Version {document.version}</p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Aperçu du document</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-5 h-5" />
                Télécharger
              </button>
            </div>
          </div>

          {/* Document Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{document.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Banque</p>
                <p className="font-medium">{document.bank}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taille</p>
                <p className="font-medium">{document.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="font-medium">v{document.version}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date d'upload</p>
                <p className="font-medium">
                  {new Date(document.uploadDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Uploadé par</p>
                <p className="font-medium">{document.uploadedBy}</p>
              </div>
              {document.expiryDate && (
                <div>
                  <p className="text-sm text-gray-500">Date d'expiration</p>
                  <p className="font-medium">
                    {new Date(document.expiryDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(document.status)}`}>
                  {document.status === 'valid' ? 'Valide' :
                   document.status === 'expired' ? 'Expiré' : 'En attente'}
                </span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Commentaires</h2>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{comment.user}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {document.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Versions History */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique des versions</h2>
            <div className="space-y-4">
              {versions.map(version => (
                <div key={version.id} className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <History className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Version {version.version}</p>
                    <p className="text-sm text-gray-500">{version.changes}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(version.uploadDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{version.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 