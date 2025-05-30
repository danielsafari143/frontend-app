import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  User,
  Home,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  Upload,
  X,
} from 'lucide-react';

interface LoanFormData {
  type: 'personal' | 'business' | 'mortgage';
  amount: number;
  interestRate: number;
  term: number;
  startDate: string;
  lender: string;
  purpose: string;
  collateral: string;
  documents: File[];
}

export default function EditLoan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<LoanFormData>({
    type: 'personal',
    amount: 0,
    interestRate: 0,
    term: 12,
    startDate: '',
    lender: '',
    purpose: '',
    collateral: '',
    documents: [],
  });

  // Fetch loan data
  useEffect(() => {
    // TODO: Replace with actual API call
    const loanData: LoanFormData = {
      type: 'business',
      amount: 50000,
      interestRate: 5.5,
      term: 36,
      startDate: '2024-01-01',
      lender: 'Bank of America',
      purpose: 'Expansion des opérations commerciales',
      collateral: 'Équipements de bureau',
      documents: [],
    };
    setFormData(loanData);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'interestRate' || name === 'term' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form data:', formData);
    navigate('/finance/loans');
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/finance/loans')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Modifier le prêt</h1>
              <p className="text-sm text-gray-500">Mettez à jour les informations du prêt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Loan Type */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Type de prêt</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'personal', label: 'Personnel', icon: User },
                  { value: 'business', label: 'Entreprise', icon: Building2 },
                  { value: 'mortgage', label: 'Hypothécaire', icon: Home },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <type.icon className={`w-8 h-8 mb-2 ${
                      formData.type === type.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.type === type.value ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du prêt</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant du prêt
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taux d'intérêt (%)
                  </label>
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée (mois)
                  </label>
                  <input
                    type="number"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="12"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prêteur
                  </label>
                  <input
                    type="text"
                    name="lender"
                    value={formData.lender}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom du prêteur"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations supplémentaires</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objectif du prêt
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez l'objectif du prêt..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Garantie
                  </label>
                  <textarea
                    name="collateral"
                    value={formData.collateral}
                    onChange={handleChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Décrivez les garanties..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLSX (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    {formData.documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/finance/loans')}
                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 