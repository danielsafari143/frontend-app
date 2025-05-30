import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Users,
  Calendar,
  Briefcase,
  FileWarning,
  Download,
  Filter,
  Search,
  ChevronRight,
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  category: 'employee' | 'attendance' | 'performance' | 'compliance' | 'payroll';
  description: string;
  lastGenerated: string;
  generatedBy: string;
  format: 'pdf' | 'excel' | 'csv';
  size: string;
}

export default function HRReports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sample data
  const reports: Report[] = [
    {
      id: '1',
      title: 'Rapport des employés',
      category: 'employee',
      description: 'Liste complète des employés avec leurs informations détaillées',
      lastGenerated: '2024-03-15',
      generatedBy: 'Marie Martin',
      format: 'pdf',
      size: '2.5 MB',
    },
    {
      id: '2',
      title: 'Rapport d\'assiduité',
      category: 'attendance',
      description: 'Statistiques d\'assiduité et d\'absences par département',
      lastGenerated: '2024-03-14',
      generatedBy: 'Pierre Dupont',
      format: 'excel',
      size: '1.8 MB',
    },
    {
      id: '3',
      title: 'Rapport de performance',
      category: 'performance',
      description: 'Évaluation des performances des employés',
      lastGenerated: '2024-03-13',
      generatedBy: 'Sophie Bernard',
      format: 'pdf',
      size: '3.2 MB',
    },
    {
      id: '4',
      title: 'Rapport de conformité',
      category: 'compliance',
      description: 'État de la conformité réglementaire',
      lastGenerated: '2024-03-12',
      generatedBy: 'Jean Martin',
      format: 'excel',
      size: '1.5 MB',
    },
    {
      id: '5',
      title: 'Rapport de paie',
      category: 'payroll',
      description: 'Synthèse des salaires et avantages',
      lastGenerated: '2024-03-11',
      generatedBy: 'Marie Martin',
      format: 'pdf',
      size: '2.8 MB',
    },
  ];

  const categories = [
    { value: 'employee', label: 'Employés', icon: Users },
    { value: 'attendance', label: 'Assiduité', icon: Calendar },
    { value: 'performance', label: 'Performance', icon: Briefcase },
    { value: 'compliance', label: 'Conformité', icon: FileWarning },
    { value: 'payroll', label: 'Paie', icon: FileText },
  ];

  const getCategoryIcon = (category: Report['category']) => {
    const CategoryIcon = categories.find(cat => cat.value === category)?.icon || FileText;
    return <CategoryIcon className="w-5 h-5" />;
  };

  const getCategoryLabel = (category: Report['category']) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
            <p className="text-gray-500">Générez et consultez les rapports RH</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un rapport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(selectedCategory === category.value ? null : category.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              selectedCategory === category.value
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon className="w-5 h-5" />
            {category.label}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border shadow-sm divide-y">
        {filteredReports.map(report => (
          <div key={report.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getCategoryIcon(report.category)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Dernière génération: {formatDate(report.lastGenerated)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Par: {report.generatedBy}
                    </span>
                    <span className="text-xs text-gray-500">
                      Format: {report.format.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Taille: {report.size}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/hr/reports/${report.id}`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/hr/reports/${report.id}/generate`)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 