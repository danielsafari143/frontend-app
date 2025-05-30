import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Settings,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface TaxSummary {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

interface UpcomingDeclaration {
  id: string;
  type: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export default function FiscalitesDashboard() {
  const navigate = useNavigate();

  const taxSummaries: TaxSummary[] = [
    {
      id: '1',
      type: 'TVA',
      amount: 15000,
      dueDate: '2024-04-30',
      status: 'pending',
    },
    {
      id: '2',
      type: 'Impôt sur les sociétés',
      amount: 45000,
      dueDate: '2024-05-15',
      status: 'pending',
    },
    {
      id: '3',
      type: 'Cotisations sociales',
      amount: 8500,
      dueDate: '2024-04-25',
      status: 'overdue',
    },
  ];

  const upcomingDeclarations: UpcomingDeclaration[] = [
    {
      id: '1',
      type: 'Déclaration TVA',
      dueDate: '2024-04-30',
      status: 'pending',
    },
    {
      id: '2',
      type: 'Déclaration fiscale annuelle',
      dueDate: '2024-05-15',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord fiscal</h1>
        <p className="mt-2 text-gray-600">
          Gérez vos obligations fiscales et suivez vos déclarations
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate('/fiscalites/declarations/new')}
          className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Nouvelle déclaration</h3>
              <p className="text-sm text-gray-500">Créer une déclaration fiscale</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/fiscalites/paiements/new')}
          className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Nouveau paiement</h3>
              <p className="text-sm text-gray-500">Enregistrer un paiement fiscal</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/fiscalites/calendrier')}
          className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Calendrier fiscal</h3>
              <p className="text-sm text-gray-500">Voir les échéances</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Tax Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Résumé des taxes</h2>
            <button
              onClick={() => navigate('/fiscalites/paiements')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {taxSummaries.map((tax) => (
              <div
                key={tax.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{tax.type}</h3>
                  <p className="text-sm text-gray-500">
                    Échéance: {new Date(tax.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {tax.amount.toLocaleString()} FCFA
                    </p>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(tax.status)}`}>
                      {getStatusIcon(tax.status)}
                      <span>
                        {tax.status === 'paid'
                          ? 'Payé'
                          : tax.status === 'overdue'
                          ? 'En retard'
                          : 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Declarations */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Déclarations à venir</h2>
            <button
              onClick={() => navigate('/fiscalites/declarations')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {upcomingDeclarations.map((declaration) => (
              <div
                key={declaration.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{declaration.type}</h3>
                  <p className="text-sm text-gray-500">
                    Échéance: {new Date(declaration.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    declaration.status === 'completed'
                      ? 'text-green-600 bg-green-50'
                      : 'text-yellow-600 bg-yellow-50'
                  }`}>
                    {declaration.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    <span>
                      {declaration.status === 'completed' ? 'Complétée' : 'En attente'}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/fiscalites/declarations/${declaration.id}`)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/fiscalites/rapports')}
          className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Rapports fiscaux</span>
        </button>
        <button
          onClick={() => navigate('/fiscalites/rappels')}
          className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-gray-900">Rappels</span>
        </button>
        <button
          onClick={() => navigate('/fiscalites/conformite')}
          className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-900">Conformité</span>
        </button>
        <button
          onClick={() => navigate('/fiscalites/parametres')}
          className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-blue-500 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Paramètres</span>
        </button>
      </div>
    </div>
  );
} 