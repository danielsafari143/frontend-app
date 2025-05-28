import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  AlertCircle,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserCheck,
  FileCheck,
  Building2,
  BadgeCheck,
  Shield,
  FileWarning,
  UserCog,
  ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HRDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Overview data
  const overview = {
    workforce: {
      total: 45,
      active: 42,
      onLeave: 3,
      departments: [
        { name: 'IT', count: 15 },
        { name: 'RH', count: 8 },
        { name: 'Finance', count: 12 },
        { name: 'Marketing', count: 10 }
      ]
    },
    compliance: {
      contractsToRenew: 5,
      documentsExpiring: 3,
      pendingReviews: 8,
      trainingRequired: 12
    },
    leaveManagement: {
      currentOnLeave: 3,
      upcomingLeave: 5,
      pendingRequests: 2,
      leaveBalance: {
        average: '25 jours',
        lowest: '15 jours',
        highest: '30 jours'
      }
    },
    performance: {
      reviewsDue: 8,
      completedThisMonth: 12,
      averageRating: '4.2/5',
      improvementAreas: ['Communication', 'Leadership', 'Technical Skills']
    }
  };

  // Stats data
  const stats = [
    {
      label: 'Total Employés',
      value: 45,
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-5 h-5 text-blue-500" />,
      detail: 'Dont 42 actifs'
    },
    {
      label: 'Congés en cours',
      value: 8,
      change: '-2',
      trend: 'down',
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      detail: 'Dont 3 en attente'
    },
    {
      label: 'Taux de présence',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: <UserCheck className="w-5 h-5 text-purple-500" />,
      detail: 'Ce mois'
    },
    {
      label: 'Contrats à renouveler',
      value: 5,
      change: '-1',
      trend: 'down',
      icon: <FileCheck className="w-5 h-5 text-orange-500" />,
      detail: 'Dans 30 jours'
    },
    {
      label: 'Formations',
      value: 12,
      change: '+4',
      trend: 'up',
      icon: <GraduationCap className="w-5 h-5 text-red-500" />,
      detail: 'En cours'
    }
  ];

  // Mock data for demonstration
  const recentEmployees = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@company.com',
      phone: '+33 1 23 45 67 89',
      status: 'active',
      department: 'IT',
      position: 'Développeur',
      joinDate: '2024-03-20',
      contractType: 'CDI',
      nextReview: '2024-06-20'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@company.com',
      phone: '+33 1 98 76 54 32',
      status: 'active',
      department: 'RH',
      position: 'Manager',
      joinDate: '2024-03-19',
      contractType: 'CDI',
      nextReview: '2024-06-19'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'embauche',
      action: 'created',
      entityName: 'Jean Dupont',
      user: 'HR Manager',
      timestamp: '2024-03-20 14:30',
      details: 'Nouvelle embauche - Développeur IT'
    },
    {
      id: '2',
      type: 'congé',
      action: 'updated',
      entityName: 'Marie Martin',
      user: 'HR Assistant',
      timestamp: '2024-03-20 13:15',
      details: 'Demande de congé approuvée - 2 semaines'
    },
    {
      id: '3',
      type: 'formation',
      action: 'completed',
      entityName: 'Équipe IT',
      user: 'HR Manager',
      timestamp: '2024-03-20 11:00',
      details: 'Formation sécurité complétée'
    },
    {
      id: '4',
      type: 'contrat',
      action: 'updated',
      entityName: 'Pierre Durand',
      user: 'HR Manager',
      timestamp: '2024-03-20 10:30',
      details: 'Renouvellement de contrat signé'
    }
  ];

  const upcomingTasks = [
    {
      id: '1',
      title: 'Entretien annuel - Jean Dupont',
      dueDate: '2024-03-25',
      priority: 'high',
      status: 'pending',
      type: 'review'
    },
    {
      id: '2',
      title: 'Formation sécurité - Équipe IT',
      dueDate: '2024-03-28',
      priority: 'medium',
      status: 'pending',
      type: 'training'
    },
    {
      id: '3',
      title: 'Renouvellement contrat - Sophie Bernard',
      dueDate: '2024-04-01',
      priority: 'high',
      status: 'pending',
      type: 'contract'
    },
    {
      id: '4',
      title: 'Réunion équipe RH',
      dueDate: '2024-03-22',
      priority: 'medium',
      status: 'pending',
      type: 'meeting'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            RH Dashboard
          </h1>
          <p className="text-gray-500">Gestion des ressources humaines</p>
        </div>
        <div className="flex gap-2">
          <Link to="/hr/employees/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nouvelle embauche
          </Link>
          <Link to="/hr/leaves" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" /> Nouveau congé
          </Link>
          <Link to="/hr/training" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Nouvelle formation
          </Link>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workforce Overview */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Effectif
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Total</div>
                <div className="text-2xl font-bold">{overview.workforce.total}</div>
                <div className="text-xs text-blue-600 mt-1">Employés</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 mb-1">Actifs</div>
                <div className="text-2xl font-bold">{overview.workforce.active}</div>
                <div className="text-xs text-green-600 mt-1">En poste</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Par département</h3>
              {overview.workforce.departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{dept.name}</span>
                  <span className="text-sm font-medium">{dept.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Conformité
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-orange-600 mb-1">Contrats</div>
                <div className="text-2xl font-bold">{overview.compliance.contractsToRenew}</div>
                <div className="text-xs text-orange-600 mt-1">À renouveler</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600 mb-1">Documents</div>
                <div className="text-2xl font-bold">{overview.compliance.documentsExpiring}</div>
                <div className="text-xs text-red-600 mt-1">Expirant bientôt</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Entretiens en attente</span>
                <span className="text-sm font-medium">{overview.compliance.pendingReviews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Formations requises</span>
                <span className="text-sm font-medium">{overview.compliance.trainingRequired}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Management Overview */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              Gestion des Congés
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 mb-1">En congé</div>
                <div className="text-2xl font-bold">{overview.leaveManagement.currentOnLeave}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">À venir</div>
                <div className="text-2xl font-bold">{overview.leaveManagement.upcomingLeave}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-yellow-600 mb-1">En attente</div>
                <div className="text-2xl font-bold">{overview.leaveManagement.pendingRequests}</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Solde moyen</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Moyenne</span>
                <span className="text-sm font-medium">{overview.leaveManagement.leaveBalance.average}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plus bas</span>
                <span className="text-sm font-medium">{overview.leaveManagement.leaveBalance.lowest}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plus haut</span>
                <span className="text-sm font-medium">{overview.leaveManagement.leaveBalance.highest}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              Performance
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600 mb-1">À réaliser</div>
                <div className="text-2xl font-bold">{overview.performance.reviewsDue}</div>
                <div className="text-xs text-purple-600 mt-1">Entretiens</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-sm text-indigo-600 mb-1">Note moyenne</div>
                <div className="text-2xl font-bold">{overview.performance.averageRating}</div>
                <div className="text-xs text-indigo-600 mt-1">Ce mois</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Axes d'amélioration</h3>
              {overview.performance.improvementAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-600">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
                {stat.icon}
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1 text-gray-800">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher employés, congés, formations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white shadow-sm transition-colors">
          <Filter className="w-5 h-5 text-gray-500" />
          Filtres
        </button>
      </div>

      {/* Recent Employees Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-xl">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-indigo-700">
            <Users className="w-5 h-5" />
            Employés Récents
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contrat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prochain entretien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-gray-700">{employee.contractType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {employee.nextReview}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link to={`/hr/employees/${employee.id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        Voir
                      </Link>
                      <Link to={`/hr/employees/${employee.id}/edit`} className="text-gray-600 hover:text-gray-800 transition-colors">
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-700">
              <Activity className="w-5 h-5" />
              Activités Récentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-amber-50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center border border-amber-100">
                    {activity.type === 'embauche' && <UserPlus className="w-4 h-4 text-indigo-500" />}
                    {activity.type === 'congé' && <Calendar className="w-4 h-4 text-emerald-500" />}
                    {activity.type === 'formation' && <GraduationCap className="w-4 h-4 text-violet-500" />}
                    {activity.type === 'contrat' && <FileCheck className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-800">{activity.entityName}</div>
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-violet-700">
              <Calendar className="w-5 h-5" />
              Tâches à Venir
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-100 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {task.type === 'review' && <UserCheck className="w-4 h-4 text-indigo-500" />}
                      {task.type === 'training' && <GraduationCap className="w-4 h-4 text-violet-500" />}
                      {task.type === 'contract' && <FileCheck className="w-4 h-4 text-amber-500" />}
                      {task.type === 'meeting' && <Users className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{task.title}</div>
                      <div className="text-sm text-gray-500">Échéance: {task.dueDate}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-rose-100 text-rose-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
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