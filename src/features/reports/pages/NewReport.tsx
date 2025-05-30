import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  FileSpreadsheet as CsvIcon,
  Plus,
  X,
  AlertCircle,
} from 'lucide-react';

interface ReportType {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface ReportParameter {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  label: string;
  required: boolean;
  options?: string[];
}

export default function NewReport() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

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
  ];

  const reportParameters: Record<string, ReportParameter[]> = {
    'Rapport Financier': [
      {
        id: 'period',
        name: 'period',
        type: 'select',
        label: 'Période',
        required: true,
        options: ['Jour', 'Semaine', 'Mois', 'Trimestre', 'Année'],
      },
      {
        id: 'currency',
        name: 'currency',
        type: 'select',
        label: 'Devise',
        required: true,
        options: ['FCFA', 'USD', 'EUR'],
      },
      {
        id: 'includeCharts',
        name: 'includeCharts',
        type: 'select',
        label: 'Inclure les graphiques',
        required: false,
        options: ['Oui', 'Non'],
      },
    ],
    'Rapport de Ventes': [
      {
        id: 'dateRange',
        name: 'dateRange',
        type: 'date',
        label: 'Période',
        required: true,
      },
      {
        id: 'productCategory',
        name: 'productCategory',
        type: 'select',
        label: 'Catégorie de produits',
        required: false,
        options: ['Tous', 'Électronique', 'Vêtements', 'Alimentation'],
      },
    ],
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    const selectedReport = reportTypes.find(type => type.title === selectedType);
    setTimeout(() => {
      if (selectedReport) {
        navigate(selectedReport.path);
      } else {
        navigate('/reports');
      }
    }, 2000);
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
                <h1 className="text-2xl font-bold text-gray-900">Nouveau Rapport</h1>
                <p className="text-gray-500 mt-1">Créez un nouveau rapport personnalisé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Type de Rapport</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedType(type.title)}
                    className={`flex items-start p-6 rounded-xl border hover:shadow-md transition-all ${
                      selectedType === type.title ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${type.color} mr-4`}>
                      {type.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedType && (
              <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Paramètres du Rapport</h2>
                <div className="space-y-6">
                  {reportParameters[selectedType]?.map((param) => (
                    <div key={param.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {param.label}
                        {param.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {param.type === 'select' ? (
                        <select
                          name={param.name}
                          required={param.required}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleInputChange(param.name, e.target.value)}
                        >
                          <option value="">Sélectionnez une option</option>
                          {param.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : param.type === 'date' ? (
                        <input
                          type="date"
                          name={param.name}
                          required={param.required}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleInputChange(param.name, e.target.value)}
                        />
                      ) : (
                        <input
                          type={param.type}
                          name={param.name}
                          required={param.required}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => handleInputChange(param.name, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Aperçu
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Générer le Rapport
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Help Section */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Aide</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Sélectionnez un type de rapport</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Choisissez le type de rapport que vous souhaitez générer pour voir les paramètres disponibles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Remplissez les paramètres</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Configurez les paramètres selon vos besoins pour personnaliser le rapport.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Générez le rapport</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Une fois les paramètres configurés, générez le rapport pour le visualiser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Aperçu du Rapport</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{selectedType}</h3>
                <div className="space-y-2">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{key}</span>
                      <span className="text-sm font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Rapport généré avec succès</h3>
              <p className="mt-2 text-sm text-gray-500">
                Votre rapport a été généré et sera disponible dans la liste des rapports.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 