import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Users,
  HardDrive,
  MessageSquare,
  Zap,
  Shield,
  FileText,
  BarChart,
  Code,
  Clock,
} from 'lucide-react';

interface Feature {
  category: string;
  name: string;
  description: string;
  starter: boolean;
  business: boolean;
  enterprise: boolean;
}

export default function PlanComparison() {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      category: 'Utilisateurs',
      name: 'Gestion des utilisateurs',
      description: 'Nombre d\'utilisateurs pouvant accéder à la plateforme',
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      category: 'Utilisateurs',
      name: 'Rôles personnalisés',
      description: 'Créer des rôles personnalisés avec des permissions spécifiques',
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      category: 'Stockage',
      name: 'Espace de stockage',
      description: 'Espace disponible pour les fichiers et documents',
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      category: 'Stockage',
      name: 'Stockage illimité',
      description: 'Accès à un stockage illimité',
      starter: false,
      business: false,
      enterprise: true,
    },
    {
      category: 'Support',
      name: 'Support par email',
      description: 'Support technique par email',
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      category: 'Support',
      name: 'Support prioritaire',
      description: 'Temps de réponse garanti',
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      category: 'Support',
      name: 'Support 24/7',
      description: 'Support disponible 24h/24 et 7j/7',
      starter: false,
      business: false,
      enterprise: true,
    },
    {
      category: 'Fonctionnalités',
      name: 'Rapports standard',
      description: 'Accès aux rapports de base',
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      category: 'Fonctionnalités',
      name: 'Rapports avancés',
      description: 'Rapports détaillés et analyses approfondies',
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      category: 'Fonctionnalités',
      name: 'Rapports personnalisés',
      description: 'Création de rapports sur mesure',
      starter: false,
      business: false,
      enterprise: true,
    },
    {
      category: 'Intégrations',
      name: 'Intégrations de base',
      description: 'Connexion avec les services populaires',
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      category: 'Intégrations',
      name: 'API avancée',
      description: 'Accès à l\'API complète',
      starter: false,
      business: false,
      enterprise: true,
    },
  ];

  const getFeatureIcon = (included: boolean) => {
    return included ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-gray-300" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Comparaison des plans</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comparez les fonctionnalités de chaque plan pour trouver celui qui vous convient
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="grid grid-cols-4 border-b">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">Fonctionnalités</h3>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
              <p className="text-sm text-gray-600">$29/mois</p>
            </div>
            <div className="p-6 text-center bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900">Business</h3>
              <p className="text-sm text-gray-600">$95/mois</p>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
              <p className="text-sm text-gray-600">$299/mois</p>
            </div>
          </div>

          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-4 border-b last:border-b-0">
              <div className="p-6">
                <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                <div className="text-sm text-gray-500">{feature.description}</div>
              </div>
              <div className="p-6 flex items-center justify-center">
                {getFeatureIcon(feature.starter)}
              </div>
              <div className="p-6 flex items-center justify-center bg-blue-50">
                {getFeatureIcon(feature.business)}
              </div>
              <div className="p-6 flex items-center justify-center">
                {getFeatureIcon(feature.enterprise)}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/subscription/plans')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voir les plans
          </button>
          <button
            onClick={() => navigate('/subscription/billing')}
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200"
          >
            Gérer la facturation
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Utilisateurs</h3>
            </div>
            <p className="text-gray-600">
              Chaque plan inclut un nombre différent d'utilisateurs. Vous pouvez toujours mettre à niveau pour accéder à plus d'utilisateurs.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Stockage</h3>
            </div>
            <p className="text-gray-600">
              L'espace de stockage varie selon le plan. Le plan Enterprise offre un stockage illimité pour tous vos besoins.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            </div>
            <p className="text-gray-600">
              Le niveau de support augmente avec chaque plan. Le plan Enterprise inclut un support 24/7 avec un temps de réponse garanti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 