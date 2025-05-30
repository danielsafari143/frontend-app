import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  Calendar,
  Percent,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Copy,
  Mail,
  Download,
} from 'lucide-react';

interface ForexTransaction {
  id: string;
  type: 'buy' | 'sell';
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

const ForexTransactionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sample transaction data
  const transaction: ForexTransaction = {
    id: id || '1',
    type: 'buy',
    fromCurrency: 'USD',
    toCurrency: 'FCFA',
    amount: 1000,
    rate: 650.5,
    total: 650500,
    date: '2024-03-15',
    status: 'completed',
    description: 'Achat de dollars pour paiement fournisseur',
    reference: 'FX-2024-001',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:35:00Z',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'failed':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-5 h-5" />;
      case 'EUR':
        return <Euro className="w-5 h-5" />;
      case 'GBP':
        return <PoundSterling className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting transaction:', id);
    setShowDeleteModal(false);
    navigate('/finance/forex');
  };

  const handleShare = (method: string) => {
    // TODO: Implement share logic
    console.log('Sharing transaction via:', method);
    setShowShareModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance/forex')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Détails de l'Opération</h1>
            <p className="text-gray-500">Référence: {transaction.reference}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/finance/forex/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit className="w-5 h-5" />
            Modifier
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Overview */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {transaction.type === 'buy' ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
                <h2 className="text-lg font-semibold text-gray-900">
                  {transaction.type === 'buy' ? 'Achat' : 'Vente'} de {transaction.fromCurrency}
                </h2>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                {getStatusIcon(transaction.status)}
                <span className="text-sm font-medium">
                  {transaction.status === 'completed' ? 'Complété' : 
                   transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Montant</p>
                <div className="flex items-center gap-2 mt-1">
                  {getCurrencyIcon(transaction.fromCurrency)}
                  <span className="text-xl font-semibold">
                    {transaction.amount.toLocaleString()} {transaction.fromCurrency}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taux de change</p>
                <div className="flex items-center gap-2 mt-1">
                  <Percent className="w-5 h-5 text-gray-400" />
                  <span className="text-xl font-semibold">{transaction.rate}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <div className="flex items-center gap-2 mt-1">
                  {getCurrencyIcon(transaction.toCurrency)}
                  <span className="text-xl font-semibold">
                    {transaction.total.toLocaleString()} {transaction.toCurrency}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-xl font-semibold">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {transaction.description && (
              <div className="mt-6">
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1 text-gray-900">{transaction.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Transaction Info */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Référence</p>
                <p className="mt-1 text-gray-900">{transaction.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Créé le</p>
                <p className="mt-1 text-gray-900">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière modification</p>
                <p className="mt-1 text-gray-900">
                  {new Date(transaction.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Supprimer l'opération</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette opération ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Partager l'opération</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50"
              >
                <Copy className="w-5 h-5 text-gray-500" />
                <span>Copier le lien</span>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50"
              >
                <Mail className="w-5 h-5 text-gray-500" />
                <span>Envoyer par email</span>
              </button>
              <button
                onClick={() => handleShare('download')}
                className="w-full flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50"
              >
                <Download className="w-5 h-5 text-gray-500" />
                <span>Télécharger le PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForexTransactionDetails; 