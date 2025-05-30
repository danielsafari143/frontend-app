import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  FileSpreadsheet,
  FileText,
  FileCheck,
  FileWarning,
  FileX,
  BarChart3,
  PieChart,
  TrendingUp,
  User,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
}

export default function Customers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sample data for customers
  const customers: Customer[] = [
    {
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
    },
    {
      id: '2',
      code: 'CLI002',
      name: 'Jean Dupont',
      type: 'individual',
      email: 'jean.dupont@email.com',
      phone: '+225 0123456789',
      address: 'Abidjan, Marcory',
      status: 'active',
      lastContact: '2024-03-10',
      totalOrders: 5,
      totalValue: 5000000,
    },
    // Add more customers...
  ];

  const toggleCustomer = (customerId: string) => {
    const newExpanded = new Set(expandedCustomers);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedCustomers(newExpanded);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting customer:', selectedCustomer);
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" />
              Clients
            </h1>
            <p className="text-gray-500">Gestion des clients</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/crm/customers/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouveau client
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="blocked">Bloqué</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Tous les types</option>
          <option>Entreprise</option>
          <option>Particulier</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernier contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <React.Fragment key={customer.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCustomer(customer.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedCustomers.has(customer.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{customer.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{customer.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{customer.type === 'company' ? 'Entreprise' : 'Particulier'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{customer.lastContact}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                        customer.status === 'active' ? 'bg-green-100 text-green-800' :
                        customer.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {customer.status === 'active' ? 'Actif' :
                         customer.status === 'inactive' ? 'Inactif' : 'Bloqué'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/crm/customers/${customer.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/crm/customers/${customer.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCustomers.has(customer.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Informations détaillées</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Adresse:</span> {customer.address}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Total des commandes:</span> {customer.totalOrders}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Valeur totale:</span> {formatAmount(customer.totalValue)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Actions rapides</h3>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Nouvelle commande
                              </button>
                              <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                                Envoyer un message
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedCustomer && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer le client"
          itemName={selectedCustomer.name}
          itemType="client"
          customMessage={`Cette action supprimera définitivement le client "${selectedCustomer.name}". Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 