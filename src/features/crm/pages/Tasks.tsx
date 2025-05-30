import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock4,
  User,
  Tag,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  FileText,
  Mail,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: string;
  category: string;
  relatedTo: {
    type: 'customer' | 'supplier' | 'contact';
    name: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  // Sample tasks data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Suivi paiement client ABC',
      description: 'Vérifier le statut du paiement de la facture #2024-001',
      dueDate: '2024-03-25',
      priority: 'high',
      status: 'pending',
      assignedTo: 'John Doe',
      category: 'Finance',
      relatedTo: {
        type: 'customer',
        name: 'Entreprise ABC',
        id: '1'
      },
      createdAt: '2024-03-20',
      updatedAt: '2024-03-20'
    },
    {
      id: '2',
      title: 'Renouvellement contrat XYZ',
      description: 'Préparer le nouveau contrat pour le client XYZ',
      dueDate: '2024-03-28',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Jane Smith',
      category: 'Contrat',
      relatedTo: {
        type: 'customer',
        name: 'Société XYZ',
        id: '2'
      },
      createdAt: '2024-03-19',
      updatedAt: '2024-03-20'
    },
    {
      id: '3',
      title: 'Mise à jour fiche fournisseur',
      description: 'Mettre à jour les informations de contact du fournisseur',
      dueDate: '2024-03-22',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Mike Johnson',
      category: 'Fournisseur',
      relatedTo: {
        type: 'supplier',
        name: 'Fournisseur ABC',
        id: '3'
      },
      createdAt: '2024-03-18',
      updatedAt: '2024-03-21'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock4 className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-7 h-7 text-blue-600" />
            Gestion des Tâches
          </h1>
          <p className="text-gray-500">Suivez et gérez vos tâches</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/crm/tasks/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvelle tâche
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher des tâches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="overdue">En retard</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tâche</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigné à</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'échéance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <React.Fragment key={task.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedTask === task.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <div className="font-medium text-gray-900">{task.title}</div>
                          <div className="text-sm text-gray-500">{task.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {task.status === 'in_progress' ? 'En cours' :
                         task.status === 'completed' ? 'Terminé' :
                         task.status === 'overdue' ? 'En retard' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? 'Haute' :
                         task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{task.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/crm/tasks/${task.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Voir
                        </Link>
                        <Link
                          to={`/crm/tasks/${task.id}/edit`}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Modifier
                        </Link>
                      </div>
                    </td>
                  </tr>
                  {expandedTask === task.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Description</h4>
                            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Lié à</h4>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                {task.relatedTo.type === 'customer' ? 'Client' :
                                 task.relatedTo.type === 'supplier' ? 'Fournisseur' : 'Contact'}:
                              </span>
                              <Link
                                to={`/crm/${task.relatedTo.type}s/${task.relatedTo.id}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {task.relatedTo.name}
                              </Link>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Créé le {task.createdAt}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Mis à jour le {task.updatedAt}
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
    </div>
  );
} 