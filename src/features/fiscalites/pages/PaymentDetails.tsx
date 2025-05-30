import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Receipt,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  CreditCard,
  Banknote,
} from 'lucide-react';
import BackButton from '../../../components/BackButton';
import ConfirmationPopup from '../../../components/ConfirmationPopup';

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // This would typically come from an API call
  const payment = {
    id,
    type: 'TVA',
    reference: 'PAY-2024-001',
    date: '2024-03-15',
    amount: 15000,
    status: 'completed',
    paymentMethod: 'bank_transfer',
    description: 'Paiement de la TVA pour le premier trimestre 2024',
    attachments: [
      { id: 1, name: 'recu-paiement.pdf', size: '1.2 MB' },
      { id: 2, name: 'justificatif.pdf', size: '0.8 MB' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="w-5 h-5" />;
      case 'bank_transfer':
        return <Banknote className="w-5 h-5" />;
      default:
        return <Receipt className="w-5 h-5" />;
    }
  };

  const handleDelete = () => {
    // This would typically be an API call
    console.log('Deleting payment:', id);
    navigate('/fiscalites/payments');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/fiscalites/payments" label="Retour aux paiements" />

        <div className="bg-white rounded-lg border">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Paiement {payment.reference}
                  </h1>
                  <p className="text-sm text-gray-500">{payment.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/fiscalites/payments/${id}/edit`)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsDeletePopupOpen(true)}
                  className="p-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Statut</h2>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`}>
                  {getStatusIcon(payment.status)}
                  <span>
                    {payment.status === 'completed'
                      ? 'Complété'
                      : payment.status === 'failed'
                      ? 'Échoué'
                      : 'En attente'}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Montant</h2>
                <p className="text-lg font-semibold text-gray-900">
                  {payment.amount.toLocaleString()} FCFA
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Date de paiement</h2>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Méthode de paiement</h2>
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon(payment.paymentMethod)}
                  <span className="text-gray-900">
                    {payment.paymentMethod === 'credit_card'
                      ? 'Carte bancaire'
                      : payment.paymentMethod === 'bank_transfer'
                      ? 'Virement bancaire'
                      : 'Autre'}
                  </span>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-4">Pièces jointes</h2>
              <div className="space-y-2">
                {payment.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le paiement"
        message="Êtes-vous sûr de vouloir supprimer ce paiement ? Cette action est irréversible."
        confirmText="Supprimer"
      />
    </div>
  );
} 