import React from 'react';
import { X, FileText, Tag, Calendar, CreditCard, Building, Receipt } from 'lucide-react';

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

interface ExpenseDetailsProps {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseDetails({ expense, isOpen, onClose }: ExpenseDetailsProps) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Détails de la dépense
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {expense.reference}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  {/* Receipt Preview */}
                  {expense.receipt && (
                    <div className="mb-4">
                      <img
                        src={expense.receipt}
                        alt={expense.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Informations de base</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Titre</label>
                            <p className="text-sm text-gray-900">{expense.title}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Description</label>
                            <p className="text-sm text-gray-900">{expense.description}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Catégorie</label>
                            <p className="text-sm text-gray-900">{expense.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Vendor Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Fournisseur
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Nom</label>
                            <p className="text-sm text-gray-900">{expense.vendor}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Référence</label>
                            <p className="text-sm text-gray-900">{expense.reference}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Informations financières
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Montant</label>
                            <p className="text-sm text-gray-900">
                              {expense.amount.toLocaleString('fr-FR')} FCFA
                            </p>
                          </div>
                          {expense.taxAmount > 0 && (
                            <div>
                              <label className="text-xs text-gray-500">TVA ({expense.taxRate}%)</label>
                              <p className="text-sm text-gray-900">
                                {expense.taxAmount.toLocaleString('fr-FR')} FCFA
                              </p>
                            </div>
                          )}
                          <div>
                            <label className="text-xs text-gray-500">Méthode de paiement</label>
                            <p className="text-sm text-gray-900">{expense.paymentMethod}</p>
                          </div>
                        </div>
                      </div>

                      {/* Account Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Compte
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Nom du compte</label>
                            <p className="text-sm text-gray-900">{expense.account.name}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Code</label>
                            <p className="text-sm text-gray-900">{expense.account.code}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Type</label>
                            <p className="text-sm text-gray-900">{expense.account.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates and Status */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Dates
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Date de la dépense</label>
                            <p className="text-sm text-gray-900">
                              {new Date(expense.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Date d'échéance</label>
                            <p className="text-sm text-gray-900">
                              {new Date(expense.dueDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          {expense.paymentDate && (
                            <div>
                              <label className="text-xs text-gray-500">Date de paiement</label>
                              <p className="text-sm text-gray-900">
                                {new Date(expense.paymentDate).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                        <div className="mt-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(expense.status)}`}>
                            {getStatusText(expense.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Informations supplémentaires
                        </h4>
                        <div className="mt-2 space-y-2">
                          {expense.tags.length > 0 && (
                            <div>
                              <label className="text-xs text-gray-500">Tags</label>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {expense.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {expense.notes && (
                            <div>
                              <label className="text-xs text-gray-500">Notes</label>
                              <p className="text-sm text-gray-900">{expense.notes}</p>
                            </div>
                          )}
                          {expense.recurring && (
                            <div>
                              <label className="text-xs text-gray-500">Récurrence</label>
                              <p className="text-sm text-gray-900">
                                {expense.recurringFrequency}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timestamps */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Horodatage</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Créé le</label>
                            <p className="text-sm text-gray-900">
                              {new Date(expense.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Mis à jour le</label>
                            <p className="text-sm text-gray-900">
                              {new Date(expense.updatedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 