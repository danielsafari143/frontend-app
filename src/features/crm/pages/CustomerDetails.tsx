import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  Clock,
  User,
  Building,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Customer {
  id: string;
  code: string;
  name: string;
  type: 'individual' | 'company';
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'blocked';
  lastContact: string;
  totalOrders: number;
  totalValue: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomerDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch customer data from API
    // For now, using mock data
    const mockCustomer: Customer = {
      id: '1',
      code: 'CLI001',
      name: 'Entreprise ABC',
      type: 'company',
      email: 'contact@abc.com',
      phone: '+225 0123456789',
      address: 'Abidjan, Cocody',
      status: 'active',
      lastContact: '2024-03-15',
      totalOrders: 15,
      totalValue: 25000000,
      notes: 'Client important avec un bon historique de paiement.',
      createdAt: '2024-01-01',
      updatedAt: '2024-03-15',
    };
    setCustomer(mockCustomer);
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting customer:', customer);
    navigate('/crm/customers');
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/customers')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <p className="text-gray-500">Code: {customer.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/crm/customers/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {customer.type === 'company' ? (
                    <Building className="w-5 h-5 text-blue-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {customer.type === 'company' ? 'Entreprise' : 'Particulier'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="text-sm font-medium text-gray-900">{customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total des commandes</p>
                  <p className="text-sm font-medium text-gray-900">{customer.totalOrders}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valeur totale</p>
                  <p className="text-sm font-medium text-gray-900">{formatAmount(customer.totalValue)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
            <p className="text-sm text-gray-600">{customer.notes}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Statut</h2>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                customer.status === 'active' ? 'bg-green-500' :
                customer.status === 'inactive' ? 'bg-gray-500' :
                'bg-red-500'
              }`} />
              <span className="text-sm font-medium text-gray-900">
                {customer.status === 'active' ? 'Actif' :
                 customer.status === 'inactive' ? 'Inactif' : 'Bloqué'}
              </span>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activité</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dernier contact</p>
                  <p className="text-sm font-medium text-gray-900">{customer.lastContact}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Créé le</p>
                  <p className="text-sm font-medium text-gray-900">{customer.createdAt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mis à jour le</p>
                  <p className="text-sm font-medium text-gray-900">{customer.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FileText className="w-4 h-4" /> Nouvelle commande
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Mail className="w-4 h-4" /> Envoyer un message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title="Supprimer le client"
        itemName={customer.name}
        itemType="client"
        customMessage={`Cette action supprimera définitivement le client "${customer.name}". Cette action est irréversible.`}
      />
    </div>
  );
} 