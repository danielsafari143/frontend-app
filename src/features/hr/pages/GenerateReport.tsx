import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Users,
  Calendar,
  Briefcase,
  FileWarning,
  Download,
  Settings,
  Check,
  X,
} from 'lucide-react';

interface ReportOption {
  id: string;
  label: string;
  description: string;
  type: 'checkbox' | 'date' | 'select' | 'text';
  options?: { value: string; label: string }[];
  required: boolean;
}

export default function GenerateReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Sample report options based on report type
  const reportOptions: Record<string, ReportOption[]> = {
    '1': [ // Employee Report
      {
        id: 'includePersonalInfo',
        label: 'Informations personnelles',
        description: 'Inclure les informations personnelles des employés',
        type: 'checkbox',
        required: false,
      },
      {
        id: 'includeContactInfo',
        label: 'Informations de contact',
        description: 'Inclure les coordonnées des employés',
        type: 'checkbox',
        required: false,
      },
      {
        id: 'department',
        label: 'Département',
        description: 'Filtrer par département',
        type: 'select',
        options: [
          { value: 'all', label: 'Tous les départements' },
          { value: 'it', label: 'Informatique' },
          { value: 'hr', label: 'Ressources Humaines' },
          { value: 'finance', label: 'Finance' },
        ],
        required: false,
      },
    ],
    '2': [ // Attendance Report
      {
        id: 'startDate',
        label: 'Date de début',
        description: 'Période de début du rapport',
        type: 'date',
        required: true,
      },
      {
        id: 'endDate',
        label: 'Date de fin',
        description: 'Période de fin du rapport',
        type: 'date',
        required: true,
      },
      {
        id: 'includeAbsences',
        label: 'Inclure les absences',
        description: 'Inclure les détails des absences',
        type: 'checkbox',
        required: false,
      },
    ],
    '3': [ // Performance Report
      {
        id: 'year',
        label: 'Année',
        description: 'Année d\'évaluation',
        type: 'select',
        options: [
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
        ],
        required: true,
      },
      {
        id: 'includeComments',
        label: 'Inclure les commentaires',
        description: 'Inclure les commentaires des évaluations',
        type: 'checkbox',
        required: false,
      },
    ],
  };

  const handleInputChange = (optionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // TODO: Implement report generation logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      navigate('/hr/reports');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderOptionInput = (option: ReportOption) => {
    switch (option.type) {
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={option.id}
            checked={formData[option.id] || false}
            onChange={(e) => handleInputChange(option.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            id={option.id}
            value={formData[option.id] || ''}
            onChange={(e) => handleInputChange(option.id, e.target.value)}
            required={option.required}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            id={option.id}
            value={formData[option.id] || ''}
            onChange={(e) => handleInputChange(option.id, e.target.value)}
            required={option.required}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner...</option>
            {option.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Générer un rapport</h1>
            <p className="text-gray-500">Personnalisez et générez votre rapport</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Format du rapport</h2>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSelectedFormat('pdf')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  selectedFormat === 'pdf'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('excel')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  selectedFormat === 'excel'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                Excel
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  selectedFormat === 'csv'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                CSV
              </button>
            </div>
          </div>

          {/* Report Options */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Options du rapport</h2>
            <div className="space-y-4">
              {reportOptions[id || '']?.map(option => (
                <div key={option.id} className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={option.id}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {option.label}
                        {option.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                  <div className="w-48">
                    {renderOptionInput(option)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/hr/reports')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Settings className="w-5 h-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Générer le rapport
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 