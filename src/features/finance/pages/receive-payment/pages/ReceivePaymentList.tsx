import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Download, FileText, Calendar, CreditCard, Building } from 'lucide-react';
import PaymentDetails from '../components/PaymentDetails';
import DeletePaymentConfirmation from '../components/DeletePaymentConfirmation';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'unpaid';
}

interface Payment {
  id: string;
  customer: Customer;
  date: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  account: Account;
  invoices: Invoice[];
  notes: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  depositTo: Account;
  taxAmount: number;
  taxRate: number;
  currency: string;
  exchangeRate: number;
  memo: string;
  tags: string[];
}

export default function ReceivePaymentList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data - replace with actual API call
  const payments: Payment[] = [
    {
      id: '1',
      customer: {
        id: '1',
        name: 'Client ABC',
        email: 'client@abc.com',
        phone: '+221 77 123 4567',
        address: 'Dakar, Sénégal'
      },
      date: '2024-03-15',
      amount: 1500000,
      paymentMethod: 'Virement bancaire',
      reference: 'PAY-2024-001',
      status: 'completed',
      account: {
        id: '1',
        code: '512',
        name: 'Banque',
        type: 'asset'
      },
      depositTo: {
        id: '1',
        code: '512',
        name: 'Banque',
        type: 'asset'
      },
      invoices: [
        {
          id: '1',
          number: 'INV-2024-001',
          amount: 1500000,
          dueDate: '2024-03-15',
          status: 'paid'
        }
      ],
      notes: 'Paiement pour services de consultation',
      attachments: [],
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
      taxAmount: 0,
      taxRate: 0,
      currency: 'XOF',
      exchangeRate: 1,
      memo: 'Paiement complet',
      tags: ['consultation', 'urgent']
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    
    const matchesDateRange = 
      (!dateRange.start || payment.date >= dateRange.start) &&
      (!dateRange.end || payment.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (payment: Payment) => {
    setPaymentToDelete(payment);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete logic
    setIsDeleteModalOpen(false);
    setPaymentToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      case 'refunded':
        return 'Remboursé';
      default:
        return status;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reçus de paiement</h1>
                <p className="text-sm text-gray-500">Gérez vos reçus de paiement et suivez vos comptes</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
                <Link
                  to="/receive-payment/new"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau reçu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b bg-white">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un reçu..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors duration-200"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg transition-colors duration-200"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="completed">Complété</option>
                  <option value="failed">Échoué</option>
                  <option value="refunded">Remboursé</option>
                </select>
              </div>
              <div>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full justify-center transition-colors duration-200"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Plus de filtres
                </button>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="flex-1 overflow-auto">
            <div className="min-w-full divide-y divide-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Méthode
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{payment.customer.name}</div>
                            <div className="text-xs text-gray-500">
                              {payment.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.amount.toLocaleString('fr-FR')} {payment.currency}
                        </div>
                        {payment.taxAmount > 0 && (
                          <div className="text-xs text-gray-500">
                            TVA: {payment.taxAmount.toLocaleString('fr-FR')} {payment.currency}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.paymentMethod}</div>
                        <div className="text-xs text-gray-500">{payment.account.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(payment)}
                            className="text-blue-600 hover:text-blue-900 text-xs"
                          >
                            Voir
                          </button>
                          <Link
                            to={`/receive-payment/${payment.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 text-xs"
                          >
                            Modifier
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(payment)}
                            className="text-red-600 hover:text-red-900 text-xs"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedPayment && (
        <PaymentDetails
          payment={selectedPayment}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedPayment(null);
          }}
        />
      )}

      {paymentToDelete && (
        <DeletePaymentConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setPaymentToDelete(null);
          } }
          onConfirm={handleDeleteConfirm} payment={{
            id: '',
            reference: '',
            amount: 0,
            currency: ''
          }}        />
      )}
    </div>
  );
} 