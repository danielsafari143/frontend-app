import React from 'react';
import { Link } from 'react-router';
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
  Plus,
  FileText,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
        <span
          className={`ml-2 text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

export default function InventoryDashboard() {
  // Stock movement data
  const stockMovementData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Entrées',
        data: [120, 150, 180, 90, 160, 200],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Sorties',
        data: [100, 130, 160, 80, 140, 180],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Stock value by category
  const stockValueData = {
    labels: ['Matériel', 'Produits finis', 'En cours', 'Matières premières'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  // Critical stock items
  const criticalStock = [
    {
      id: "PROD-001",
      name: "Produit A",
      currentStock: 5,
      minStock: 10,
      lastOrder: "2024-03-15",
      supplier: "Fournisseur X",
    },
    {
      id: "PROD-002",
      name: "Produit B",
      currentStock: 3,
      minStock: 15,
      lastOrder: "2024-03-10",
      supplier: "Fournisseur Y",
    },
    {
      id: "PROD-003",
      name: "Produit C",
      currentStock: 8,
      minStock: 20,
      lastOrder: "2024-03-20",
      supplier: "Fournisseur Z",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord des stocks</h1>
        <div className="flex gap-3">
          <Link
            to="/inventory/movements/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau mouvement
          </Link>
          <Link
            to="/inventory/valuation"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileText className="h-4 w-4 mr-2" />
            Évaluation des stocks
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Valeur du stock"
          value="€234,567"
          change="+5.2%"
          isPositive={true}
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        />
        <MetricCard
          title="Rotation des stocks"
          value="4.2"
          change="-0.3"
          isPositive={false}
          icon={<RefreshCw className="h-6 w-6 text-green-600" />}
        />
        <MetricCard
          title="Stock critique"
          value="23"
          change="+4"
          isPositive={false}
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
        />
        <MetricCard
          title="Délai moyen"
          value="15 jours"
          change="-2"
          isPositive={true}
          icon={<Clock className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Mouvements de stock</h2>
          <div className="h-64">
            <Line
              data={stockMovementData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Valeur par catégorie</h2>
          <div className="h-64">
            <Doughnut
              data={stockValueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Stock Status and Critical Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Analyse du vieillissement</h2>
          <div className="h-64">
            <Bar
              data={{
                labels: ['< 30 jours', '30-60 jours', '60-90 jours', '> 90 jours'],
                datasets: [
                  {
                    label: 'Valeur',
                    data: [150000, 50000, 25000, 9567],
                    backgroundColor: [
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(239, 68, 68, 0.8)',
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `€${value.toLocaleString()}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Stock critique</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock actuel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock min
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière commande
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criticalStock.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {item.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastOrder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 