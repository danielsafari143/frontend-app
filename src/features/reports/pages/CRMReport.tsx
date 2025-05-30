import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';

interface CustomerMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface CustomerSegment {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface TopCustomer {
  name: string;
  company: string;
  revenue: string;
  growth: string;
  status: 'active' | 'inactive';
}

export default function CRMReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const metrics: CustomerMetric[] = [
    {
      title: 'Clients Actifs',
      value: '1,250',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: 'Taux de Satisfaction',
      value: '92%',
      change: '+3.2%',
      trend: 'up',
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: 'Tickets Support',
      value: '450',
      change: '-5.8%',
      trend: 'down',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: 'Taux de Conversion',
      value: '15.8%',
      change: '+2.1%',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const customerSegments: CustomerSegment[] = [
    { name: 'Premium', count: 250, percentage: 20, color: 'bg-blue-500' },
    { name: 'Standard', count: 750, percentage: 60, color: 'bg-green-500' },
    { name: 'Basique', count: 250, percentage: 20, color: 'bg-gray-500' },
  ];

  const topCustomers: TopCustomer[] = [
    {
      name: 'Jean Dupont',
      company: 'Tech Solutions',
      revenue: '15,000,000 FCFA',
      growth: '+25%',
      status: 'active',
    },
    {
      name: 'Marie Martin',
      company: 'Global Services',
      revenue: '12,500,000 FCFA',
      growth: '+18%',
      status: 'active',
    },
    {
      name: 'Pierre Durand',
      company: 'Innovation Corp',
      revenue: '10,000,000 FCFA',
      growth: '+15%',
      status: 'active',
    },
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Rapport CRM</h1>
                <p className="text-gray-500 mt-1">Analyse des relations clients et performances</p>
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

            {/* Customer Segments */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Segments Clients</h2>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                      <span className="text-sm text-gray-500">{segment.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-2 rounded-full ${segment.color}`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Meilleurs Clients</h2>
              </div>
              <div className="divide-y">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-500">{customer.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{customer.revenue}</p>
                        <p className="text-sm text-green-600">{customer.growth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Customer Activity Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Client</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <Activity className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Customer Distribution Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribution Clients</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Nouveaux Clients</span>
                  <span className="text-sm font-medium text-gray-900">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Clients Perdus</span>
                  <span className="text-sm font-medium text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Taux de Rétention</span>
                  <span className="text-sm font-medium text-gray-900">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 