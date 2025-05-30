import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  User,
  Calendar,
  Building2,
  FileSignature,
  AlertCircle,
  Clock,
  Download,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

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
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    uploadedBy: string;
  }[];
  timeline: {
    date: string;
    action: string;
    description: string;
    user: string;
  }[];
}

export default function ContractDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const contract: Contract = {
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
    documents: [
      {
        id: '1',
        name: 'Contrat de travail.pdf',
        type: 'application/pdf',
        uploadedAt: '2022-12-15',
        uploadedBy: 'Marie Martin',
      },
      {
        id: '2',
        name: 'Annexe salaire.pdf',
        type: 'application/pdf',
        uploadedAt: '2022-12-15',
        uploadedBy: 'Marie Martin',
      },
    ],
    timeline: [
      {
        date: '2022-12-15',
        action: 'Création',
        description: 'Contrat créé',
        user: 'Marie Martin',
      },
      {
        date: '2023-01-01',
        action: 'Début',
        description: 'Début du contrat',
        user: 'Système',
      },
    ],
  };

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

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting contract:', id);
    navigate('/hr/contracts');
  };

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
            onClick={() => navigate('/hr/contracts')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contrat de {contract.employeeName}</h1>
            <p className="text-gray-500">
              Créé le {formatDate(contract.createdAt)} par {contract.createdBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(contract.type)}`}>
            {getTypeText(contract.type)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
            {getStatusText(contract.status)}
          </span>
          <button
            onClick={() => navigate(`/hr/contracts/${id}/edit`)}
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
          {/* Contract Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du contrat</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>{contract.employeeName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span>{contract.department}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FileSignature className="w-5 h-5" />
                  <span>{contract.position}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Du {formatDate(contract.startDate)}
                    {contract.endDate ? ` au ${formatDate(contract.endDate)}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-5 h-5" />
                  <span>{formatSalary(contract.salary)} / an</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-4">
              {contract.documents.map(doc => (
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
              {contract.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {index < contract.timeline.length - 1 && (
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
        title="Supprimer le contrat"
        itemName={`Contrat de ${contract.employeeName}`}
        itemType="contrat"
        customMessage="Êtes-vous sûr de vouloir supprimer ce contrat ? Cette action est irréversible."
      />
    </div>
  );
} 