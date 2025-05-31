import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Receipt, Download, FileText, Calendar } from 'lucide-react';
import ExpenseDetails from '../components/ExpenseDetails';
import DeleteExpenseConfirmation from '../components/DeleteExpenseConfirmation';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  paymentMethod: string;
  account: Account;
  vendor: string;
  reference: string;
  taxAmount: number;
  taxRate: number;
  receipt?: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  paymentDate?: string;
  recurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  attachments: string[];
}

export default function ExpenseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data - replace with actual API call
  const expenses: Expense[] = [
    {
      id: '1',
      title: 'Achat de fournitures de bureau',
      description: 'Achat de fournitures pour le bureau',
      amount: 150000,
      category: 'Fournitures',
      date: '2024-03-15',
      status: 'approved',
      paymentMethod: 'Virement bancaire',
      account: {
        id: '1',
        code: '6221',
        name: 'Fournitures de bureau',
        type: 'expense'
      },
      vendor: 'Office Supplies Ltd',
      reference: 'INV-2024-001',
      taxAmount: 25000,
      taxRate: 18,
      notes: 'Commande urgente pour le nouveau bureau',
      tags: ['bureau', 'urgent'],
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
      dueDate: '2024-04-15',
      paymentDate: '2024-03-20',
      recurring: false,
      attachments: []
    },
    {
      id: '2',
      title: 'Frais de transport',
      description: 'Frais de transport pour réunion client',
      amount: 25000,
      category: 'Transport',
      date: '2024-03-14',
      status: 'pending',
      paymentMethod: 'Espèces',
      account: {
        id: '2',
        code: '6241',
        name: 'Frais de transport',
        type: 'expense'
      },
      vendor: 'Taxi Service',
      reference: 'TR-2024-001',
      taxAmount: 0,
      taxRate: 0,
      notes: 'Transport pour réunion client à Dakar',
      tags: ['transport', 'client'],
      createdAt: '2024-03-14T10:00:00Z',
      updatedAt: '2024-03-14T10:00:00Z',
      dueDate: '2024-03-14',
      recurring: false,
      attachments: []
    }
  ];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
    
    const matchesDateRange = 
      (!dateRange.start || expense.date >= dateRange.start) &&
      (!dateRange.end || expense.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const handleViewDetails = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete logic
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejeté';
      case 'paid':
        return 'Payé';
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
                <h1 className="text-xl font-bold text-gray-900">Dépenses</h1>
                <p className="text-sm text-gray-500">Gérez vos dépenses et suivez vos comptes</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
                <Link
                  to="/expenses/new"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle dépense
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
                    placeholder="Rechercher une dépense..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvé</option>
                  <option value="rejected">Rejeté</option>
                  <option value="paid">Payé</option>
                </select>
              </div>
              <div>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full justify-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Plus de filtres
                </button>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="flex-1 overflow-auto">
            <div className="min-w-full divide-y divide-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Détails
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compte
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            {expense.receipt ? (
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={expense.receipt}
                                alt={expense.title}
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Receipt className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{expense.title}</div>
                            <div className="text-xs text-gray-500">
                              {expense.vendor} • {expense.reference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{expense.account.name}</div>
                        <div className="text-xs text-gray-500">{expense.account.code}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {expense.amount.toLocaleString('fr-FR')} FCFA
                        </div>
                        {expense.taxAmount > 0 && (
                          <div className="text-xs text-gray-500">
                            TVA: {expense.taxAmount.toLocaleString('fr-FR')} FCFA
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(expense.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-gray-500">
                          Échéance: {new Date(expense.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(expense.status)}`}>
                          {getStatusText(expense.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(expense)}
                            className="text-blue-600 hover:text-blue-900 text-xs"
                          >
                            Voir
                          </button>
                          <Link
                            to={`/expenses/${expense.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 text-xs"
                          >
                            Modifier
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(expense)}
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
      {selectedExpense && (
        <ExpenseDetails
          expense={selectedExpense}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedExpense(null);
          }}
        />
      )}

      {expenseToDelete && (
        <DeleteExpenseConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setExpenseToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          expenseTitle={expenseToDelete.title}
        />
      )}
    </div>
  );
} 