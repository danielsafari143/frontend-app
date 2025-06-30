import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Share2,
  Download,
  Trash2,
  Building2,
  User,
  Home,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import LoadingSpinner from '../../../../global-components/ui/LoadingSpinner';

interface Loan {
  id: string;
  type: 'personal' | 'business' | 'mortgage';
  amount: number;
  interestRate: number;
  term: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid' | 'overdue' | 'pending';
  lender: string;
  reference: string;
  purpose: string;
  collateral: string;
  nextPayment: {
    amount: number;
    date: string;
  };
  documents: {
    name: string;
    type: string;
    size: string;
    date: string;
  }[];
}

export default function LoanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loan, setLoan] = useState<Loan | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockLoan: Loan = {
      id: '1',
      type: 'business',
      amount: 50000,
      interestRate: 5.5,
      term: 36,
      startDate: '2024-01-01',
      endDate: '2027-01-01',
      status: 'active',
      lender: 'Bank of America',
      reference: 'LOAN-2024-001',
      purpose: 'Expansion des opérations commerciales',
      collateral: 'Équipements de bureau',
      nextPayment: {
        amount: 1500,
        date: '2024-04-01',
      },
      documents: [
        {
          name: 'Contrat de prêt.pdf',
          type: 'PDF',
          size: '2.4 MB',
          date: '2024-01-01',
        },
        {
          name: 'Plan financier.xlsx',
          type: 'Excel',
          size: '1.2 MB',
          date: '2024-01-01',
        },
      ],
    };
    setLoan(mockLoan);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'paid':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <XCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return <User className="w-5 h-5" />;
      case 'business':
        return <Building2 className="w-5 h-5" />;
      case 'mortgage':
        return <Home className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getLoanTypeLabel = (type: string) => {
    switch (type) {
      case 'personal':
        return 'Personnel';
      case 'business':
        return 'Entreprise';
      case 'mortgage':
        return 'Hypothécaire';
      default:
        return type;
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Deleting loan:', id);
    setShowDeleteModal(false);
    navigate('/finance/loans');
  };

  const handleShare = (method: string) => {
    // TODO: Implement share functionality
    console.log('Sharing via:', method);
    setShowShareModal(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/finance/loans')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Détails du prêt</h1>
              <p className="text-sm text-gray-500">Référence: {loan?.reference}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/finance/loans/${id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Edit className="w-5 h-5" />
              Modifier
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" />
              Partager
            </button>
            <button
              onClick={() => {/* TODO: Implement download */}}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Download className="w-5 h-5" />
              Télécharger
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-white border rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Loan Overview */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getLoanTypeIcon(loan?.type || '')}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {getLoanTypeLabel(loan?.type || '')}
                      </h2>
                      <p className="text-sm text-gray-500">{loan?.lender}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(loan?.status || '')}`}>
                    {getStatusIcon(loan?.status || '')}
                    <span className="text-sm font-medium">
                      {loan?.status === 'active' ? 'Actif' :
                       loan?.status === 'paid' ? 'Payé' :
                       loan?.status === 'overdue' ? 'En retard' : 'En attente'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Montant du prêt</div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-2xl font-semibold text-gray-900">
                        {loan?.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Taux d'intérêt</div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {loan?.interestRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Durée</div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {loan?.term} mois
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Prochain paiement</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {new Date(loan?.nextPayment.date || '').toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan?.nextPayment.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations supplémentaires</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Objectif du prêt</div>
                    <div className="text-gray-900">{loan?.purpose}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Garantie</div>
                    <div className="text-gray-900">{loan?.collateral}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date de début</div>
                    <div className="text-gray-900">
                      {new Date(loan?.startDate || '').toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date de fin</div>
                    <div className="text-gray-900">
                      {new Date(loan?.endDate || '').toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                <div className="space-y-3">
                  {loan?.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">
                            {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {/* TODO: Implement download */}}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Next Payment */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochain paiement</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Montant</div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-2xl font-semibold text-gray-900">
                        {loan?.nextPayment.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date d'échéance</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-lg font-medium text-gray-900">
                        {new Date(loan?.nextPayment.date || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des paiements</h3>
                <div className="space-y-3">
                  {/* Sample payment history */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Paiement #1</div>
                      <div className="text-xs text-gray-500">2024-01-01</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">1,500.00</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Paiement #2</div>
                      <div className="text-xs text-gray-500">2024-02-01</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">1,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supprimer le prêt</h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer ce prêt ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager le prêt</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleShare('copy')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Copier le lien
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Envoyer par email
              </button>
              <button
                onClick={() => handleShare('pdf')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Télécharger en PDF
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 