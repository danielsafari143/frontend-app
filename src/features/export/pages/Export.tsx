import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  FileText,
  Download,
  ArrowRight,
  Database,
  Table,
  FileJson,
} from 'lucide-react';

interface ExportOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

export default function Export() {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('csv');

  const exportOptions: ExportOption[] = [
    {
      title: 'Données Comptables',
      description: 'Exportez les données comptables, transactions et rapports',
      icon: <Database className="w-6 h-6" />,
      path: '/export/accounting',
    },
    {
      title: 'Données Clients',
      description: 'Exportez les informations clients et interactions',
      icon: <Table className="w-6 h-6" />,
      path: '/export/customers',
    },
    {
      title: 'Données Produits',
      description: 'Exportez le catalogue produits et stocks',
      icon: <FileJson className="w-6 h-6" />,
      path: '/export/products',
    },
    {
      title: 'Données RH',
      description: 'Exportez les données employés et ressources humaines',
      icon: <FileText className="w-6 h-6" />,
      path: '/export/hr',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Exportations</h1>
          <p className="mt-2 text-gray-600">
            Exportez vos données en CSV ou Excel pour une utilisation externe
          </p>
        </div>

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

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border p-6 hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => navigate(option.path)}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {option.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {option.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Exports */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Exports Récents
          </h2>
          <div className="bg-white rounded-xl border divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileSpreadsheet className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Données Comptables
                  </p>
                  <p className="text-sm text-gray-500">Exporté il y a 2 heures</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Liste Clients
                  </p>
                  <p className="text-sm text-gray-500">Exporté il y a 1 jour</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 