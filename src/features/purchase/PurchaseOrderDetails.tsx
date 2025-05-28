import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Building, Calendar, DollarSign, FileText, CheckCircle, XCircle } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  status: "pending" | "approved" | "received" | "cancelled";
  items: OrderItem[];
  notes: string;
}

export default function PurchaseOrderDetails() {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with actual API call
  const order: PurchaseOrder = {
    id: id || "PO-001",
    supplier: "Fournisseur A",
    orderDate: "2024-03-15",
    deliveryDate: "2024-03-22",
    totalAmount: 1500.00,
    status: "pending",
    items: [
      {
        id: "1",
        name: "Produit A",
        quantity: 5,
        unitPrice: 100.00,
        total: 500.00
      },
      {
        id: "2",
        name: "Produit B",
        quantity: 10,
        unitPrice: 100.00,
        total: 1000.00
      }
    ],
    notes: "Livraison prévue le matin"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "received":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "approved":
        return "Approuvé";
      case "received":
        return "Reçu";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          to="/buy"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux commandes
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commande {order.id}</h1>
              <p className="text-gray-600">Détails de la commande d'achat</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Fournisseur</p>
                  <p className="text-gray-900">{order.supplier}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p className="text-gray-900">{order.orderDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Date de livraison prévue</p>
                  <p className="text-gray-900">{order.deliveryDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Montant total</p>
                  <p className="text-gray-900">
                    {order.totalAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Nombre d'articles</p>
                  <p className="text-gray-900">{order.items.length}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-900">{order.notes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Articles commandés</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unitPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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

          <div className="mt-6 flex justify-end space-x-3">
            {order.status === "pending" && (
              <>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approuver
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                  <XCircle className="w-5 h-5 mr-2" />
                  Annuler
                </button>
              </>
            )}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-2" />
              Imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 