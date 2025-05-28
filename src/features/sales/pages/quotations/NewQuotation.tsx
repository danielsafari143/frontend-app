import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  Printer,
  Download,
  FileText,
} from 'lucide-react';

interface QuotationItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  total: number;
}

export default function NewQuotation() {
  const navigate = useNavigate();
  const [items, setItems] = useState<QuotationItem[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [currency, setCurrency] = useState('CDF');
  const [notes, setNotes] = useState('');
  const [terms, setTerms] = useState<string[]>([]);
  const [charges, setCharges] = useState<{ description: string; amount: number }[]>([]);

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxRate: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total
        updatedItem.total = calculateItemTotal(updatedItem);
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateItemTotal = (item: QuotationItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * item.discount) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * item.taxRate) / 100;
    return afterDiscount + taxAmount;
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalDiscount = items.reduce((sum, item) => sum + ((item.quantity * item.unitPrice * item.discount) / 100), 0);
    const totalTax = items.reduce((sum, item) => sum + ((item.quantity * item.unitPrice * (1 - item.discount / 100) * item.taxRate) / 100), 0);
    const chargesTotal = charges.reduce((sum, charge) => sum + charge.amount, 0);
    return {
      subtotal,
      totalDiscount,
      totalTax,
      chargesTotal,
      total: subtotal - totalDiscount + totalTax + chargesTotal,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to save quotation
    navigate('/sales/quotations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/sales/quotations')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour
              </button>
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-2" />
                <h1 className="text-2xl font-semibold text-gray-900">Nouveau Devis</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Printer className="h-5 w-5 mr-2" />
                Aperçu
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Enregistrer
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Selection */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Informations Client</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Sélectionner un client</option>
                    {/* Add customer options */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="CDF">CDF</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Articles</h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un article
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                    <div className="col-span-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">Sélectionner un produit</option>
                        {/* Add product options */}
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qté</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remise %</label>
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">TVA %</label>
                      <input
                        type="number"
                        value={item.taxRate}
                        onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        max="100"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Récapitulatif</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-end">
                <div className="w-72 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{calculateTotals().subtotal.toFixed(2)} {currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remises</span>
                    <span className="font-medium text-red-600">-{calculateTotals().totalDiscount.toFixed(2)} {currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">TVA</span>
                    <span className="font-medium">{calculateTotals().totalTax.toFixed(2)} {currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frais divers</span>
                    <span className="font-medium">{calculateTotals().chargesTotal.toFixed(2)} {currency}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-bold text-blue-600">{calculateTotals().total.toFixed(2)} {currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Notes et Conditions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ajoutez des notes ici..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                  <textarea
                    value={terms.join('\n')}
                    onChange={(e) => setTerms(e.target.value.split('\n'))}
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ajoutez des conditions ici..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 