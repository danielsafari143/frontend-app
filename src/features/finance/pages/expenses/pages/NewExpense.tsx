import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, FileText } from 'lucide-react';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
}

interface ExpenseFormData {
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
  receipt?: File;
  notes: string;
  tags: string[];
  dueDate: string;
  paymentDate?: string;
  recurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  attachments: File[];
}

const mockAccounts: Account[] = [
  { id: '1', code: '401', name: 'Fournisseurs', type: 'liability' },
  { id: '2', code: '607', name: 'Achats de marchandises', type: 'expense' },
  { id: '3', code: '621', name: 'Personnel', type: 'expense' },
  { id: '4', code: '622', name: 'Rémunérations du personnel', type: 'expense' },
  { id: '5', code: '623', name: 'Charges de sécurité sociale', type: 'expense' },
];

const categories = [
  'Achats',
  'Salaires',
  'Loyer',
  'Services',
  'Marketing',
  'Transport',
  'Équipement',
  'Autres',
];

const paymentMethods = [
  'Espèces',
  'Virement bancaire',
  'Carte bancaire',
  'Chèque',
  'Mobile Money',
];

export default function NewExpense() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ExpenseFormData>({
    title: '',
    description: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    paymentMethod: '',
    account: mockAccounts[0],
    vendor: '',
    reference: '',
    taxAmount: 0,
    taxRate: 18,
    notes: '',
    tags: [],
    dueDate: new Date().toISOString().split('T')[0],
    recurring: false,
    attachments: [],
  });

  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const account = mockAccounts.find(acc => acc.id === e.target.value);
    if (account) {
      setFormData(prev => ({
        ...prev,
        account,
      }));
    }
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximale: 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        receipt: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    navigate('/expenses');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/expenses')}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux dépenses
        </button>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Nouvelle dépense</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Informations de base</h3>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Catégorie
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Informations financières</h3>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Montant
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">FCFA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                    Taux de TVA (%)
                  </label>
                  <input
                    type="number"
                    name="taxRate"
                    id="taxRate"
                    min="0"
                    max="100"
                    value={formData.taxRate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Méthode de paiement
                  </label>
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    required
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  >
                    <option value="">Sélectionner une méthode</option>
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Vendor and Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Fournisseur et compte</h3>
                <div>
                  <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">
                    Fournisseur
                  </label>
                  <input
                    type="text"
                    name="vendor"
                    id="vendor"
                    required
                    value={formData.vendor}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                    Référence
                  </label>
                  <input
                    type="text"
                    name="reference"
                    id="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                    Compte
                  </label>
                  <select
                    name="account"
                    id="account"
                    required
                    value={formData.account.id}
                    onChange={handleAccountChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  >
                    {mockAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.code} - {account.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Dates</h3>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date de la dépense
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
                    Date de paiement
                  </label>
                  <input
                    type="date"
                    name="paymentDate"
                    id="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Informations supplémentaires</h3>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInputKeyDown}
                      placeholder="Appuyez sur Entrée pour ajouter un tag"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Récurrence
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="recurring"
                        id="recurring"
                        checked={formData.recurring}
                        onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">
                        Dépense récurrente
                      </label>
                    </div>
                    {formData.recurring && (
                      <select
                        name="recurringFrequency"
                        value={formData.recurringFrequency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                      >
                        <option value="daily">Quotidien</option>
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuel</option>
                        <option value="quarterly">Trimestriel</option>
                        <option value="yearly">Annuel</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Pièces jointes</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reçu
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {receiptPreview ? (
                        <div className="relative">
                          <img
                            src={receiptPreview}
                            alt="Receipt preview"
                            className="mx-auto h-32 w-auto object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setReceiptPreview(null);
                              setFormData(prev => ({ ...prev, receipt: undefined }));
                            }}
                            className="absolute top-0 right-0 -mt-2 -mr-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="receipt"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Télécharger un fichier</span>
                              <input
                                id="receipt"
                                name="receipt"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleReceiptChange}
                              />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF jusqu'à 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Autres pièces jointes
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                            onChange={handleAttachmentChange}
                          />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Tous types de fichiers jusqu'à 5MB
                      </p>
                    </div>
                  </div>
                  {formData.attachments.length > 0 && (
                    <ul className="mt-2 divide-y divide-gray-200">
                      {formData.attachments.map((file, index) => (
                        <li key={index} className="py-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/expenses')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Créer la dépense
          </button>
        </div>
      </form>
    </div>
  );
} 