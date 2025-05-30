import React from 'react';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import BackButton from '../../../components/BackButton';

export default function TaxCompliance() {
  // This would typically come from an API call
  const complianceItems = [
    {
      id: 1,
      title: 'Déclaration TVA',
      status: 'compliant',
      dueDate: '2024-04-30',
      description: 'Déclaration trimestrielle de la TVA',
      requirements: [
        'Factures d\'achat et de vente',
        'Registre des achats et ventes',
        'État récapitulatif des opérations',
      ],
    },
    {
      id: 2,
      title: 'Déclaration fiscale annuelle',
      status: 'pending',
      dueDate: '2024-05-15',
      description: 'Déclaration fiscale pour l\'exercice 2023',
      requirements: [
        'Bilan comptable',
        'Compte de résultat',
        'Annexes comptables',
      ],
    },
    {
      id: 3,
      title: 'Cotisations sociales',
      status: 'non_compliant',
      dueDate: '2024-03-31',
      description: 'Paiement des cotisations sociales',
      requirements: [
        'État des salaires',
        'Bordereau de cotisations',
        'Justificatifs de paiement',
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50';
      case 'non_compliant':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'non_compliant':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <BackButton to="/fiscalites" label="Retour au tableau de bord" />

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conformité fiscale</h1>
            <p className="mt-2 text-gray-600">
              Suivez vos obligations fiscales et votre conformité
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Conforme</h3>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">En attente</h3>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Non conforme</h3>
              <p className="text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance List */}
      <div className="space-y-4">
        {complianceItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border p-6 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Échéance: {new Date(item.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span>
                        {item.status === 'compliant'
                          ? 'Conforme'
                          : item.status === 'non_compliant'
                          ? 'Non conforme'
                          : 'En attente'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Documents requis:</h4>
                    <ul className="space-y-1">
                      {item.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 