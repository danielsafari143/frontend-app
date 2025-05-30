import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  Calendar,
  Percent,
} from 'lucide-react';

interface ForexFormData {
  type: 'buy' | 'sell';
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  rate: string;
  date: string;
  description: string;
}

export default function NewForexTransaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForexFormData>({
    type: 'buy',
    fromCurrency: 'USD',
    toCurrency: 'FCFA',
    amount: '',
    rate: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forex transaction creation logic
    console.log('Creating new forex transaction:', formData);
    navigate('/finance/forex');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-5 h-5" />;
      case 'EUR':
        return <Euro className="w-5 h-5" />;
      case 'GBP':
        return <PoundSterling className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/finance/forex')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvelle Opération de Change</h1>
            <p className="text-gray-500">Créer une nouvelle opération de change</p>
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
                  Type d'opération *
                </label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="buy"
                      checked={formData.type === 'buy'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Achat</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="sell"
                      checked={formData.type === 'sell'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Vente</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">
                  Devise source *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCurrencyIcon(formData.fromCurrency)}
                  </div>
                  <select
                    name="fromCurrency"
                    id="fromCurrency"
                    required
                    value={formData.fromCurrency}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">USD - Dollar américain</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - Livre sterling</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">
                  Devise cible *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCurrencyIcon(formData.toCurrency)}
                  </div>
                  <select
                    name="toCurrency"
                    id="toCurrency"
                    required
                    value={formData.toCurrency}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="FCFA">FCFA - Franc CFA</option>
                    <option value="USD">USD - Dollar américain</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - Livre sterling</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Détails de la transaction</h2>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Montant *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getCurrencyIcon(formData.fromCurrency)}
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Montant à convertir"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                  Taux de change *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="rate"
                    id="rate"
                    required
                    step="0.0001"
                    value={formData.rate}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Taux de change"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date de l'opération *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="Description de l'opération..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/finance/forex')}
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