import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  User,
  Calendar,
  Shield,
  AlertCircle,
  Clock,
  Download,
  CheckCircle2,
  XCircle,
  FileWarning,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

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
  timeline: {
    date: string;
    action: string;
    description: string;
    user: string;
  }[];
}

export default function ComplianceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const complianceItem: ComplianceItem = {
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
      },
      {
        id: '2',
        name: 'Registre des traitements.pdf',
        type: 'application/pdf',
        uploadedAt: '2024-01-15',
        uploadedBy: 'Marie Martin'
      }
    ],
    createdBy: 'Marie Martin',
    createdAt: '2024-01-01',
    timeline: [
      {
        date: '2024-01-01',
        action: 'Création',
        description: 'Exigence créée',
        user: 'Marie Martin'
      },
      {
        date: '2024-01-15',
        action: 'Revue',
        description: 'Revue annuelle effectuée',
        user: 'Marie Martin'
      }
    ]
  };

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

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting compliance item:', id);
    navigate('/hr/compliance');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/compliance')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{complianceItem.title}</h1>
            <p className="text-gray-500">
              Créé le {formatDate(complianceItem.createdAt)} par {complianceItem.createdBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(complianceItem.category)}`}>
            {getCategoryText(complianceItem.category)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complianceItem.status)}`}>
            {getStatusText(complianceItem.status)}
          </span>
          <button
            onClick={() => navigate(`/hr/compliance/${id}/edit`)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Compliance Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la conformité</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>{complianceItem.description}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Échéance: {formatDate(complianceItem.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Dernière revue: {formatDate(complianceItem.lastReviewDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Prochaine revue: {formatDate(complianceItem.nextReviewDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Exigences</h2>
            <div className="space-y-4">
              {complianceItem.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-4">
              {complianceItem.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        Ajouté le {formatDate(doc.uploadedAt)} par {doc.uploadedBy}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique</h2>
            <div className="space-y-4">
              {complianceItem.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {index < complianceItem.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{event.action}</div>
                    <div className="text-sm text-gray-500">{event.description}</div>
                    <div className="text-xs text-gray-400">
                      {formatDate(event.date)} par {event.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        title="Supprimer l'exigence"
        itemName={complianceItem.title}
        itemType="exigence"
        customMessage="Êtes-vous sûr de vouloir supprimer cette exigence ? Cette action est irréversible."
      />
    </div>
  );
} 