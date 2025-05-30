import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  FileSpreadsheet,
  TrendingUp,
  FileCheck,
  Download,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountingSettings {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'number' | 'select' | 'date';
  category: 'general' | 'tax' | 'reporting' | 'integration';
  description: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSettings, setExpandedSettings] = useState<Set<string>>(new Set());

  // Sample data for settings
  const settings: AccountingSettings[] = [
    {
      id: '1',
      name: 'Devise par défaut',
      value: 'FCFA',
      type: 'select',
      category: 'general',
      description: 'Devise utilisée par défaut pour les transactions',
    },
    {
      id: '2',
      name: 'Taux de TVA',
      value: '18',
      type: 'number',
      category: 'tax',
      description: 'Taux de TVA appliqué par défaut',
    },
    // Add more settings...
  ];

  const toggleSetting = (settingId: string) => {
    const newExpanded = new Set(expandedSettings);
    if (newExpanded.has(settingId)) {
      newExpanded.delete(settingId);
    } else {
      newExpanded.add(settingId);
    }
    setExpandedSettings(newExpanded);
  };

  const getCategoryLabel = (category: AccountingSettings['category']) => {
    switch (category) {
      case 'general':
        return 'Général';
      case 'tax':
        return 'Fiscal';
      case 'reporting':
        return 'Rapports';
      case 'integration':
        return 'Intégration';
      default:
        return category;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/accounting')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <SettingsIcon className="w-7 h-7 text-gray-600" />
              Paramètres
            </h1>
            <p className="text-gray-500">Configuration du module comptable</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <Save className="w-4 h-4" /> Enregistrer les modifications
          </button>
        </div>
      </div>

      {/* Settings Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Liste des paramètres</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {settings.map((setting) => (
                <React.Fragment key={setting.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSetting(setting.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedSettings.has(setting.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{setting.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{setting.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{getCategoryLabel(setting.category)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 capitalize">{setting.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedSettings.has(setting.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Description: {setting.description}</div>
                            <div className="text-sm text-gray-500">Catégorie: {getCategoryLabel(setting.category)}</div>
                            <div className="text-sm text-gray-500">Type: {setting.type}</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                              Modifier
                            </button>
                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                              Réinitialiser
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un paramètre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
          <option>Catégorie: Toutes</option>
          <option>Catégorie: Général</option>
          <option>Catégorie: Fiscal</option>
          <option>Catégorie: Rapports</option>
          <option>Catégorie: Intégration</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>
    </div>
  );
} 