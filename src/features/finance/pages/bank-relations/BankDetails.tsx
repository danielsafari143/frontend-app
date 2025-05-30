import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface BankAccount {
  id: string;
  number: string;
  type: string;
  currency: string;
  balance: number;
  status: 'active' | 'inactive' | 'pending';
  openingDate: string;
}

interface BankContact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface BankDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'valid' | 'expired' | 'pending';
}

export default function BankDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState(false);

  // Sample data - in a real app, this would come from an API
  const bank = {
    id: '1',
    name: 'UBA',
    type: 'Commercial',
    address: '123 Avenue de la Banque, Dakar',
    phone: '+221 33 123 4567',
    email: 'contact@uba.sn',
    website: 'www.uba.sn',
    status: 'active',
  };

  const accounts: BankAccount[] = [
    {
      id: '1',
      number: 'SN123456789',
      type: 'Compte Courant',
      currency: 'FCFA',
      balance: 15000000,
      status: 'active',
      openingDate: '2023-01-15',
    },
    {
      id: '2',
      number: 'SN987654321',
      type: 'Compte Épargne',
      currency: 'FCFA',
      balance: 10000000,
      status: 'active',
      openingDate: '2023-02-20',
    },
  ];

  const contacts: BankContact[] = [
    {
      id: '1',
      name: 'Moussa Diallo',
      position: 'Directeur Commercial',
      email: 'moussa.diallo@uba.sn',
      phone: '+221 77 123 4567',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Aminata Sow',
      position: 'Chargée de Clientèle',
      email: 'aminata.sow@uba.sn',
      phone: '+221 77 765 4321',
      isPrimary: false,
    },
  ];

  const documents: BankDocument[] = [
    {
      id: '1',
      name: 'Convention de compte',
      type: 'Convention',
      uploadDate: '2024-01-15',
      status: 'valid',
    },
    {
      id: '2',
      name: 'Autorisation de signature',
      type: 'Autorisation',
      uploadDate: '2024-02-20',
      status: 'expired',
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance/bank-relations')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{bank.name}</h1>
            <p className="text-gray-500">{bank.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/finance/bank-relations/${id}/accounts/new`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau Compte
          </button>
        </div>
      </div>

      {/* Bank Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">{bank.address}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Phone className="w-5 h-5" />
            <span className="text-sm">{bank.phone}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Mail className="w-5 h-5" />
            <span className="text-sm">{bank.email}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Client depuis 2023</span>
          </div>
        </div>
      </div>

      {/* Accounts Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Comptes Bancaires</h2>
          <button
            onClick={() => navigate(`/finance/bank-relations/${id}/accounts/new`)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Ajouter
          </button>
        </div>
        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{account.number}</h3>
                  <p className="text-sm text-gray-500">
                    {account.type} - {account.currency}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm font-medium text-gray-900">
                      {account.balance.toLocaleString('fr-FR')} {account.currency}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(account.status)}`}>
                      {account.status === 'active' ? 'Actif' :
                       account.status === 'inactive' ? 'Inactif' : 'En attente'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/finance/bank-relations/${id}/accounts/${account.id}`)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contacts</h2>
          <button
            onClick={() => setShowNewContactModal(true)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Ajouter
          </button>
        </div>
        <div className="space-y-4">
          {contacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.position}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{contact.email}</span>
                    <span className="text-sm text-gray-500">{contact.phone}</span>
                    {contact.isPrimary && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        Contact Principal
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/finance/bank-relations/${id}/contacts/${contact.id}`)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          <button
            onClick={() => setShowNewDocumentModal(true)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Ajouter
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