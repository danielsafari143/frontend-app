import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2,
  TrendingUp,
  Plus,
  Filter,
  ChevronDown,
  ChevronUp,
  FileText,
  Home,
  Receipt,
  DollarSign,
  Building2,
  PiggyBank,
  Info,
  X,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Expenses from './expenses/pages/ExpenseList';
import Payments from './receive-payment/pages/ReceivePaymentList';
import LoadingSpinner from '../../../global-components/ui/LoadingSpinner';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface CashFlowSummary {
  category: string;
  amount: number;
  ohadaCategory: string;
  ohadaCode: string;
  description?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: CashFlowSummary[];
  netAmount: number;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, title, data, netAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code OHADA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.ohadaCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`font-medium ${item.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900">
                    Flux Net
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className={`font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CashFlow() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'payments' | 'expenses'>('payments');
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'chart'>('table');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // OHADA-compliant cash flow categories
  const operatingActivities: CashFlowSummary[] = [
    {
      category: 'Ventes de marchandises',
      amount: 15000000,
      ohadaCategory: 'Flux d\'exploitation',
      ohadaCode: '70',
      description: 'Produits des ventes de marchandises'
    },
    {
      category: 'Prestations de services',
      amount: 5000000,
      ohadaCategory: 'Flux d\'exploitation',
      ohadaCode: '74',
      description: 'Produits des prestations de services'
    },
    {
      category: 'Achats de marchandises',
      amount: -8000000,
      ohadaCategory: 'Flux d\'exploitation',
      ohadaCode: '60',
      description: 'Achats de marchandises pour revente'
    },
    {
      category: 'Charges de personnel',
      amount: -5000000,
      ohadaCategory: 'Flux d\'exploitation',
      ohadaCode: '64',
      description: 'Rémunérations du personnel'
    }
  ];

  const investingActivities: CashFlowSummary[] = [
    {
      category: 'Acquisition d\'immobilisations',
      amount: -10000000,
      ohadaCategory: 'Flux d\'investissement',
      ohadaCode: '20',
      description: 'Acquisition d\'immobilisations corporelles'
    },
    {
      category: 'Cession d\'immobilisations',
      amount: 2000000,
      ohadaCategory: 'Flux d\'investissement',
      ohadaCode: '77',
      description: 'Produits de cession d\'immobilisations'
    },
    {
      category: 'Acquisition de titres',
      amount: -5000000,
      ohadaCategory: 'Flux d\'investissement',
      ohadaCode: '27',
      description: 'Acquisition de titres de participation'
    }
  ];

  const financingActivities: CashFlowSummary[] = [
    {
      category: 'Augmentation de capital',
      amount: 15000000,
      ohadaCategory: 'Flux de financement',
      ohadaCode: '101',
      description: 'Apports en capital'
    },
    {
      category: 'Emprunts bancaires',
      amount: 10000000,
      ohadaCategory: 'Flux de financement',
      ohadaCode: '16',
      description: 'Nouveaux emprunts bancaires'
    },
    {
      category: 'Remboursement d\'emprunts',
      amount: -3000000,
      ohadaCategory: 'Flux de financement',
      ohadaCode: '16',
      description: 'Remboursement d\'emprunts'
    },
    {
      category: 'Distribution de dividendes',
      amount: -2000000,
      ohadaCategory: 'Flux de financement',
      ohadaCode: '106',
      description: 'Distribution des bénéfices'
    }
  ];

  const calculateNetCashFlow = (activities: CashFlowSummary[]) => {
    return activities.reduce((sum, item) => sum + item.amount, 0);
  };

  const netOperatingCashFlow = calculateNetCashFlow(operatingActivities);
  const netInvestingCashFlow = calculateNetCashFlow(investingActivities);
  const netFinancingCashFlow = calculateNetCashFlow(financingActivities);
  const totalNetCashFlow = netOperatingCashFlow + netInvestingCashFlow + netFinancingCashFlow;

  // Chart data preparation
  const barChartData = {
    labels: ['Flux d\'exploitation', 'Flux d\'investissement', 'Flux de financement'],
    datasets: [
      {
        label: 'Flux Net',
        data: [netOperatingCashFlow, netInvestingCashFlow, netFinancingCashFlow],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(168, 85, 247, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Flux Net Total',
        data: [totalNetCashFlow * 0.8, totalNetCashFlow * 0.9, totalNetCashFlow, totalNetCashFlow * 1.1, totalNetCashFlow * 1.2, totalNetCashFlow * 1.3],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const handleNewTransaction = (type: 'expense' | 'payment') => {
    if (type === 'expense') {
      navigate('/expenses/new');
    } else {
      navigate('/payments/new');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/finance')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Home className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={() => navigate('/finance/reports/ohada-cash-flow')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Receipt className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de Flux de Trésorerie</h1>
                <p className="text-gray-500">Conformité OHADA - SYSCOHADA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5" />
                  Filtres
                  {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setActiveView(activeView === 'table' ? 'chart' : 'table')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                {activeView === 'table' ? <BarChart2 className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                {activeView === 'table' ? 'Voir Graphiques' : 'Voir Tableaux'}
              </button>
              <button
                onClick={() => navigate('/finance/reports/ohada-cash-flow')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-5 h-5" />
                Rapport OHADA
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'chart' ? (
          <div className="space-y-8">
            {/* OHADA Categories Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Flux d'exploitation */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux d'exploitation</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Flux Net</span>
                    <span className={`text-sm font-medium ${netOperatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netOperatingCashFlow.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">
                      Activités courantes de l'entreprise (ventes, achats, salaires)
                    </p>
                  </div>
                </div>
              </div>

              {/* Flux d'investissement */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux d'investissement</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Flux Net</span>
                    <span className={`text-sm font-medium ${netInvestingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netInvestingCashFlow.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">
                      Acquisitions et cessions d'actifs à long terme
                    </p>
                  </div>
                </div>
              </div>

              {/* Flux de financement */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux de financement</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Flux Net</span>
                    <span className={`text-sm font-medium ${netFinancingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netFinancingCashFlow.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">
                      Opérations financières (emprunts, capital, dividendes)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Flux de Trésorerie</h3>
                <Bar data={barChartData} options={chartOptions} />
              </div>
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du Flux Net Total</h3>
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* OHADA Categories Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Flux d'exploitation */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux d'exploitation</h3>
                </div>
                <div className="space-y-4">
                  {operatingActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">{activity.category}</span>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      </div>
                      <span className={`text-sm font-medium ${activity.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Flux Net</span>
                      <span className={`text-sm font-medium ${netOperatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netOperatingCashFlow.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flux d'investissement */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux d'investissement</h3>
                </div>
                <div className="space-y-4">
                  {investingActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">{activity.category}</span>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      </div>
                      <span className={`text-sm font-medium ${activity.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Flux Net</span>
                      <span className={`text-sm font-medium ${netInvestingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netInvestingCashFlow.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flux de financement */}
              <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Flux de financement</h3>
                </div>
                <div className="space-y-4">
                  {financingActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">{activity.category}</span>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                      </div>
                      <span className={`text-sm font-medium ${activity.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.amount.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Flux Net</span>
                      <span className={`text-sm font-medium ${netFinancingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netFinancingCashFlow.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Net Cash Flow */}
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Flux de Trésorerie Net Total</h3>
                <span className={`text-xl font-bold ${totalNetCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalNetCashFlow.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>

            {/* Detailed Transactions */}
            <div className="mt-8">
              <div className="flex items-center justify-between border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'payments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Détail des Encaissements
                  </button>
                  <button
                    onClick={() => setActiveTab('expenses')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'expenses'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Détail des Décaissements
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                {activeTab === 'payments' ? (
                  <Payments />
                ) : (
                  <Expenses />
                )}
              </div>
            </div>
          </>
        )}

        {/* Detail Modals */}
        <DetailModal
          isOpen={selectedCategory === 'operating'}
          onClose={() => setSelectedCategory(null)}
          title="Détails des Flux d'exploitation"
          data={operatingActivities}
          netAmount={netOperatingCashFlow}
        />
        <DetailModal
          isOpen={selectedCategory === 'investing'}
          onClose={() => setSelectedCategory(null)}
          title="Détails des Flux d'investissement"
          data={investingActivities}
          netAmount={netInvestingCashFlow}
        />
        <DetailModal
          isOpen={selectedCategory === 'financing'}
          onClose={() => setSelectedCategory(null)}
          title="Détails des Flux de financement"
          data={financingActivities}
          netAmount={netFinancingCashFlow}
        />
      </div>
    </div>
  );
}
