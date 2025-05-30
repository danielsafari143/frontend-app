import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Factory,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  FileText,
  Settings,
} from 'lucide-react';

interface ProductionMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface ProductionLine {
  name: string;
  efficiency: number;
  status: 'active' | 'maintenance' | 'stopped';
  output: string;
}

interface QualityMetric {
  name: string;
  value: string;
  target: string;
  status: 'good' | 'warning' | 'critical';
}

export default function ProductionReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const metrics: ProductionMetric[] = [
    {
      title: 'Efficacité Globale',
      value: '85%',
      change: '+2.5%',
      trend: 'up',
      icon: <Factory className="w-5 h-5" />,
    },
    {
      title: 'Temps de Fonctionnement',
      value: '92%',
      change: '+1.8%',
      trend: 'up',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: 'Taux de Défauts',
      value: '1.2%',
      change: '-0.5%',
      trend: 'down',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      title: 'Production Totale',
      value: '25,000',
      change: '+5.2%',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const productionLines: ProductionLine[] = [
    {
      name: 'Ligne A',
      efficiency: 92,
      status: 'active',
      output: '8,500 unités',
    },
    {
      name: 'Ligne B',
      efficiency: 88,
      status: 'maintenance',
      output: '7,200 unités',
    },
    {
      name: 'Ligne C',
      efficiency: 95,
      status: 'active',
      output: '9,300 unités',
    },
  ];

  const qualityMetrics: QualityMetric[] = [
    {
      name: 'Qualité Produit',
      value: '98.5%',
      target: '99%',
      status: 'good',
    },
    {
      name: 'Conformité',
      value: '95.2%',
      target: '96%',
      status: 'warning',
    },
    {
      name: 'Temps de Cycle',
      value: '45s',
      target: '40s',
      status: 'critical',
    },
  ];

  const getStatusColor = (status: ProductionLine['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/reports')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rapport de Production</h1>
                <p className="text-gray-500 mt-1">Analyse de la production et des performances</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-5 h-5" />
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selection */}
        <div className="flex gap-4 mb-8">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period === 'week' && 'Semaine'}
              {period === 'month' && 'Mois'}
              {period === 'quarter' && 'Trimestre'}
              {period === 'year' && 'Année'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl border p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {metric.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-4">{metric.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
                </div>
              ))}
            </div>

            {/* Production Lines */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Lignes de Production</h2>
              </div>
              <div className="divide-y">
                {productionLines.map((line, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{line.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(line.status)}`}>
                            {line.status === 'active' ? 'Actif' : line.status === 'maintenance' ? 'Maintenance' : 'Arrêté'}
                          </span>
                          <span className="text-sm text-gray-500">Efficacité: {line.efficiency}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{line.output}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Métriques de Qualité</h2>
              <div className="space-y-6">
                {qualityMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                      <span className="text-sm text-gray-500">Objectif: {metric.target}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            metric.status === 'good'
                              ? 'bg-green-500'
                              : metric.status === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{
                            width: `${(parseFloat(metric.value) / parseFloat(metric.target)) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Production Activity Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité de Production</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <Activity className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Equipment Status */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">État des Équipements</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">En Fonction</span>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">En Maintenance</span>
                  <span className="text-sm font-medium text-gray-900">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Hors Service</span>
                  <span className="text-sm font-medium text-gray-900">5%</span>
                </div>
              </div>
            </div>

            {/* Maintenance Schedule */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Planning de Maintenance</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ligne B - Maintenance Planifiée</p>
                    <p className="text-sm text-gray-500">Dans 2 jours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ligne A - Révision</p>
                    <p className="text-sm text-gray-500">Dans 5 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 