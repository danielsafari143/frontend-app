import React from 'react';
import { X, FileText, Tag, Calendar, CreditCard, Building, Receipt } from 'lucide-react';

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

interface PaymentDetailsProps {
  payment: Payment;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentDetails({ payment, isOpen, onClose }: PaymentDetailsProps) {
  if (!isOpen) return null;

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
                      Détails du paiement
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {payment.reference}
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
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Customer Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Client
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Nom</label>
                            <p className="text-sm text-gray-900">{payment.customer.name}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Email</label>
                            <p className="text-sm text-gray-900">{payment.customer.email}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Téléphone</label>
                            <p className="text-sm text-gray-900">{payment.customer.phone}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Adresse</label>
                            <p className="text-sm text-gray-900">{payment.customer.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Informations de paiement
                        </h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-xs text-gray-500">Montant</label>
                            <p className="text-sm text-gray-900">
                              {payment.amount.toLocaleString('fr-FR')} {payment.currency}
                            </p>
                          </div>
                          {payment.taxAmount > 0 && (
                            <div>
                              <label className="text-xs text-gray-500">TVA ({payment.taxRate}%)</label>
                              <p className="text-sm text-gray-900">
                                {payment.taxAmount.toLocaleString('fr-FR')} {payment.currency}
                              </p>
                            </div>
                          )}
                          <div>
                            <label className="text-xs text-gray-500">Méthode de paiement</label>
                            <p className="text-sm text-gray-900">{payment.paymentMethod}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Compte</label>
                            <p className="text-sm text-gray-900">{payment.account.name}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Déposer sur</label>
                            <p className="text-sm text-gray-900">{payment.depositTo.name}</p>
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
                            <label className="text-xs text-gray-500">Date du paiement</label>
                            <p className="text-sm text-gray-900">
                              {new Date(payment.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Créé le</label>
                            <p className="text-sm text-gray-900">
                              {new Date(payment.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Mis à jour le</label>
                            <p className="text-sm text-gray-900">
                              {new Date(payment.updatedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                        <div className="mt-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                            {getStatusText(payment.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Invoices */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 flex items-center">
                          <Receipt className="h-4 w-4 mr-2" />
                          Factures
                        </h4>
                        <div className="mt-2 space-y-2">
                          {payment.invoices.map((invoice) => (
                            <div key={invoice.id} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{invoice.number}</p>
                                  <p className="text-xs text-gray-500">
                                    {invoice.amount.toLocaleString('fr-FR')} {payment.currency}
                                  </p>
                                </div>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                  invoice.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {invoice.status === 'paid' ? 'Payée' :
                                   invoice.status === 'partial' ? 'Partielle' : 'Non payée'}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          ))}
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
                          {payment.tags.length > 0 && (
                            <div>
                              <label className="text-xs text-gray-500">Tags</label>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {payment.tags.map((tag) => (
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
                          {payment.notes && (
                            <div>
                              <label className="text-xs text-gray-500">Notes</label>
                              <p className="text-sm text-gray-900">{payment.notes}</p>
                            </div>
                          )}
                          {payment.memo && (
                            <div>
                              <label className="text-xs text-gray-500">Mémo</label>
                              <p className="text-sm text-gray-900">{payment.memo}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Attachments */}
                      {payment.attachments.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Pièces jointes
                          </h4>
                          <div className="mt-2 space-y-2">
                            {payment.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-900">
                                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                {attachment}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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