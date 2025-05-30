import React, { useState } from 'react';
import { 
  Users, Building2, UserPlus, Activity, Plus, Search, 
  Filter, Bell, FileText, Mail, Phone, MapPin, 
  Calendar, Clock, ArrowUpRight, ArrowDownRight,
  FileCheck, AlertCircle, BarChart3, ChevronDown, ChevronUp,
  UserCog, Building, PhoneCall, Mail as MailIcon, FileSignature
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkflowStep {
  id: number;
  title: string;
  role: string;
  description: string;
}

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
  color: string;
  icon: React.ElementType;
}

export default function CRM() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);

  // Workflow templates
  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: '1',
      title: 'Processus d\'onboarding client',
      description: 'Processus standard pour l\'intégration de nouveaux clients',
      color: 'bg-blue-500',
      icon: UserCog,
      steps: [
        {
          id: 1,
          title: 'Collecte des informations',
          role: 'Commercial',
          description: 'Récupération des informations de base du client'
        },
        {
          id: 2,
          title: 'Vérification des documents',
          role: 'Administration',
          description: 'Validation des documents légaux et administratifs'
        },
        {
          id: 3,
          title: 'Configuration du compte',
          role: 'IT',
          description: 'Création et configuration du compte client'
        },
        {
          id: 4,
          title: 'Formation initiale',
          role: 'Support',
          description: 'Formation du client sur l\'utilisation de la plateforme'
        }
      ]
    },
    {
      id: '2',
      title: 'Processus de gestion des fournisseurs',
      description: 'Processus standard pour la gestion des relations fournisseurs',
      color: 'bg-green-500',
      icon: Building,
      steps: [
        {
          id: 1,
          title: 'Évaluation initiale',
          role: 'Achats',
          description: 'Analyse des capacités et de la fiabilité du fournisseur'
        },
        {
          id: 2,
          title: 'Négociation des termes',
          role: 'Commercial',
          description: 'Négociation des conditions commerciales et de paiement'
        },
        {
          id: 3,
          title: 'Validation contractuelle',
          role: 'Juridique',
          description: 'Révision et validation des contrats'
        },
        {
          id: 4,
          title: 'Intégration',
          role: 'Administration',
          description: 'Enregistrement et configuration dans le système'
        }
      ]
    }
  ];

  // Main sections
  const sections = [
    {
      title: 'Clients',
      description: 'Gestion des clients et de leurs informations',
      link: '/crm/customers',
      icon: Users,
      color: 'bg-blue-500',
      stats: '156 clients actifs'
    },
    {
      title: 'Fournisseurs',
      description: 'Gestion des fournisseurs et des relations',
      link: '/crm/suppliers',
      icon: Building2,
      color: 'bg-green-500',
      stats: '89 fournisseurs actifs'
    },
    {
      title: 'Contacts',
      description: 'Gestion des contacts et des interactions',
      link: '/crm/contacts',
      icon: UserPlus,
      color: 'bg-purple-500',
      stats: '423 contacts'
    },
    {
      title: 'Appels',
      description: 'Suivi des appels et des communications',
      link: '/crm/calls',
      icon: PhoneCall,
      color: 'bg-orange-500',
      stats: '45 appels ce mois'
    },
    {
      title: 'Emails',
      description: 'Gestion des communications par email',
      link: '/crm/emails',
      icon: MailIcon,
      color: 'bg-red-500',
      stats: '156 emails envoyés'
    },
    {
      title: 'Documents',
      description: 'Gestion des documents et contrats',
      link: '/crm/documents',
      icon: FileSignature,
      color: 'bg-yellow-500',
      stats: '1.2K documents'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            CRM
          </h1>
          <p className="text-gray-500">Gestion de la relation client</p>
        </div>
        <div className="flex gap-2">
          <Link to="/crm/dashboard" className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <BarChart3 className="w-4 h-4" /> Tableau de bord
          </Link>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            to={section.link}
            className="group bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                <p className="mt-2 text-sm font-medium text-gray-900">{section.stats}</p>
              </div>
              <div className={`p-3 rounded-lg ${section.color} bg-opacity-10`}>
                <section.icon className={`w-6 h-6 ${section.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Workflow Templates */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Modèles de processus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflowTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${template.color} bg-opacity-10`}>
                    <template.icon className={`w-6 h-6 ${template.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <button
                  onClick={() => setExpandedWorkflow(expandedWorkflow === template.id ? null : template.id)}
                  className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {expandedWorkflow === template.id ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Voir moins
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Voir les étapes
                    </>
                  )}
                </button>
                {expandedWorkflow === template.id && (
                  <div className="mt-4 space-y-4">
                    {template.steps.map((step) => (
                      <div key={step.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{step.title}</div>
                          <div className="text-sm text-gray-500">{step.description}</div>
                          <div className="mt-1 text-xs font-medium text-gray-600">
                            Rôle: {step.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/crm/customers/new"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCog className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouveau client</div>
              <div className="text-sm text-gray-500">Ajouter un nouveau client</div>
            </div>
          </Link>
          <Link
            to="/crm/suppliers/new"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouveau fournisseur</div>
              <div className="text-sm text-gray-500">Ajouter un nouveau fournisseur</div>
            </div>
          </Link>
          <Link
            to="/crm/contacts/new"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouveau contact</div>
              <div className="text-sm text-gray-500">Ajouter un nouveau contact</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
