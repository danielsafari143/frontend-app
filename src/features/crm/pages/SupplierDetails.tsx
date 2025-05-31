import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import LoadingSpinner from '../../../global-components/ui/LoadingSpinner';

interface Supplier {
  id: string;
  code: string;
  name: string;
  type: 'local' | 'international';
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'blocked';
  lastOrder: string;
  totalOrders: number;
  totalValue: number;
  paymentTerms: string;
  notes: string;
}

export default function SupplierDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch supplier data from API
    // For now, using mock data
    const mockSupplier: Supplier = {
      id: id || '',
      code: 'FOU001',
      name: 'Fournisseur ABC',
      type: 'local',
      email: 'contact@fournisseur-abc.com',
      phone: '+225 0123456789',
      address: 'Abidjan, Cocody',
      status: 'active',
      lastOrder: '2024-03-15',
      totalOrders: 25,
      totalValue: 45000000,
      paymentTerms: '30 jours',
      notes: 'Fournisseur principal pour les produits électroniques',
    };
    setSupplier(mockSupplier);
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting supplier:', supplier);
    navigate('/crm/suppliers');
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  if (!supplier) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/suppliers')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{supplier.name}</h1>
            <p className="text-gray-500">Code: {supplier.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/crm/suppliers/${supplier.id}/edit`)}
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

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* General Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{supplier.type === 'local' ? 'Local' : 'International'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <div className="flex items-center gap-2">
                  {supplier.status === 'active' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : supplier.status === 'inactive' ? (
                    <Clock className="w-4 h-4 text-gray-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-medium">
                    {supplier.status === 'active' ? 'Actif' :
                     supplier.status === 'inactive' ? 'Inactif' : 'Bloqué'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Conditions de paiement</p>
                <p className="font-medium">{supplier.paymentTerms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière commande</p>
                <p className="font-medium">{supplier.lastOrder}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Notes</h2>
            <p className="text-gray-600">{supplier.notes}</p>
          </div>
        </div>

        {/* Contact Information and Statistics */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{supplier.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{supplier.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-medium">{supplier.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total des commandes</p>
                <p className="text-2xl font-bold">{supplier.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valeur totale</p>
                <p className="text-2xl font-bold">{formatAmount(supplier.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FileText className="w-4 h-4" /> Nouvelle commande
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
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
        title="Supprimer le fournisseur"
        itemName={supplier.name}
        itemType="fournisseur"
        customMessage={`Cette action supprimera définitivement le fournisseur "${supplier.name}" et toutes les commandes associées. Cette action est irréversible.`}
      />
    </div>
  );
} 