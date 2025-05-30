import React from 'react';
import {
  Users,
  Building2,
  UserPlus,
  FileText,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Activity,
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

export default function CRMDashboard() {
  // Sample data for metrics
  const metrics = [
    {
      title: "Clients",
      value: "156",
      change: 12.5,
      trend: 'up' as const,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: "Fournisseurs",
      value: "89",
      change: 5.2,
      trend: 'up' as const,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      title: "Contacts",
      value: "423",
      change: 8.3,
      trend: 'up' as const,
      icon: UserPlus,
      color: 'bg-purple-500',
    },
    {
      title: "Documents",
      value: "1.2K",
      change: 15.4,
      trend: 'up' as const,
      icon: FileText,
      color: 'bg-orange-500',
    },
  ];

  // Sample data for charts
  const customerGrowth = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Nouveaux clients',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Clients actifs',
        data: [120, 132, 145, 160, 175, 190],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  const customerDistribution = {
    labels: ['Clients', 'Fournisseurs', 'Contacts'],
    datasets: [
      {
        data: [156, 89, 423],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
        ],
      },
    ],
  };

  const activityByType = {
    labels: ['Appels', 'Emails', 'Rendez-vous', 'Documents'],
    datasets: [
      {
        label: 'Activités par type',
        data: [45, 65, 35, 25],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(249, 115, 22, 0.5)',
        ],
      },
    ],
  };

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'customer',
      description: 'Nouveau client ajouté - Entreprise ABC',
      user: 'John Doe',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'supplier',
      description: 'Mise à jour fournisseur - XYZ Corp',
      user: 'Jane Smith',
      date: '2024-03-14',
    },
    {
      id: 3,
      type: 'document',
      description: 'Nouveau contrat signé - Client DEF',
      user: 'Mike Johnson',
      date: '2024-03-13',
    },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'customer':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'supplier':
        return <Building2 className="h-5 w-5 text-green-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - CRM</h1>
              <p className="mt-1 text-sm text-gray-500">Vue d'ensemble de vos relations clients</p>
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Évolution des clients</h2>
            <div className="h-80">
              <Line
                data={customerGrowth}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Répartition des contacts</h2>
            <div className="h-80">
              <Doughnut
                data={customerDistribution}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activités par type</h2>
            <div className="h-80">
              <Bar
                data={activityByType}
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
                            Par {activity.user}
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