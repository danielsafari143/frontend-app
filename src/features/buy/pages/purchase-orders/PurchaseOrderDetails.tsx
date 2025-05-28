import React from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Printer,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  MoreVertical,
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

interface PurchaseOrder {
  id: string;
  number: string;
  supplier: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  date: string;
  deliveryDate: string;
  paymentTerms: string;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  items: PurchaseOrderItem[];
  notes: string;
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  total: number;
}

export default function PurchaseOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const purchaseOrder: PurchaseOrder = {
    id: '1',
    number: 'PO-2024-001',
    supplier: {
      id: '1',
      name: 'Fournisseur A',
      address: '123 Rue du Commerce, 75001 Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@fournisseura.com',
    },
    date: '2024-03-15',
    deliveryDate: '2024-03-30',
    paymentTerms: '30 jours',
    status: 'pending',
    items: [
      {
        id: '1',
        productId: '1',
        description: 'Article A',
        quantity: 5,
        unitPrice: 100.00,
        discount: 10,
        taxRate: 20,
        total: 540.00,
      },
      {
        id: '2',
        productId: '2',
        description: 'Article B',
        quantity: 3,
        unitPrice: 150.00,
        discount: 0,
        taxRate: 20,
        total: 540.00,
      },
    ],
    notes: 'Livraison prévue le matin.',
    subtotal: 950.00,
    totalDiscount: 50.00,
    totalTax: 180.00,
    total: 1080.00,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'received':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Approuvée';
      case 'received':
        return 'Reçue';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

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
            <h1 className="text-2xl font-semibold text-gray-900">
              Commande fournisseur {purchaseOrder.number}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Créée le {purchaseOrder.date}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="h-5 w-5 mr-2" />
            Imprimer
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Télécharger
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5 mr-2" />
            Envoyer
          </button>
        </div>
      </div>

      {/* Status and Supplier Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Statut de la commande</h2>
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(purchaseOrder.status)}`}>
              {getStatusIcon(purchaseOrder.status)}
              <span className="ml-1">{getStatusText(purchaseOrder.status)}</span>
            </span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date de commande</span>
              <span className="text-gray-900">{purchaseOrder.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date de livraison souhaitée</span>
              <span className="text-gray-900">{purchaseOrder.deliveryDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Conditions de paiement</span>
              <span className="text-gray-900">{purchaseOrder.paymentTerms}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Fournisseur</h2>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">{purchaseOrder.supplier.name}</p>
            <p className="text-sm text-gray-500">{purchaseOrder.supplier.address}</p>
            <p className="text-sm text-gray-500">{purchaseOrder.supplier.phone}</p>
            <p className="text-sm text-gray-500">{purchaseOrder.supplier.email}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Articles</h2>
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
                  Remise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TVA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {purchaseOrder.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.productId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.unitPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.discount}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.taxRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes and Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
          <p className="text-sm text-gray-500">{purchaseOrder.notes}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Totaux</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sous-total</span>
              <span className="text-gray-900">
                {purchaseOrder.subtotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Remises</span>
              <span className="text-gray-900">
                {purchaseOrder.totalDiscount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">TVA</span>
              <span className="text-gray-900">
                {purchaseOrder.totalTax.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium border-t border-gray-100 pt-2">
              <span>Total</span>
              <span className="text-blue-600">
                {purchaseOrder.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 