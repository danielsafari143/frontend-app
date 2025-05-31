import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  X,
  DollarSign,
  Percent,
  Calendar,
  Building2,
  User,
  Home,
  FileText,
} from 'lucide-react';
import LoadingSpinner from '../../../../global-components/ui/LoadingSpinner';

interface LoanFormData {
  type: 'personal' | 'business' | 'mortgage';
  amount: string;
  interestRate: string;
  term: string;
  startDate: string;
  lender: string;
  purpose: string;
  collateral: string;
  documents: File[];
}

export default function NewLoan() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoanFormData>({
    type: 'personal',
    amount: '',
    interestRate: '',
    term: '',
    startDate: new Date().toISOString().split('T')[0],
    lender: '',
    purpose: '',
    collateral: '',
    documents: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigate('/finance/loans');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(e.target.files || [])
      }));
    }
  };

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return <User className="w-5 h-5" />;
      case 'business':
        return <Building2 className="w-5 h-5" />;
      case 'mortgage':
        return <Home className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance/loans')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouveau Prêt</h1>
            <p className="text-gray-500">Créer un nouveau prêt</p>
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
                <label className="block text-sm font-medium text-gray-700">
                  Type de prêt *
                </label>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="type"
                      value="personal"
                      checked={formData.type === 'personal'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <User className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-700">Personnel</span>
                  </label>
                  <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="type"
                      value="business"
                      checked={formData.type === 'business'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Building2 className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-700">Entreprise</span>
                  </label>
                  <label className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="type"
                      value="mortgage"
                      checked={formData.type === 'mortgage'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Home className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-700">Hypothécaire</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Montant du prêt *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Montant du prêt"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                  Taux d'intérêt *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="interestRate"
                    id="interestRate"
                    required
                    step="0.01"
                    value={formData.interestRate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Taux d'intérêt"
                  />
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Détails du prêt</h2>
              
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                  Durée (en mois) *
                </label>
                <input
                  type="number"
                  name="term"
                  id="term"
                  required
                  value={formData.term}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Durée du prêt"
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Date de début *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lender" className="block text-sm font-medium text-gray-700">
                  Prêteur *
                </label>
                <input
                  type="text"
                  name="lender"
                  id="lender"
                  required
                  value={formData.lender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nom du prêteur"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Informations supplémentaires</h2>
            
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                Objectif du prêt
              </label>
              <textarea
                name="purpose"
                id="purpose"
                rows={3}
                value={formData.purpose}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez l'objectif du prêt..."
              />
            </div>

            <div>
              <label htmlFor="collateral" className="block text-sm font-medium text-gray-700">
                Garanties
              </label>
              <textarea
                name="collateral"
                id="collateral"
                rows={3}
                value={formData.collateral}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez les garanties..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Documents
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Formats acceptés: PDF, JPG, PNG. Taille maximale: 10MB par fichier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/finance/loans')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
            Annuler
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner fullScreen={false} size="sm" />
                <span>Création en cours...</span>
              </div>
            ) : (
              <Save className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 