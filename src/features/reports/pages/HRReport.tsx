import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Users,
  UserPlus,
  UserMinus,
  DollarSign,
  ChevronDown,
  PieChart,
  LineChart,
  BarChart3,
  Briefcase,
  Award,
  Clock,
} from 'lucide-react';

interface HRMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface Department {
  name: string;
  employees: number;
  percentage: number;
  color: string;
}

interface EmployeeStatus {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

interface TopPerformer {
  name: string;
  department: string;
  position: string;
  performance: number;
  attendance: number;
}

export default function HRReport() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  const metrics: HRMetric[] = [
    {
      title: 'Effectif Total',
      value: '150',
      change: 5.2,
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Nouveaux Recrutements',
      value: '12',
      change: 8.3,
      trend: 'up',
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      title: 'Départs',
      value: '5',
      change: -2.1,
      trend: 'down',
      icon: <UserMinus className="w-6 h-6" />,
    },
    {
      title: 'Masse Salariale',
      value: '45,000,000 FCFA',
      change: 3.7,
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  const departments: Department[] = [
    {
      name: 'Développement',
      employees: 45,
      percentage: 30,
      color: 'bg-blue-500',
    },
    {
      name: 'Marketing',
      employees: 30,
      percentage: 20,
      color: 'bg-green-500',
    },
    {
      name: 'Ventes',
      employees: 35,
      percentage: 23,
      color: 'bg-yellow-500',
    },
    {
      name: 'Support',
      employees: 25,
      percentage: 17,
      color: 'bg-purple-500',
    },
    {
      name: 'Administration',
      employees: 15,
      percentage: 10,
      color: 'bg-gray-500',
    },
  ];

  const employeeStatuses: EmployeeStatus[] = [
    {
      status: 'À Temps Plein',
      count: 120,
      percentage: 80,
      color: 'bg-green-500',
    },
    {
      status: 'À Temps Partiel',
      count: 20,
      percentage: 13,
      color: 'bg-blue-500',
    },
    {
      status: 'Stagiaires',
      count: 10,
      percentage: 7,
      color: 'bg-yellow-500',
    },
  ];

  const topPerformers: TopPerformer[] = [
    {
      name: 'Jean Dupont',
      department: 'Développement',
      position: 'Lead Developer',
      performance: 95,
      attendance: 98,
    },
    {
      name: 'Marie Martin',
      department: 'Marketing',
      position: 'Marketing Manager',
      performance: 92,
      attendance: 100,
    },
    {
      name: 'Pierre Durand',
      department: 'Ventes',
      position: 'Sales Representative',
      performance: 90,
      attendance: 95,
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
                <h1 className="text-2xl font-bold text-gray-900">Rapport RH</h1>
                <p className="text-gray-500 mt-1">Analyse des ressources humaines</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'excel')}
                  className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setSelectedPeriod('quarter')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg ${
                selectedPeriod === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Année
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-5 h-5" />
            Période Personnalisée
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Departments */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition par Département</h2>
              <div className="space-y-4">
                {departments.map((department, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${department.color} text-white`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{department.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {department.employees} employés
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${department.color}`}
                          style={{ width: `${department.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{department.percentage}% de l'effectif</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Meilleurs Performeurs</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="pb-4">Employé</th>
                      <th className="pb-4">Département</th>
                      <th className="pb-4">Poste</th>
                      <th className="pb-4">Performance</th>
                      <th className="pb-4">Présence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topPerformers.map((performer, index) => (
                      <tr key={index}>
                        <td className="py-4">
                          <span className="text-sm font-medium text-gray-900">{performer.name}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-500">{performer.department}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-500">{performer.position}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-green-600">
                            {performer.performance}%
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-blue-600">
                            {performer.attendance}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Employee Status */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Statut des Employés</h2>
              <div className="space-y-4">
                {employeeStatuses.map((status, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${status.color} text-white`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{status.status}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {status.count} employés
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${status.color}`}
                          style={{ width: `${status.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{status.percentage}% de l'effectif</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HR Trends Chart */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendances RH</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            {/* HR Summary */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé RH</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Effectif Total</span>
                  <span className="text-sm font-medium text-gray-900">150 employés</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Taux de Rotation</span>
                  <span className="text-sm font-medium text-gray-900">3.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Taux d'Absentéisme</span>
                  <span className="text-sm font-medium text-gray-900">2.1%</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Masse Salariale</span>
                    <span className="text-sm font-medium text-green-600">45,000,000 FCFA</span>
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