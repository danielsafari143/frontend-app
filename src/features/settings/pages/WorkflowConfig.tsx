import React from "react";
import { Settings, Save, Plus, ArrowRight, CheckCircle2, Circle, ChevronDown, ChevronUp, User, FileText, CheckCircle, Package, ShoppingCart, Receipt, ClipboardCheck, BarChart2, Users, Clock, Activity, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  role: string;
  order: number;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  isActive: boolean;
}

interface WorkflowUsage {
  id: string;
  name: string;
  type: 'purchase' | 'sale' | 'inventory' | 'accounting';
  status: 'active' | 'inactive';
  lastUsed: string;
  totalExecutions: number;
  assignedUsers: number;
}

const StepIcon = ({ role }: { role: string }) => {
  switch (role.toLowerCase()) {
    case 'acheteur':
      return <ShoppingCart className="w-6 h-6 text-indigo-600" />;
    case 'commercial':
      return <User className="w-6 h-6 text-blue-600" />;
    case 'responsable':
      return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    case 'magasinier':
      return <Package className="w-6 h-6 text-amber-600" />;
    case 'comptable':
      return <Receipt className="w-6 h-6 text-purple-600" />;
    default:
      return <ClipboardCheck className="w-6 h-6 text-gray-600" />;
  }
};

const WorkflowVisualization = ({ steps }: { steps: WorkflowStep[] }) => {
  const [hoveredStep, setHoveredStep] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState<string | null>(null);

  return (
    <div className="mt-4 p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4">Visualisation du Processus</h3>
      
      <div className="relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-1/2"></div>
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                {/* Step Circle with Gradient Border */}
                <div className={`
                  relative w-14 h-14 sm:w-16 sm:h-16 rounded-full
                  ${hoveredStep === step.id ? 'scale-110' : 'scale-100'}
                  transition-all duration-300 ease-out
                  group-hover:shadow-lg
                `}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-white"></div>
                  <div className={`
                    absolute inset-[2px] rounded-full
                    ${hoveredStep === step.id ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-white'}
                    flex items-center justify-center
                    transition-all duration-300
                  `}>
                    <div className="text-center">
                      <StepIcon role={step.role} />
                      <div className="mt-1 text-[10px] sm:text-xs font-semibold text-slate-700">{step.order}</div>
                    </div>
                  </div>
                </div>

                {/* Step Info Card */}
                <div className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-48
                  bg-white rounded-lg shadow-xl p-2 sm:p-3
                  transform transition-all duration-300 ease-out
                  ${hoveredStep === step.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                  border border-slate-200
                  z-10
                `}>
                  <div className="text-center">
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">{step.name}</div>
                    <div className="mt-1 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-50 rounded-full inline-block">
                      {step.role}
                    </div>
                    <div className="mt-1 text-[10px] sm:text-xs text-slate-500 leading-relaxed">{step.description}</div>
                  </div>
                </div>
              </div>

              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="relative w-8 sm:w-12">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[1px] bg-gradient-to-r from-slate-200 to-slate-200"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 sm:mt-4 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`
                    w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full
                    ${hoveredStep === step.id ? 'bg-blue-500 scale-150' : 'bg-slate-300'}
                    transition-all duration-300
                    cursor-pointer
                  `}
                  onClick={() => setHoveredStep(step.id)}
                />
                {index < steps.length - 1 && (
                  <div className="w-3 sm:w-4 h-[1px] bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkflowConfig() {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = React.useState<Workflow[]>([
    {
      id: "1",
      name: "Processus d'achat",
      description: "Configuration du processus d'achat et d'approvisionnement",
      isActive: true,
      steps: [
        {
          id: "1",
          name: "Création de la commande",
          description: "Création initiale de la commande d'achat",
          role: "Acheteur",
          order: 1
        },
        {
          id: "2",
          name: "Validation",
          description: "Validation de la commande par le responsable",
          role: "Responsable",
          order: 2
        },
        {
          id: "3",
          name: "Réception",
          description: "Réception et vérification des marchandises",
          role: "Magasinier",
          order: 3
        }
      ]
    },
    {
      id: "2",
      name: "Processus de vente",
      description: "Configuration du processus de vente et de facturation",
      isActive: true,
      steps: [
        {
          id: "1",
          name: "Création du devis",
          description: "Création initiale du devis",
          role: "Commercial",
          order: 1
        },
        {
          id: "2",
          name: "Validation",
          description: "Validation du devis",
          role: "Responsable",
          order: 2
        },
        {
          id: "3",
          name: "Facturation",
          description: "Création et envoi de la facture",
          role: "Comptable",
          order: 3
        }
      ]
    }
  ]);

  const [expandedWorkflows, setExpandedWorkflows] = React.useState<{ [key: string]: boolean }>({
    "1": true, // First workflow expanded by default
    "2": false
  });

  const [workflowUsage] = React.useState<WorkflowUsage[]>([
    {
      id: "1",
      name: "Processus d'achat",
      type: "purchase",
      status: "active",
      lastUsed: "2024-03-15T14:30:00",
      totalExecutions: 156,
      assignedUsers: 8
    },
    {
      id: "2",
      name: "Processus de vente",
      type: "sale",
      status: "active",
      lastUsed: "2024-03-15T15:45:00",
      totalExecutions: 89,
      assignedUsers: 5
    }
  ]);

  const toggleWorkflow = (workflowId: string) => {
    setExpandedWorkflows(prev => ({
      ...prev,
      [workflowId]: !prev[workflowId]
    }));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'bg-blue-100 text-blue-800';
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'inventory':
        return 'bg-purple-100 text-purple-800';
      case 'accounting':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ShoppingCart className="w-5 h-5" />;
      case 'sale':
        return <Receipt className="w-5 h-5" />;
      case 'inventory':
        return <Package className="w-5 h-5" />;
      case 'accounting':
        return <FileText className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Configuration des Workflows</h1>
        </div>
        <button 
          onClick={() => navigate('/settings/workflows/new')}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          <span>Nouveau Workflow</span>
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Workflow Usage Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Utilisation des Workflows</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière utilisation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exécutions</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateurs</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workflowUsage.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-blue-50">
                          {getTypeIcon(workflow.type)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(workflow.type)}`}>
                        {workflow.type.charAt(0).toUpperCase() + workflow.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        workflow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workflow.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(workflow.lastUsed).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {workflow.totalExecutions}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {workflow.assignedUsers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {expandedWorkflows[workflow.id] ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                  </button>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{workflow.name}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{workflow.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={workflow.isActive} />
                    <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Settings size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedWorkflows[workflow.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {/* Workflow Visualization */}
                <WorkflowVisualization steps={workflow.steps} />

                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {workflow.steps.map((step) => (
                    <div key={step.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{step.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 rounded-full">
                          {step.role}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600">Étape {step.order}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 