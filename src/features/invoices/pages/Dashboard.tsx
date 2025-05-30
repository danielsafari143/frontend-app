import React from 'react';
import {
  Receipt,
  FileText,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
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

export default function InvoicesDashboard() {
  // Sample data for metrics
  const metrics = [
    {
      title: "Chiffre d'affaires",
      value: "125,000 €",
      change: 12.5,
      trend: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: "Factures en attente",
      value: "12",
      change: 8.3,
      trend: 'down' as const,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: "Devis en cours",
      value: "8",
      change: 15.4,
      trend: 'up' as const,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: "Taux de conversion",
      value: "68%",
      change: 5.2,
      trend: 'up' as const,
      icon: CheckCircle2,
      color: 'bg-purple-500',
    },
  ];

  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: '2024',
        data: [65000, 59000, 80000, 81000, 56000, 125000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: '2023',
        data: [45000, 52000, 60000, 70000, 50000, 95000],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
      },
    ],
  };

  const invoicesByStatus = {
    labels: ['Payées', 'En attente', 'En retard'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
      },
    ],
  };

  const quotesByCategory = {
    labels: ['Services', 'Produits', 'Abonnements', 'Maintenance'],
    datasets: [
      {
        label: 'Devis par catégorie',
        data: [30, 40, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(139, 92, 246, 0.5)',
        ],
      },
    ],
  };

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'invoice',
      status: 'paid',
      description: 'Facture #2024-001 - Client A',
      amount: '15,000 €',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'quote',
      status: 'pending',
      description: 'Devis #2024-008 - Client B',
      amount: '8,500 €',
      date: '2024-03-14',
    },
    {
      id: 3,
      type: 'invoice',
      status: 'overdue',
      description: 'Facture #2024-002 - Client C',
      amount: '12,000 €',
      date: '2024-03-10',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Factures & Devis</h1>
              <p className="mt-1 text-sm text-gray-500">Vue d'ensemble de votre activité commerciale</p>
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Évolution du chiffre d'affaires</h2>
            <div className="h-80">
              <Line
                data={salesData}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Répartition des factures</h2>
            <div className="h-80">
              <Doughnut
                data={invoicesByStatus}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Devis par catégorie</h2>
            <div className="h-80">
              <Bar
                data={quotesByCategory}
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
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                        {activity.amount}
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