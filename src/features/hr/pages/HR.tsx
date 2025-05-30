import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  Calendar,
  BarChart2,
  Settings,
  AlertTriangle,
  Clock,
  UserPlus,
  FileWarning,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
  DollarSign,
  ClipboardList,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  Building2,
  PhoneCall,
  Mail,
  FileSignature,
} from 'lucide-react';

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

interface MenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  stats: string;
}

export default function HR() {
  const navigate = useNavigate();
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);

  // Workflow templates
  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: '1',
      title: 'Processus d\'embauche',
      description: 'Processus standard pour l\'intégration de nouveaux employés',
      color: 'bg-blue-500',
      icon: UserPlus,
      steps: [
        {
          id: 1,
          title: 'Entretien initial',
          role: 'RH',
          description: 'Premier entretien avec le candidat'
        },
        {
          id: 2,
          title: 'Vérification des références',
          role: 'RH',
          description: 'Contrôle des références et antécédents'
        },
        {
          id: 3,
          title: 'Préparation du contrat',
          role: 'Juridique',
          description: 'Rédaction et validation du contrat de travail'
        },
        {
          id: 4,
          title: 'Intégration',
          role: 'RH',
          description: 'Onboarding et formation initiale'
        }
      ]
    },
    {
      id: '2',
      title: 'Processus d\'évaluation',
      description: 'Processus standard pour l\'évaluation des performances',
      color: 'bg-purple-500',
      icon: Award,
      steps: [
        {
          id: 1,
          title: 'Auto-évaluation',
          role: 'Employé',
          description: 'L\'employé remplit son auto-évaluation'
        },
        {
          id: 2,
          title: 'Évaluation manager',
          role: 'Manager',
          description: 'Le manager évalue les performances'
        },
        {
          id: 3,
          title: 'Entretien d\'évaluation',
          role: 'RH',
          description: 'Discussion et feedback'
        },
        {
          id: 4,
          title: 'Plan de développement',
          role: 'RH',
          description: 'Établissement des objectifs futurs'
        }
      ]
    }
  ];

  const menuItems: MenuItem[] = [
    {
      title: 'Tableau de bord',
      description: 'Vue d\'ensemble des activités RH',
      icon: <LayoutDashboard className="w-6 h-6" />,
      path: '/hr/dashboard',
      color: 'bg-blue-600',
      stats: '156 employés actifs'
    },
    {
      title: 'Gestion des employés',
      description: 'Gérer les informations des employés, contrats et dossiers',
      icon: <Users className="w-6 h-6" />,
      path: '/hr/employees',
      color: 'bg-blue-500',
      stats: '156 employés'
    },
    {
      title: 'Gestion disciplinaire',
      description: 'Gérer les cas disciplinaires et les sanctions',
      icon: <AlertTriangle className="w-6 h-6" />,
      path: '/hr/disciplinary',
      color: 'bg-orange-500',
      stats: '3 cas en cours'
    },
    {
      title: 'Formation',
      description: 'Planifier et suivre les formations des employés',
      icon: <GraduationCap className="w-6 h-6" />,
      path: '/hr/training',
      color: 'bg-green-500',
      stats: '8 formations en cours'
    },
    {
      title: 'Évaluation',
      description: 'Gérer les évaluations de performance',
      icon: <Award className="w-6 h-6" />,
      path: '/hr/evaluation',
      color: 'bg-purple-500',
      stats: '12 évaluations en attente'
    },
    {
      title: 'Paie',
      description: 'Gérer les salaires et les avantages',
      icon: <DollarSign className="w-6 h-6" />,
      path: '/hr/payroll',
      color: 'bg-yellow-500',
      stats: '156 fiches de paie'
    },
    {
      title: 'Congés',
      description: 'Gérer les demandes de congés et absences',
      icon: <Calendar className="w-6 h-6" />,
      path: '/hr/leaves',
      color: 'bg-red-500',
      stats: '25 demandes en attente'
    },
    {
      title: 'Recrutement',
      description: 'Gérer les candidatures et le processus de recrutement',
      icon: <UserPlus className="w-6 h-6" />,
      path: '/hr/recruitment',
      color: 'bg-indigo-500',
      stats: '15 candidatures en cours'
    },
    {
      title: 'Contrats',
      description: 'Gérer les contrats de travail et documents légaux',
      icon: <FileText className="w-6 h-6" />,
      path: '/hr/contracts',
      color: 'bg-pink-500',
      stats: '156 contrats actifs'
    },
    {
      title: 'Conformité',
      description: 'Assurer la conformité aux réglementations',
      icon: <Shield className="w-6 h-6" />,
      path: '/hr/compliance',
      color: 'bg-teal-500',
      stats: '100% conforme'
    },
    {
      title: 'Planning',
      description: 'Gérer les horaires et les plannings',
      icon: <Clock className="w-6 h-6" />,
      path: '/hr/scheduling',
      color: 'bg-cyan-500',
      stats: '156 plannings actifs'
    },
    {
      title: 'Rapports',
      description: 'Consulter les rapports et statistiques RH',
      icon: <BarChart2 className="w-6 h-6" />,
      path: '/hr/reports',
      color: 'bg-gray-500',
      stats: '25 rapports disponibles'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            Ressources Humaines
          </h1>
          <p className="text-gray-500">Gérez tous les aspects des ressources humaines</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <BarChart2 className="w-4 h-4" /> Tableau de bord
          </button>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="group bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <p className="mt-2 text-sm font-medium text-gray-900">{item.stats}</p>
              </div>
              <div className={`p-3 rounded-lg ${item.color} bg-opacity-10`}>
                {item.icon}
              </div>
            </div>
          </button>
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
          <button
            onClick={() => navigate('/hr/employees/new')}
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouvel employé</div>
              <div className="text-sm text-gray-500">Ajouter un nouvel employé</div>
            </div>
          </button>
          <button
            onClick={() => navigate('/hr/training/new')}
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouvelle formation</div>
              <div className="text-sm text-gray-500">Créer une nouvelle formation</div>
            </div>
          </button>
          <button
            onClick={() => navigate('/hr/evaluation/new')}
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouvelle évaluation</div>
              <div className="text-sm text-gray-500">Créer une nouvelle évaluation</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 