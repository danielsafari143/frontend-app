import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
} from 'lucide-react';
import BackButton from '../../../components/BackButton';
import ConfirmationPopup from '../../../components/ConfirmationPopup';

export default function DeclarationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // This would typically come from an API call
  const declaration = {
    id,
    type: 'TVA',
    period: 'Q1 2024',
    dueDate: '2024-04-30',
    status: 'pending',
    amount: 15000,
    description: 'Déclaration de la TVA pour le premier trimestre 2024',
    submittedDate: null,
    attachments: [
      { id: 1, name: 'factures-q1-2024.pdf', size: '2.5 MB' },
      { id: 2, name: 'justificatifs.pdf', size: '1.8 MB' },
    ],
  };

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

  const handleDelete = () => {
    // Simulate API call to delete declaration
    console.log('Deleting declaration:', id);
    navigate('/fiscalites/declarations');
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <BackButton to="/fiscalites/declarations" label="Retour aux déclarations" />

      <div className="bg-white rounded-lg border p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{declaration.type}</h1>
            <p className="text-gray-600">{declaration.period}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              <Edit className="w-5 h-5" />
            </button>
            <button 
              className="px-4 py-2 text-red-600 hover:text-red-900"
              onClick={() => setIsDeletePopupOpen(true)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la déclaration</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{declaration.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(declaration.status)}`}>
                  {getStatusIcon(declaration.status)}
                  <span>
                    {declaration.status === 'completed'
                      ? 'Complétée'
                      : declaration.status === 'overdue'
                      ? 'En retard'
                      : 'En attente'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Montant</p>
                <p className="text-gray-900">{declaration.amount.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dates importantes</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Date d'échéance</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900">{new Date(declaration.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              {declaration.submittedDate && (
                <div>
                  <p className="text-sm text-gray-500">Date de soumission</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-900">{new Date(declaration.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pièces jointes</h2>
          <div className="space-y-2">
            {declaration.attachments.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer la déclaration"
        message="Êtes-vous sûr de vouloir supprimer cette déclaration ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
} 