import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  X,
  Wallet,
  CreditCard,
  Building2,
  Calendar,
  Percent,
  DollarSign,
} from 'lucide-react';

interface AccountFormData {
  number: string;
  type: string;
  currency: string;
  openingDate: string;
  interestRate: string;
  overdraftLimit: string;
  description: string;
}

export default function NewAccount() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<AccountFormData>({
    number: '',
    type: '',
    currency: 'FCFA',
    openingDate: new Date().toISOString().split('T')[0],
    interestRate: '',
    overdraftLimit: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement account creation logic
    console.log('Creating new account:', formData);
    navigate(`/finance/bank-relations/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Compte Bancaire</h1>
            <p className="text-gray-500">Ajouter un nouveau compte bancaire</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Informations de base</h2>
              
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                  Numéro de compte *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: SN123456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type de compte *
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="current">Compte Courant</option>
                  <option value="savings">Compte Épargne</option>
                  <option value="fixed">Compte à Terme</option>
                  <option value="investment">Compte d'Investissement</option>
                </select>
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Devise *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="currency"
                    id="currency"
                    required
                    value={formData.currency}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Informations supplémentaires</h2>
              
              <div>
                <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
                  Date d'ouverture *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="openingDate"
                    id="openingDate"
                    required
                    value={formData.openingDate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                  Taux d'intérêt (%)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="interestRate"
                    id="interestRate"
                    step="0.01"
                    value={formData.interestRate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: 2.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="overdraftLimit" className="block text-sm font-medium text-gray-700">
                  Limite de découvert
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Wallet className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="overdraftLimit"
                    id="overdraftLimit"
                    value={formData.overdraftLimit}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Limite de découvert"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description du compte..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/finance/bank-relations/${id}`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
} 