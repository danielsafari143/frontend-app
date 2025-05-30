import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
  Users,
  Building2,
  CreditCard,
  Wallet,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface CashFlow {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'in' | 'out';
  category: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  paymentMethod: string;
}

interface Category {
  id: string;
  name: string;
  type: 'in' | 'out';
  icon: React.ReactNode;
}

export default function CashFlow() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'in' | 'out' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);

  const categories: Category[] = [
    {
      id: 'sales',
      name: 'Ventes',
      type: 'in',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'loans',
      name: 'Prêts',
      type: 'in',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'suppliers',
      name: 'Fournisseurs',
      type: 'out',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: 'payroll',
      name: 'Paie',
      type: 'out',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'taxes',
      name: 'Taxes',
      type: 'out',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const transactions: CashFlow[] = [
    {
      id: '1',
      date: '2024-03-20',
      description: 'Paiement client XYZ',
      amount: 5000000,
      type: 'in',
      category: 'sales',
      status: 'completed',
      reference: 'INV-2024-001',
      paymentMethod: 'Virement',
    },
    {
      id: '2',
      date: '2024-03-19',
      description: 'Paiement fournisseur ABC',
      amount: 2500000,
      type: 'out',
      category: 'suppliers',
      status: 'pending',
      reference: 'PO-2024-002',
      paymentMethod: 'Chèque',
    },
    {
      id: '3',
      date: '2024-03-18',
      description: 'Paiement des salaires',
      amount: 15000000,
      type: 'out',
      category: 'payroll',
      status: 'completed',
      reference: 'PAY-2024-003',
      paymentMethod: 'Virement',
    },
  ];

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || <FileText className="w-5 h-5" />;
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'virement':
        return <ArrowUpRight className="w-5 h-5" />;
      case 'chèque':
        return <FileText className="w-5 h-5" />;
      case 'carte':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || transaction.type === selectedType;
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

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
            <h1 className="text-2xl font-bold text-gray-900">Encaissements & Décaissements</h1>
            <p className="text-gray-500">Gestion des entrées et sorties de fonds</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewTransactionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Transaction
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
              placeholder="Rechercher une transaction..."
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

      {/* Type Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedType(selectedType === 'in' ? null : 'in')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedType === 'in'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ArrowUpRight className="w-5 h-5" />
          Encaissements
        </button>
        <button
          onClick={() => setSelectedType(selectedType === 'out' ? null : 'out')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedType === 'out'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ArrowDownRight className="w-5 h-5" />
          Décaissements
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories
          .filter(category => !selectedType || category.type === selectedType)
          .map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'in' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                  <p className="text-sm text-gray-500">{transaction.reference}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {transaction.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'in' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'in' ? '+' : '-'}
                  {transaction.amount.toLocaleString('fr-FR')} FCFA
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed'
                    ? 'bg-green-50 text-green-600'
                    : transaction.status === 'pending'
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {transaction.status === 'completed' ? 'Complété' :
                   transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Transaction Modal */}
      {showNewTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Nouvelle Transaction
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de transaction
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="in">Encaissement</option>
                  <option value="out">Décaissement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Méthode de paiement
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="virement">Virement</option>
                  <option value="cheque">Chèque</option>
                  <option value="carte">Carte</option>
                  <option value="especes">Espèces</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowNewTransactionModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowNewTransactionModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 