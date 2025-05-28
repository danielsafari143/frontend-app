import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  MessageSquare,
  Calendar,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  FileSpreadsheet,
  File,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileSearch,
  FileEdit,
  FileArchive,
  FileBarChart,
  FilePieChart,
  FileLineChart,
  Building2,
  Wallet,
  Receipt,
  CreditCard,
  Briefcase,
  Landmark,
  Banknote,
  PieChart,
  LineChart,
  BarChart2,
  AlertTriangle,
  Building,
  PiggyBank
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  subtitle: string;
}

interface RecentActivity {
  type: string;
  title: string;
  description: string;
  date: string;
  status?: 'success' | 'warning' | 'error';
}

const metrics: MetricCard[] = [
  {
    title: 'Chiffre d\'affaires',
    value: '€125,430',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    subtitle: 'Ce mois'
  },
  {
    title: 'Clients actifs',
    value: '248',
    change: '+8.2%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    subtitle: 'Total'
  },
  {
    title: 'Commandes en cours',
    value: '45',
    change: '-3.1%',
    trend: 'down',
    icon: <ShoppingCart className="w-6 h-6" />,
    subtitle: 'En attente'
  },
  {
    title: 'Stock disponible',
    value: '1,234',
    change: '+5.7%',
    trend: 'up',
    icon: <FileText className="w-6 h-6" />,
    subtitle: 'Unités'
  }
];

const recentActivities: RecentActivity[] = [
  {
    type: 'vente',
    title: 'Nouvelle commande',
    description: 'Commande #12345 de Jean Dupont',
    date: 'Il y a 5 minutes',
    status: 'success'
  },
  {
    type: 'stock',
    title: 'Alerte stock',
    description: 'Stock faible pour le produit XYZ',
    date: 'Il y a 1 heure',
    status: 'warning'
  },
  {
    type: 'facture',
    title: 'Facture impayée',
    description: 'Facture #7890 en retard de paiement',
    date: 'Il y a 2 heures',
    status: 'error'
  },
  {
    type: 'client',
    title: 'Nouveau client',
    description: 'Marie Martin a créé un compte',
    date: 'Il y a 3 heures',
    status: 'success'
  }
];

const quickActions = [
  {
    title: 'Nouvelle vente',
    icon: <ShoppingCart className="w-6 h-6" />,
    path: '/sales/new'
  },
  {
    title: 'Nouvelle facture',
    icon: <FileText className="w-6 h-6" />,
    path: '/invoices/new'
  },
  {
    title: 'Gestion des stocks',
    icon: <FileText className="w-6 h-6" />,
    path: '/stock'
  },
  {
    title: 'Clients',
    icon: <Users className="w-6 h-6" />,
    path: '/crm/customers'
  }
];

// Enhanced financial data with more details
const financialData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600, target: 3500 },
  { month: 'Fév', revenue: 3000, expenses: 1398, profit: 1602, target: 3500 },
  { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800, target: 3500 },
  { month: 'Avr', revenue: 2780, expenses: 3908, profit: -1128, target: 3500 },
  { month: 'Mai', revenue: 1890, expenses: 4800, profit: -2910, target: 3500 },
  { month: 'Juin', revenue: 2390, expenses: 3800, profit: -1410, target: 3500 },
];

// Enhanced client data with more categories
const clientData = [
  { name: 'Particuliers', value: 400, fill: '#0088FE' },
  { name: 'Entreprises', value: 300, fill: '#00C49F' },
  { name: 'Gouvernement', value: 200, fill: '#FFBB28' },
  { name: 'ONG', value: 100, fill: '#FF8042' },
  { name: 'Éducation', value: 150, fill: '#8884d8' }
];

// Enhanced tax data with more details
const taxData = [
  { month: 'Jan', tva: 2400, impot: 1800, taxe: 1200 },
  { month: 'Fév', tva: 1398, impot: 1200, taxe: 900 },
  { month: 'Mar', tva: 9800, impot: 8000, taxe: 6000 },
  { month: 'Avr', tva: 3908, impot: 3200, taxe: 2400 },
  { month: 'Mai', tva: 4800, impot: 4000, taxe: 3000 },
  { month: 'Juin', tva: 3800, impot: 3000, taxe: 2200 },
];

// Enhanced amortization data
const amortizationData = [
  { year: '2020', value: 4000, target: 4500 },
  { year: '2021', value: 3000, target: 4500 },
  { year: '2022', value: 2000, target: 4500 },
  { year: '2023', value: 2780, target: 4500 },
  { year: '2024', value: 1890, target: 4500 },
];

// Performance data for radial chart
const performanceData = [
  { name: 'Objectif', value: 75, fill: '#0088FE' },
  { name: 'Réalisation', value: 60, fill: '#00C49F' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Bank account data
const bankAccounts = [
  {
    id: 1,
    name: 'Compte Principal',
    bank: 'BNP Paribas',
    balance: 125430.50,
    currency: 'EUR',
    lastTransaction: '2024-03-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Compte Épargne',
    bank: 'Société Générale',
    balance: 75000.00,
    currency: 'EUR',
    lastTransaction: '2024-03-10',
    status: 'active'
  },
  {
    id: 3,
    name: 'Compte Pro',
    bank: 'Crédit Agricole',
    balance: 45000.75,
    currency: 'EUR',
    lastTransaction: '2024-03-14',
    status: 'active'
  }
];

// Financial ratios
const financialRatios = [
  {
    name: 'Ratio de liquidité',
    value: 2.5,
    target: 2.0,
    status: 'good'
  },
  {
    name: 'Marge brute',
    value: 35.8,
    target: 30.0,
    status: 'good'
  },
  {
    name: 'Ratio d\'endettement',
    value: 0.45,
    target: 0.5,
    status: 'good'
  },
  {
    name: 'ROE',
    value: 15.2,
    target: 12.0,
    status: 'good'
  }
];

// Cash flow data
const cashFlowData = [
  { month: 'Jan', income: 45000, expenses: 35000, net: 10000 },
  { month: 'Fév', income: 42000, expenses: 38000, net: 4000 },
  { month: 'Mar', income: 48000, expenses: 36000, net: 12000 },
  { month: 'Avr', income: 46000, expenses: 34000, net: 12000 },
  { month: 'Mai', income: 50000, expenses: 37000, net: 13000 },
  { month: 'Juin', income: 52000, expenses: 39000, net: 13000 },
];

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setIsSidebarCollapsed(sidebar.classList.contains('w-20'));
      }
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Create a MutationObserver to watch for class changes on the sidebar
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          </div>
          <p className="text-gray-600">
            Vue d'ensemble de votre entreprise
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution Financière</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Revenus"
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
                  dataKey="profit" 
                  stackId="1" 
                  stroke="#ffc658" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Répartition des Clients</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={clientData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {clientData.map((entry, index) => (
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

      {/* Bank Accounts Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Comptes Bancaires</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Voir tous les comptes
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bankAccounts.map((account) => (
            <div key={account.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">Actif</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{account.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{account.bank}</p>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: account.currency }).format(account.balance)}
                  </p>
                  <p className="text-sm text-gray-500">Solde actuel</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Dernière transaction</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(account.lastTransaction).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          ))}
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
                    {activity.type === 'vente' && <ShoppingCart className="w-5 h-5 text-green-600" />}
                    {activity.type === 'stock' && <FileText className="w-5 h-5 text-yellow-600" />}
                    {activity.type === 'facture' && <FileText className="w-5 h-5 text-red-600" />}
                    {activity.type === 'client' && <Users className="w-5 h-5 text-green-600" />}
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
