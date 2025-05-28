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
} from 'lucide-react';

interface PurchaseOrderItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  total: number;
}

export default function NewPurchaseOrder() {
  const navigate = useNavigate();
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [notes, setNotes] = useState('');

  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: Date.now().toString(),
      productId: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxRate: 20,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof PurchaseOrderItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total
        const total = updatedItem.quantity * updatedItem.unitPrice;
        const discountAmount = total * (updatedItem.discount / 100);
        const subtotal = total - discountAmount;
        const taxAmount = subtotal * (updatedItem.taxRate / 100);
        updatedItem.total = subtotal + taxAmount;
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalDiscount = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      return sum + (itemTotal * (item.discount / 100));
    }, 0);
    const totalTax = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      const itemDiscount = itemTotal * (item.discount / 100);
      const itemSubtotal = itemTotal - itemDiscount;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    const total = subtotal - totalDiscount + totalTax;

    return {
      subtotal,
      totalDiscount,
      totalTax,
      total,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement purchase order creation logic
    navigate('/buy/purchase-orders');
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/buy/purchase-orders')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Nouvelle commande fournisseur</h1>
            <p className="mt-1 text-sm text-gray-500">
              Créez une nouvelle commande fournisseur
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Enregistrer
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Send className="h-5 w-5 mr-2" />
            Envoyer
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Supplier and Delivery Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                Fournisseur
              </label>
              <select
                id="supplier"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Sélectionner un fournisseur</option>
                <option value="1">Fournisseur A</option>
                <option value="2">Fournisseur B</option>
                <option value="3">Fournisseur C</option>
              </select>
            </div>
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
                Date de livraison souhaitée
              </label>
              <input
                type="date"
                id="deliveryDate"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">
                Conditions de paiement
              </label>
              <select
                id="paymentTerms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Sélectionner les conditions</option>
                <option value="immediate">Paiement immédiat</option>
                <option value="30days">30 jours</option>
                <option value="60days">60 jours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Articles</h2>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter un article
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remise (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TVA (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">Sélectionner un article</option>
                        <option value="1">Article A</option>
                        <option value="2">Article B</option>
                        <option value="3">Article C</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="1"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        step="0.01"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.taxRate}
                        onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="0"
                        max="100"
                        step="0.01"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ajoutez des notes ou des instructions supplémentaires..."
          />
        </div>

        {/* Totals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sous-total</span>
                <span className="text-gray-900">
                  {totals.subtotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Remises</span>
                <span className="text-gray-900">
                  {totals.totalDiscount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">TVA</span>
                <span className="text-gray-900">
                  {totals.totalTax.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-gray-100 pt-2">
                <span>Total</span>
                <span className="text-blue-600">
                  {totals.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 