import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Building2,
  FileText,
  CreditCard,
  Wallet,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface Bank {
  id: string;
  name: string;
  type: string;
  accounts: number;
  totalBalance: number;
  status: 'active' | 'inactive' | 'pending';
  lastTransaction: string;
}

interface BankDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'valid' | 'expired' | 'pending';
}

export default function BankRelations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBankModal, setShowNewBankModal] = useState(false);

  const banks: Bank[] = [
    {
      id: '1',
      name: 'UBA',
      type: 'Commercial',
      accounts: 3,
      totalBalance: 25000000,
      status: 'active',
      lastTransaction: '2024-03-20',
    },
    {
      id: '2',
      name: 'Ecobank',
      type: 'Commercial',
      accounts: 2,
      totalBalance: 15000000,
      status: 'active',
      lastTransaction: '2024-03-19',
    },
    {
      id: '3',
      name: 'BOA',
      type: 'Commercial',
      accounts: 1,
      totalBalance: 8000000,
      status: 'pending',
      lastTransaction: '2024-03-18',
    },
  ];

  const documents: BankDocument[] = [
    {
      id: '1',
      name: 'Convention de compte UBA',
      type: 'Convention',
      uploadDate: '2024-01-15',
      status: 'valid',
    },
    {
      id: '2',
      name: 'Autorisation de signature Ecobank',
      type: 'Autorisation',
      uploadDate: '2024-02-20',
      status: 'expired',
    },
    {
      id: '3',
      name: 'Procès-verbal BOA',
      type: 'PV',
      uploadDate: '2024-03-01',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'valid':
        return 'text-green-600 bg-green-50';
      case 'inactive':
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'valid':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'inactive':
      case 'expired':
        return <XCircle className="w-5 h-5" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relations Bancaires</h1>
            <p className="text-gray-500">Gestion des relations avec les banques</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/finance/bank-relations/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Banque
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une banque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Exporter
          </button>
        </div>
      </div>

      {/* Banks List */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {banks.map(bank => (
          <div key={bank.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{bank.name}</h3>
                  <p className="text-sm text-gray-500">{bank.type}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">
                      {bank.accounts} compte(s)
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {bank.totalBalance.toLocaleString('fr-FR')} FCFA
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bank.status)}`}>
                      {bank.status === 'active' ? 'Actif' :
                       bank.status === 'inactive' ? 'Inactif' : 'En attente'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/finance/bank-relations/${bank.id}/documents`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <FileText className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/finance/bank-relations/${bank.id}`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Documents Bancaires</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.type} - {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                {doc.status === 'valid' ? 'Valide' :
                 doc.status === 'expired' ? 'Expiré' : 'En attente'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 