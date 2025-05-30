import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Package,
  FileSpreadsheet,
  FileText,
  Check,
  BarChart2,
  Tag,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

interface ExportOption {
  title: string;
  description: string;
  selected: boolean;
  icon: React.ReactNode;
}

export default function ProductsExport() {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      title: 'Catalogue Produits',
      description: 'Liste complète des produits et variantes',
      selected: true,
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: 'Niveaux de Stock',
      description: 'État des stocks et inventaire',
      selected: true,
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      title: 'Prix et Tarifs',
      description: 'Grille tarifaire et promotions',
      selected: false,
      icon: <Tag className="w-5 h-5" />,
    },
    {
      title: 'Alertes Stock',
      description: 'Seuils et alertes de réapprovisionnement',
      selected: false,
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      title: 'Statistiques Ventes',
      description: 'Performance et tendances des produits',
      selected: false,
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ]);

  const toggleOption = (index: number) => {
    const newOptions = [...exportOptions];
    newOptions[index].selected = !newOptions[index].selected;
    setExportOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/export')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Export Données Produits
                </h1>
                <p className="text-gray-500 mt-1">
                  Sélectionnez les données à exporter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Format Selection */}
        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedFormat('csv')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedFormat === 'csv'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              CSV
            </button>
            <button
              onClick={() => setSelectedFormat('excel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                selectedFormat === 'excel'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Excel
            </button>
          </div>
        </div>

        {/* Period Selection */}
        <div className="mb-8">
          <div className="flex gap-4">
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
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl border divide-y">
          {exportOptions.map((option, index) => (
            <div
              key={index}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleOption(index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                    option.selected
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {option.selected && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5" />
            Exporter les Données
          </button>
        </div>
      </div>
    </div>
  );
} 