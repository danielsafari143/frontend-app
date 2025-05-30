import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Clock,
  Filter,
  Download,
  ChevronRight,
  Building,
  ShoppingCart,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  subtitle: string;
}

interface RecentActivity {
  type: 'purchase' | 'stock' | 'invoice' | 'supplier';
  title: string;
  description: string;
  date: string;
  status: 'success' | 'warning' | 'error';
}

const metrics: MetricCard[] = [
  {
    title: 'Dépenses totales',
    value: '€45,230',
    change: '+8.5%',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    subtitle: 'Ce mois'
  },
  {
    title: 'Fournisseurs actifs',
    value: '32',
    change: '+2.1%',
    trend: 'up',
    icon: <Building className="w-6 h-6" />,
    subtitle: 'Total'
  },
  {
    title: 'Commandes en cours',
    value: '15',
    change: '-5.1%',
    trend: 'down',
    icon: <ShoppingCart className="w-6 h-6" />,
    subtitle: 'En attente'
  },
  {
    title: 'Articles commandés',
    value: '234',
    change: '+12.7%',
    trend: 'up',
    icon: <Package className="w-6 h-6" />,
    subtitle: 'Ce mois'
  }
];

const recentActivities: RecentActivity[] = [
  {
    type: 'purchase',
    title: 'Nouvelle commande',
    description: 'Commande #PO-001 de Fournisseur A',
    date: 'Il y a 5 minutes',
    status: 'success'
  },
  {
    type: 'stock',
    title: 'Réception de stock',
    description: 'Réception de 50 unités de Produit XYZ',
    date: 'Il y a 1 heure',
    status: 'success'
  },
  {
    type: 'invoice',
    title: 'Facture fournisseur',
    description: 'Facture #F-7890 en attente de paiement',
    date: 'Il y a 2 heures',
    status: 'warning'
  },
  {
    type: 'supplier',
    title: 'Nouveau fournisseur',
    description: 'Fournisseur D a été ajouté',
    date: 'Il y a 3 heures',
    status: 'success'
  }
];

// Purchase data for charts
const purchaseData = [
  { month: 'Jan', purchases: 4000, expenses: 2400, savings: 1600, target: 3500 },
  { month: 'Fév', purchases: 3000, expenses: 1398, savings: 1602, target: 3500 },
  { month: 'Mar', purchases: 2000, expenses: 9800, savings: -7800, target: 3500 },
  { month: 'Avr', purchases: 2780, expenses: 3908, savings: -1128, target: 3500 },
  { month: 'Mai', purchases: 1890, expenses: 4800, savings: -2910, target: 3500 },
  { month: 'Juin', purchases: 2390, expenses: 3800, savings: -1410, target: 3500 },
];

// Supplier categories data
const supplierData = [
  { name: 'Matériel', value: 400, fill: '#0088FE' },
  { name: 'Services', value: 300, fill: '#00C49F' },
  { name: 'Équipement', value: 200, fill: '#FFBB28' },
  { name: 'Logiciels', value: 100, fill: '#FF8042' },
  { name: 'Autres', value: 150, fill: '#8884d8' }
];

// Recent purchase orders
const recentPurchaseOrders = [
  {
    id: "PO-001",
    supplier: "Fournisseur A",
    orderDate: "2024-03-15",
    totalAmount: 1500.00,
    status: "pending",
    items: 5
  },
  {
    id: "PO-002",
    supplier: "Fournisseur B",
    orderDate: "2024-03-14",
    totalAmount: 2300.50,
    status: "approved",
    items: 8
  },
  {
    id: "PO-003",
    supplier: "Fournisseur C",
    orderDate: "2024-03-13",
    totalAmount: 950.75,
    status: "received",
    items: 3
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-blue-100 text-blue-800";
    case "received":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "approved":
      return "Approuvé";
    case "received":
      return "Reçu";
    case "cancelled":
      return "Annulé";
    default:
      return status;
  }
};

export default function PurchaseDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord des achats</h1>
          </div>
          <p className="text-gray-600">
            Vue d'ensemble de vos achats et fournisseurs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                {metric.icon}
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {metric.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution des Achats</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={purchaseData}>
                <defs>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="purchases" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorPurchases)" 
                  name="Achats"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                  name="Dépenses"
                />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stackId="1" 
                  stroke="#ffc658" 
                  fillOpacity={1} 
                  fill="url(#colorSavings)" 
                  name="Économies"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Répartition des Fournisseurs</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={supplierData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {supplierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Purchase Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
          <Link
            to="/buy"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Voir toutes les commandes
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fournisseur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPurchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/buy/${order.id}`} className="text-blue-600 hover:text-blue-900">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.totalAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Activités récentes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-green-50' :
                    activity.status === 'warning' ? 'bg-yellow-50' :
                    'bg-red-50'
                  }`}>
                    {activity.type === 'purchase' && <ShoppingCart className="w-5 h-5 text-green-600" />}
                    {activity.type === 'stock' && <Package className="w-5 h-5 text-yellow-600" />}
                    {activity.type === 'invoice' && <DollarSign className="w-5 h-5 text-red-600" />}
                    {activity.type === 'supplier' && <Building className="w-5 h-5 text-green-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {activity.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 