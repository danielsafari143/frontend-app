import React from 'react';
import { Link } from 'react-router';
import {
  Package,
  BarChart3,
  ArrowRight,
  Plus,
  Settings,
  ChevronDown,
  ChevronUp,
  FileText,
  ClipboardList,
  Truck,
  RotateCcw,
  AlertTriangle,
  Search,
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  role: string;
  order: number;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  type: 'receipt' | 'movement' | 'inventory' | 'return' | 'valuation';
  isActive: boolean;
  steps: WorkflowStep[];
  lastModified: string;
  createdBy: string;
}

export default function Inventory() {
  const sections = [
    {
      name: "Réception",
      description: "Gérez les réceptions de marchandises",
      href: '/inventory/receipts',
      icon: Truck,
      color: 'bg-green-500',
      stats: "8 réceptions en attente",
    },
    {
      name: "Mouvements",
      description: "Suivez les mouvements de stock",
      href: '/inventory/movements',
      icon: Package,
      color: 'bg-blue-500',
      stats: "15 mouvements aujourd'hui",
    },
    {
      name: "Inventaire",
      description: "Effectuez vos inventaires physiques",
      href: '/inventory/counts',
      icon: ClipboardList,
      color: 'bg-purple-500',
      stats: "1 inventaire en cours",
    },
    {
      name: "Retours",
      description: "Gérez les retours fournisseurs",
      href: '/inventory/returns',
      icon: RotateCcw,
      color: 'bg-red-500',
      stats: "3 retours en attente",
    },
    {
      name: "Alertes",
      description: "Surveillez les stocks critiques",
      href: '/inventory/alerts',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      stats: "12 alertes actives",
    },
    {
      name: "Recherche",
      description: "Recherchez dans vos stocks",
      href: '/inventory/search',
      icon: Search,
      color: 'bg-indigo-500',
      stats: "Recherche avancée",
    },
  ];

  const [workflowTemplates] = React.useState<WorkflowTemplate[]>([
    {
      id: "1",
      name: "Processus de réception standard",
      description: "Workflow standard pour la réception des marchandises",
      type: "receipt",
      isActive: true,
      lastModified: "2024-03-15T14:20:00",
      createdBy: "Admin",
      steps: [
        {
          id: "1",
          name: "Préparation",
          description: "Préparation de la zone de réception",
          role: "Magasinier",
          order: 1
        },
        {
          id: "2",
          name: "Réception",
          description: "Réception et déchargement des marchandises",
          role: "Magasinier",
          order: 2
        },
        {
          id: "3",
          name: "Contrôle qualité",
          description: "Vérification de la qualité et conformité",
          role: "Contrôleur",
          order: 3
        },
        {
          id: "4",
          name: "Mise en stock",
          description: "Enregistrement et rangement des marchandises",
          role: "Magasinier",
          order: 4
        }
      ]
    },
    {
      id: "2",
      name: "Processus d'inventaire physique",
      description: "Workflow standard pour la réalisation des inventaires",
      type: "inventory",
      isActive: true,
      lastModified: "2024-03-15T13:45:00",
      createdBy: "Admin",
      steps: [
        {
          id: "1",
          name: "Préparation",
          description: "Préparation des documents et zones",
          role: "Responsable Stock",
          order: 1
        },
        {
          id: "2",
          name: "Comptage",
          description: "Réalisation du comptage physique",
          role: "Magasinier",
          order: 2
        },
        {
          id: "3",
          name: "Vérification",
          description: "Vérification des écarts",
          role: "Contrôleur",
          order: 3
        },
        {
          id: "4",
          name: "Validation",
          description: "Validation finale de l'inventaire",
          role: "Responsable Stock",
          order: 4
        }
      ]
    }
  ]);

  const [expandedTemplates, setExpandedTemplates] = React.useState<{ [key: string]: boolean }>({});

  const toggleTemplate = (templateId: string) => {
    setExpandedTemplates(prev => ({
      ...prev,
      [templateId]: !prev[templateId]
    }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'bg-green-100 text-green-800';
      case 'movement':
        return 'bg-blue-100 text-blue-800';
      case 'inventory':
        return 'bg-purple-100 text-purple-800';
      case 'return':
        return 'bg-red-100 text-red-800';
      case 'valuation':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'receipt':
        return 'Réception';
      case 'movement':
        return 'Mouvement';
      case 'inventory':
        return 'Inventaire';
      case 'return':
        return 'Retour';
      case 'valuation':
        return 'Évaluation';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Gestion des Stocks</h1>
              <p className="mt-1 text-sm text-gray-500">Gérez vos stocks selon les normes OHADA</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/inventory/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.href}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                    <section.icon className={`h-6 w-6 ${section.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                      {section.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{section.stats}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Workflow Templates */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Templates de Workflows</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" />
              Nouveau Template
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {workflowTemplates.map((workflow) => (
              <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div 
                    className="flex items-center justify-between mb-4 cursor-pointer"
                    onClick={() => toggleTemplate(workflow.id)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(workflow.type)}`}>
                          {getTypeLabel(workflow.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        Modifié le {new Date(workflow.lastModified).toLocaleString()}
                      </span>
                      <button 
                        className="text-gray-400 hover:text-gray-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle settings click
                        }}
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        {expandedTemplates[workflow.id] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedTemplates[workflow.id] && (
                    <div className="overflow-x-auto transition-all duration-200 ease-in-out">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étape</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordre</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {workflow.steps.map((step) => (
                            <tr key={step.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {step.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {step.description}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  {step.role}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {step.order}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/inventory/receipts/new"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouvelle réception
            </Link>
            <Link
              to="/inventory/movements/new"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouveau mouvement
            </Link>
            <Link
              to="/inventory/counts/new"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-5 w-5 mr-2 text-gray-400" />
              Nouvel inventaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 