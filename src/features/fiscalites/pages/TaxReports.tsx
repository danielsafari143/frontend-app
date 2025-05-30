import React from 'react';
import { BarChart3, Download, FileText, Calendar } from 'lucide-react';
import BackButton from '../../../components/BackButton';

export default function TaxReports() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <BackButton to="/fiscalites" label="Retour au tableau de bord" />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Rapports fiscaux</h1>
        <p className="mt-2 text-gray-600">
          Consultez et exportez vos rapports fiscaux
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Rapport TVA</h3>
              <p className="text-sm text-gray-500">Analyse des déclarations TVA</p>
            </div>
          </div>
          <Download className="w-5 h-5 text-gray-400" />
        </button>

        <button className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Rapport fiscal annuel</h3>
              <p className="text-sm text-gray-500">Synthèse des obligations fiscales</p>
            </div>
          </div>
          <Download className="w-5 h-5 text-gray-400" />
        </button>

        <button className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Calendrier fiscal</h3>
              <p className="text-sm text-gray-500">Échéances et déclarations</p>
            </div>
          </div>
          <Download className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Report List */}
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapports disponibles</h2>
          <div className="space-y-4">
            {/* Add report list items here */}
            <p className="text-gray-500">Aucun rapport disponible pour le moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 