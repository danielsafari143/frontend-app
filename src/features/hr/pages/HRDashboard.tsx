import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  GraduationCap,
  Award,
  DollarSign,
  Calendar,
  UserPlus,
  FileText,
  Shield,
  Clock,
  BarChart2,
  Settings,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock4,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

interface Workflow {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

export default function HRDashboard() {
  const navigate = useNavigate();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  // Sample data for demonstration
  const workflows: Workflow[] = [
    {
      id: 'WF001',
      title: 'Nouvelle embauche - Jean Dupont',
      type: 'recruitment',
      status: 'in_progress',
      assignedTo: 'Marie Martin',
      dueDate: '2024-03-15',
      priority: 'high',
    },
    {
      id: 'WF002',
      title: 'Évaluation annuelle - Sophie Bernard',
      type: 'evaluation',
      status: 'pending',
      assignedTo: 'Pierre Dubois',
      dueDate: '2024-03-20',
      priority: 'medium',
    },
    {
      id: 'WF003',
      title: 'Formation sécurité - Équipe IT',
      type: 'training',
      status: 'completed',
      assignedTo: 'Marie Martin',
      dueDate: '2024-03-10',
      priority: 'high',
    },
  ];

  const stats: StatCard[] = [
    {
      title: 'Employés actifs',
      value: 156,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      change: '+5%',
    },
    {
      title: 'Cas disciplinaires',
      value: 3,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-orange-500',
      change: '-2',
    },
    {
      title: 'Formations en cours',
      value: 8,
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-green-500',
      change: '+2',
    },
    {
      title: 'Évaluations en attente',
      value: 12,
      icon: <Award className="w-6 h-6" />,
      color: 'bg-purple-500',
      change: '+3',
    },
  ];

  // Sample data for charts
  const departmentData = [
    { name: 'IT', value: 45 },
    { name: 'RH', value: 25 },
    { name: 'Finance', value: 30 },
    { name: 'Marketing', value: 20 },
    { name: 'Ventes', value: 35 },
  ];

  const leaveTrendData = [
    { name: 'Jan', value: 12 },
    { name: 'Fév', value: 15 },
    { name: 'Mar', value: 10 },
    { name: 'Avr', value: 18 },
    { name: 'Mai', value: 14 },
    { name: 'Juin', value: 16 },
  ];

  const trainingData = [
    { name: 'Sécurité', value: 35 },
    { name: 'Leadership', value: 25 },
    { name: 'Technique', value: 40 },
    { name: 'Soft Skills', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Workflow['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: Workflow['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recruitment':
        return <UserPlus className="w-5 h-5" />;
      case 'evaluation':
        return <Award className="w-5 h-5" />;
      case 'training':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/hr')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord RH</h1>
          <p className="text-gray-500">Vue d'ensemble des activités RH</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                {stat.change && (
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`p-3 ${stat.color} rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribution par département</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leave Trends */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendances des congés</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leaveTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Congés"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Training Distribution */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribution des formations</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Participants" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs de performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-blue-600">Taux de présence</p>
                <p className="text-2xl font-semibold text-blue-900">94%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-600">Taux de satisfaction</p>
                <p className="text-2xl font-semibold text-green-900">88%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm text-orange-600">Taux de rotation</p>
                <p className="text-2xl font-semibold text-orange-900">12%</p>
              </div>
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Workflows */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Workflows en cours</h2>
        </div>
        <div className="divide-y">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(workflow.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{workflow.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm ${getPriorityColor(workflow.priority)}`}>
                        Priorité {workflow.priority}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        Assigné à {workflow.assignedTo}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(workflow.status)}`}>
                    {getStatusText(workflow.status)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => navigate('/hr/employees')}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-blue-500 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">Gestion des employés</h3>
            <p className="text-sm text-gray-500">Gérer les employés</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/hr/training')}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-green-500 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">Formations</h3>
            <p className="text-sm text-gray-500">Gérer les formations</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/hr/evaluation')}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-purple-500 rounded-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">Évaluations</h3>
            <p className="text-sm text-gray-500">Gérer les évaluations</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/hr/leaves')}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-3 bg-red-500 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">Congés</h3>
            <p className="text-sm text-gray-500">Gérer les congés</p>
          </div>
        </button>
      </div>
    </div>
  );
} 