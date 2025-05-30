import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  FileSpreadsheet,
  Clock,
  Plus,
  ChevronRight,
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  format: 'pdf' | 'excel' | 'csv';
}

interface ReportType {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export default function Reports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const reportTypes: ReportType[] = [
    {
      title: 'Rapport Financier',
      description: 'Analyse détaillée des performances financières',
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/reports/financial',
      color: 'bg-blue-500',
    },
    {
      title: 'Rapport de Ventes',
      description: 'Analyse des ventes et des performances commerciales',
      icon: <TrendingUp className="w-8 h-8" />,
      path: '/reports/sales',
      color: 'bg-green-500',
    },
    {
      title: 'Rapport RH',
      description: 'Statistiques et analyses des ressources humaines',
      icon: <PieChart className="w-8 h-8" />,
      path: '/reports/hr',
      color: 'bg-purple-500',
    },
    {
      title: 'Rapport d\'Inventaire',
      description: 'État des stocks et analyse des mouvements',
      icon: <LineChart className="w-8 h-8" />,
      path: '/reports/inventory',
      color: 'bg-yellow-500',
    },
    {
      title: 'Rapport CRM',
      description: 'Analyse des relations clients et performances',
      icon: <FileSpreadsheet className="w-8 h-8" />,
      path: '/reports/crm',
      color: 'bg-red-500',
    },
    {
      title: 'Rapport de Production',
      description: 'Analyse de la production et des performances',
      icon: <FileText className="w-8 h-8" />,
      path: '/reports/production',
      color: 'bg-indigo-500',
    },
  ];

  const recentReports: Report[] = [
    {
      id: '1',
      title: 'Rapport Financier Mensuel',
      type: 'Rapport Financier',
      date: '2024-03-15',
      status: 'completed',
      format: 'pdf',
    },
    {
      id: '2',
      title: 'Analyse des Ventes Q1 2024',
      type: 'Rapport de Ventes',
      date: '2024-03-10',
      status: 'completed',
      format: 'excel',
    },
    {
      id: '3',
      title: 'Rapport RH Trimestriel',
      type: 'Rapport RH',
      date: '2024-03-05',
      status: 'processing',
      format: 'pdf',
    },
    {
      id: '4',
      title: 'État des Stocks',
      type: 'Rapport d\'Inventaire',
      date: '2024-03-01',
      status: 'completed',
      format: 'excel',
    },
  ];

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: Report['format']) => {
    switch (format) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'excel':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'csv':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rapports & Tableaux de bord</h1>
              <p className="text-gray-500 mt-1">Gérez et consultez vos rapports</p>
            </div>
            <button 
              onClick={() => navigate('/reports/new')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Nouveau Rapport
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des rapports..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filtrer
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Calendar className="w-5 h-5" />
              Période
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Report Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => navigate(type.path)}
                  className="flex items-start p-6 bg-white rounded-xl border hover:shadow-md transition-all group"
                >
                  <div className={`p-3 rounded-lg ${type.color} mr-4`}>
                    {type.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {type.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Rapports Récents</h2>
              </div>
              <div className="divide-y">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getFormatIcon(report.format)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status === 'completed' ? 'Terminé' : report.status === 'processing' ? 'En cours' : 'Échoué'}
                      </span>
                      <span className="text-sm text-gray-500">{report.date}</span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  Rapports Programmes
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Download className="w-5 h-5 text-gray-400" />
                  Téléchargements Récents
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-400" />
                  Modèles de Rapports
                </button>
              </div>
            </div>

            {/* Report Statistics */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rapports Générés</span>
                  <span className="text-sm font-medium text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">En Cours</span>
                  <span className="text-sm font-medium text-gray-900">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Stockage Utilisé</span>
                  <span className="text-sm font-medium text-gray-900">2.4 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 