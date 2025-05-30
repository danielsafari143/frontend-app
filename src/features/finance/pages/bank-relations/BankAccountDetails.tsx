import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  Edit,
  Wallet,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  History,
  Tag,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export default function BankAccountDetails() {
  const navigate = useNavigate();
  const { id, accountId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sample account data
  const account = {
    id: accountId,
    number: 'SN123456789',
    type: 'Compte Courant',
    currency: 'FCFA',
    balance: 15000000,
    status: 'active',
    openingDate: '2023-01-15',
    bank: 'UBA',
    iban: 'SN12 UBA 1234 5678 9012 3456 789',
    swift: 'UBAASNDX',
    interestRate: '2.5%',
    overdraftLimit: 5000000,
    lastReconciliation: '2024-03-01',
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-20',
      description: 'Virement reçu - Client XYZ',
      amount: 2500000,
      type: 'credit',
      status: 'completed',
      reference: 'VIR-123456',
    },
    {
      id: '2',
      date: '2024-03-19',
      description: 'Paiement fournisseur ABC',
      amount: 1500000,
      type: 'debit',
      status: 'completed',
      reference: 'PAY-789012',
    },
    {
      id: '3',
      date: '2024-03-18',
      description: 'Virement en attente',
      amount: 3000000,
      type: 'credit',
      status: 'pending',
      reference: 'VIR-345678',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'inactive':
      case 'failed':
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
            onClick={() => navigate(`/finance/bank-relations/${id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compte {account.number}</h1>
            <p className="text-gray-500">{account.type} - {account.bank}</p>
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
            Fermer le compte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Overview */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Aperçu du compte</h2>
                <p className="text-gray-500">Solde actuel</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {account.balance.toLocaleString('fr-FR')} {account.currency}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date d'ouverture</p>
                <p className="font-medium">
                  {new Date(account.openingDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière réconciliation</p>
                <p className="font-medium">
                  {new Date(account.lastReconciliation).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taux d'intérêt</p>
                <p className="font-medium">{account.interestRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Limite de découvert</p>
                <p className="font-medium">
                  {account.overdraftLimit.toLocaleString('fr-FR')} {account.currency}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions récentes</h2>
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-sm text-gray-500">
                          Ref: {transaction.reference}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {transaction.amount.toLocaleString('fr-FR')} {account.currency}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'completed' ? 'Complété' :
                       transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du compte</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">IBAN</p>
                <p className="font-medium">{account.iban}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SWIFT/BIC</p>
                <p className="font-medium">{account.swift}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type de compte</p>
                <p className="font-medium">{account.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Devise</p>
                <p className="font-medium">{account.currency}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(account.status)}`}>
                  {account.status === 'active' ? 'Actif' :
                   account.status === 'inactive' ? 'Inactif' : 'En attente'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <ArrowUpRight className="w-5 h-5" />
                Nouveau virement
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
                Télécharger le relevé
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <History className="w-5 h-5" />
                Historique complet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 