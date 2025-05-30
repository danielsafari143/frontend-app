import React from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock4,
  User,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        <div className="mt-2 flex items-center">
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '+' : '-'}{Math.abs(change)}%
          </span>
          <span className="ml-2 text-sm text-gray-500">vs mois dernier</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

export default function TasksDashboard() {
  // Sample data for metrics
  const metrics = [
    {
      title: "Tâches en cours",
      value: "24",
      change: 12.5,
      trend: 'up' as const,
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      title: "Tâches terminées",
      value: "156",
      change: 8.3,
      trend: 'up' as const,
      icon: CheckCircle2,
      color: 'bg-green-500',
    },
    {
      title: "Tâches en retard",
      value: "8",
      change: 15.4,
      trend: 'down' as const,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      title: "Taux de complétion",
      value: "85%",
      change: 5.2,
      trend: 'up' as const,
      icon: BarChart3,
      color: 'bg-purple-500',
    },
  ];

  // Sample data for charts
  const tasksOverTime = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Tâches créées',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Tâches terminées',
        data: [45, 52, 60, 70, 50, 45],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  const tasksByStatus = {
    labels: ['En cours', 'Terminées', 'En retard', 'En attente'],
    datasets: [
      {
        data: [24, 156, 8, 12],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(234, 179, 8)',
        ],
      },
    ],
  };

  const tasksByPriority = {
    labels: ['Haute', 'Moyenne', 'Basse'],
    datasets: [
      {
        label: 'Tâches par priorité',
        data: [15, 45, 40],
        backgroundColor: [
          'rgba(239, 68, 68, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(16, 185, 129, 0.5)',
        ],
      },
    ],
  };

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      description: 'Tâche #2024-001 - Suivi paiement client ABC',
      assignedTo: 'John Doe',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'created',
      description: 'Tâche #2024-008 - Renouvellement contrat XYZ',
      assignedTo: 'Jane Smith',
      date: '2024-03-14',
    },
    {
      id: 3,
      type: 'overdue',
      description: 'Tâche #2024-002 - Mise à jour fiche fournisseur',
      assignedTo: 'Mike Johnson',
      date: '2024-03-10',
    },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'created':
        return <Clock4 className="h-5 w-5 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Tâches</h1>
              <p className="mt-1 text-sm text-gray-500">Vue d'ensemble de vos tâches et activités</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Évolution des tâches</h2>
            <div className="h-80">
              <Line
                data={tasksOverTime}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Répartition des tâches</h2>
            <div className="h-80">
              <Doughnut
                data={tasksByStatus}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tâches par priorité</h2>
            <div className="h-80">
              <Bar
                data={tasksByPriority}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-gray-500">
                            Assigné à {activity.assignedTo}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 