import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  FileText,
  Users,
  Calendar,
  Briefcase,
  FileWarning,
  Trash2,
  Share2,
  Clock,
  User,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Report {
  id: string;
  title: string;
  category: 'employee' | 'attendance' | 'performance' | 'compliance' | 'payroll';
  description: string;
  generatedAt: string;
  generatedBy: string;
  format: 'pdf' | 'excel' | 'csv';
  size: string;
  parameters: {
    label: string;
    value: string;
  }[];
  downloadCount: number;
  lastDownloaded: string;
  lastDownloadedBy: string;
}

export default function ReportDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const report: Report = {
    id: '1',
    title: 'Rapport des employés',
    category: 'employee',
    description: 'Liste complète des employés avec leurs informations détaillées',
    generatedAt: '2024-03-15T10:30:00',
    generatedBy: 'Marie Martin',
    format: 'pdf',
    size: '2.5 MB',
    parameters: [
      { label: 'Département', value: 'Tous les départements' },
      { label: 'Informations personnelles', value: 'Inclus' },
      { label: 'Informations de contact', value: 'Inclus' },
    ],
    downloadCount: 5,
    lastDownloaded: '2024-03-16T14:20:00',
    lastDownloadedBy: 'Pierre Dupont',
  };

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

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting report:', id);
    navigate('/hr/reports');
  };

  const handleDownload = () => {
    // TODO: Implement download logic
    console.log('Downloading report:', id);
  };

  const handleShare = () => {
    // TODO: Implement share logic
    console.log('Sharing report:', id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/reports')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
            <p className="text-gray-500">
              Généré le {formatDate(report.generatedAt)} par {report.generatedBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du rapport</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-5 h-5" />
                  <span>Format: {report.format.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-5 h-5" />
                  <span>Taille: {report.size}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Dernier téléchargement: {formatDate(report.lastDownloaded)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>Dernier téléchargé par: {report.lastDownloadedBy}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres</h2>
            <div className="space-y-4">
              {report.parameters.map((param, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{param.label}</span>
                  <span className="text-gray-900 font-medium">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Download Stats */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Nombre de téléchargements</span>
                <span className="text-gray-900 font-medium">{report.downloadCount}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-4">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-5 h-5" />
                Télécharger
              </button>
              <button
                onClick={() => navigate(`/hr/reports/${id}/generate`)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <FileText className="w-5 h-5" />
                Régénérer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        title="Supprimer le rapport"
        itemName={report.title}
        itemType="rapport"
        customMessage="Êtes-vous sûr de vouloir supprimer ce rapport ? Cette action est irréversible."
      />
    </div>
  );
} 