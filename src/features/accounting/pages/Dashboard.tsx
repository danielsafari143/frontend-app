import React from 'react';
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Receipt,
  Wallet,
  FileSpreadsheet,
  FileCheck,
  FileWarning,
  FileX,
  Banknote,
  CreditCard,
  PiggyBank,
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

export default function AccountingDashboard() {
  // Sample data for metrics
  const metrics = [
    {
      title: "Chiffre d'affaires",
      value: "1,234,567 €",
      change: 12.5,
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: "Dépenses",
      value: "987,654 €",
      change: 8.3,
      trend: 'up' as const,
      icon: TrendingDown,
      color: 'bg-red-500',
    },
    {
      title: "Bénéfice net",
      value: "246,913 €",
      change: 15.2,
      trend: 'up' as const,
      icon: PiggyBank,
      color: 'bg-green-500',
    },
    {
      title: "Trésorerie",
      value: "456,789 €",
      change: 5.7,
      trend: 'up' as const,
      icon: Wallet,
      color: 'bg-purple-500',
    },
  ];

  // Sample data for charts
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus',
        data: [1200000, 1250000, 1300000, 1280000, 1320000, 1350000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Dépenses',
        data: [900000, 950000, 980000, 960000, 990000, 1000000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const accountDistribution = {
    labels: ['Clients', 'Fournisseurs', 'Banques', 'Autres'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
        ],
      },
    ],
  };

  const monthlyTransactions = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Transactions',
        data: [150, 180, 160, 190, 170, 200],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'invoice',
      description: 'Facture #1234 - Client ABC',
      amount: '12,345 €',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'payment',
      description: 'Paiement reçu - Client XYZ',
      amount: '8,765 €',
      date: '2024-03-14',
    },
    {
      id: 3,
      type: 'expense',
      description: 'Facture fournisseur - DEF Corp',
      amount: '5,432 €',
      date: '2024-03-13',
    },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <Receipt className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <Banknote className="h-5 w-5 text-green-500" />;
      case 'expense':
        return <FileText className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Comptabilité</h1>
              <p className="mt-1 text-sm text-gray-500">Vue d'ensemble de votre situation financière</p>
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Évolution des revenus et dépenses</h2>
            <div className="h-80">
              <Line
                data={revenueData}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Répartition des comptes</h2>
            <div className="h-80">
              <Doughnut
                data={accountDistribution}
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Transactions mensuelles</h2>
            <div className="h-80">
              <Bar
                data={monthlyTransactions}
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
                            {activity.amount}
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