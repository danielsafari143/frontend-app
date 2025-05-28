import React, { useState } from 'react';
import { 
  Users, Building2, UserPlus, Activity, Plus, Search, 
  Filter, Bell, FileText, Mail, Phone, MapPin, 
  Calendar, Clock, ArrowUpRight, ArrowDownRight,
  FileCheck, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CRM() {
  const [searchQuery, setSearchQuery] = useState('');

  // Stats data
  const stats = [
    {
      label: 'Clients',
      value: 156,
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-5 h-5 text-blue-500" />,
      detail: 'Dont 142 actifs'
    },
    {
      label: 'Fournisseurs',
      value: 89,
      change: '+5%',
      trend: 'up',
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      detail: 'Dont 82 actifs'
    },
    {
      label: 'Contacts',
      value: 423,
      change: '+8%',
      trend: 'up',
      icon: <UserPlus className="w-5 h-5 text-purple-500" />,
      detail: 'Dont 398 actifs'
    },
    {
      label: 'Documents',
      value: 1.2,
      change: '+15%',
      trend: 'up',
      icon: <FileText className="w-5 h-5 text-orange-500" />,
      detail: 'K documents'
    },
    {
      label: 'Tâches en Attente',
      value: 23,
      change: '-5%',
      trend: 'down',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      detail: 'Dont 8 prioritaires'
    }
  ];

  // Mock data for demonstration
  const recentCustomers = [
    {
      id: '1',
      name: 'Entreprise ABC',
      email: 'contact@abc.com',
      phone: '+33 1 23 45 67 89',
      status: 'active',
      creditLimit: 50000,
      lastActivity: '2024-03-20',
      paymentTerms: '30 jours'
    },
    {
      id: '2',
      name: 'Société XYZ',
      email: 'info@xyz.com',
      phone: '+33 1 98 76 54 32',
      status: 'active',
      creditLimit: 75000,
      lastActivity: '2024-03-19',
      paymentTerms: '45 jours'
    },
    // Add more mock customers...
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'customer',
      action: 'created',
      entityName: 'Entreprise ABC',
      user: 'John Doe',
      timestamp: '2024-03-20 14:30',
      details: 'Nouveau client ajouté'
    },
    {
      id: '2',
      type: 'supplier',
      action: 'updated',
      entityName: 'Fournisseur XYZ',
      user: 'Jane Smith',
      timestamp: '2024-03-20 13:15',
      details: 'Mise à jour des conditions de paiement'
    },
    // Add more mock activities...
  ];

  const upcomingTasks = [
    {
      id: '1',
      title: 'Suivi paiement client ABC',
      dueDate: '2024-03-25',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Renouvellement contrat XYZ',
      dueDate: '2024-03-28',
      priority: 'medium',
      status: 'pending'
    },
    // Add more mock tasks...
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            CRM Dashboard
          </h1>
          <p className="text-gray-500">Gestion de la relation client</p>
        </div>
        <div className="flex gap-2">
          <Link to="/crm/customers/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nouveau client
          </Link>
          <Link to="/crm/suppliers/new" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" /> Nouveau fournisseur
          </Link>
          <Link to="/crm/contacts/new" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Nouveau contact
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {stat.value.toLocaleString('fr-FR')}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher clients, fournisseurs, contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      {/* Recent Customers Table */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Clients Récents
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limite Crédit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Activité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.paymentTerms}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 
                      customer.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">
                      {customer.creditLimit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {customer.lastActivity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link to={`/crm/customers/${customer.id}`} className="text-blue-600 hover:text-blue-800">
                        Voir
                      </Link>
                      <Link to={`/crm/customers/${customer.id}/edit`} className="text-gray-600 hover:text-gray-800">
                        Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities & Upcoming Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Activités Récentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{activity.entityName}</div>
                      <div className="text-sm text-gray-500">{activity.timestamp}</div>
                    </div>
                    <div className="text-sm text-gray-600">{activity.details}</div>
                    <div className="text-xs text-gray-500 mt-1">Par {activity.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Tâches à Venir
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500">Échéance: {task.dueDate}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
