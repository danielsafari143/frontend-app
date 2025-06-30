import React, { useState } from 'react';
import { ArrowLeft, Upload, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface PaymentFormData {
  customer: string;
  date: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  account: string;
  depositTo: string;
  invoices: string[];
  notes: string;
  attachments: File[];
  taxAmount: number;
  taxRate: number;
  currency: string;
  exchangeRate: number;
  memo: string;
  tags: string[];
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Client A',
    email: 'client.a@example.com',
    phone: '+1234567890',
    address: '123 Rue Example, Ville',
  },
  {
    id: '2',
    name: 'Client B',
    email: 'client.b@example.com',
    phone: '+0987654321',
    address: '456 Avenue Test, Ville',
  },
];

const mockAccounts: Account[] = [
  {
    id: '1',
    code: '1001',
    name: 'Compte Bancaire Principal',
    type: 'asset',
  },
  {
    id: '2',
    code: '1002',
    name: 'Compte Bancaire Secondaire',
    type: 'asset',
  },
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-001',
    amount: 1000,
    dueDate: '2024-03-31',
    status: 'unpaid',
  },
  {
    id: '2',
    number: 'INV-002',
    amount: 2000,
    dueDate: '2024-04-15',
    status: 'unpaid',
  },
];

const paymentMethods = [
  'Virement bancaire',
  'Carte de crédit',
  'Espèces',
  'Chèque',
  'PayPal',
];

const currencies = ['EUR', 'USD', 'GBP'];

export default function NewPayment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PaymentFormData>({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    paymentMethod: '',
    reference: '',
    account: '',
    depositTo: '',
    invoices: [],
    notes: '',
    attachments: [],
    taxAmount: 0,
    taxRate: 20,
    currency: 'EUR',
    exchangeRate: 1,
    memo: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate tax amount when amount or tax rate changes
    if (name === 'amount' || name === 'taxRate') {
      const amount = name === 'amount' ? parseFloat(value) : formData.amount;
      const rate = name === 'taxRate' ? parseFloat(value) : formData.taxRate;
      setFormData((prev) => ({
        ...prev,
        taxAmount: (amount * rate) / 100,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    navigate('/receive-payment');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/receive-payment')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux paiements
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Nouveau paiement
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <select
                  id="customer"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {mockCustomers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date du paiement
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Montant
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                    min="0"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">{formData.currency}</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                  Taux de TVA (%)
                </label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  Méthode de paiement
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner une méthode</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                  Référence
                </label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                  Compte
                </label>
                <select
                  id="account"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  {mockAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="depositTo" className="block text-sm font-medium text-gray-700">
                  Déposer sur
                </label>
                <select
                  id="depositTo"
                  name="depositTo"
                  value={formData.depositTo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Sélectionner un compte</option>
                  {mockAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoices */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Factures
              </label>
              <div className="mt-2 space-y-2">
                {mockInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`invoice-${invoice.id}`}
                      checked={formData.invoices.includes(invoice.id)}
                      onChange={(e) => {
                        const newInvoices = e.target.checked
                          ? [...formData.invoices, invoice.id]
                          : formData.invoices.filter((id) => id !== invoice.id);
                        setFormData((prev) => ({ ...prev, invoices: newInvoices }));
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`invoice-${invoice.id}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {invoice.number} - {invoice.amount.toLocaleString('fr-FR')} {formData.currency}
                      {' '}
                      <span className="text-gray-500">
                        (Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Devise
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-700">
                  Taux de change
                </label>
                <input
                  type="number"
                  id="exchangeRate"
                  name="exchangeRate"
                  value={formData.exchangeRate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Appuyez sur Entrée pour ajouter un tag"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-blue-200 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes and Memo */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
                  Mémo
                </label>
                <textarea
                  id="memo"
                  name="memo"
                  value={formData.memo}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pièces jointes
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="attachments"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Télécharger des fichiers</span>
                      <input
                        id="attachments"
                        name="attachments"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF jusqu'à 10MB
                  </p>
                </div>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Créer le paiement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 