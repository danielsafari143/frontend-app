import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  X, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Shield,
  Zap,
  Users,
  Clock,
  MessageSquare,
  FileText,
  BarChart2,
  Settings,
  Star
} from 'lucide-react';

interface Plan {
  name: string;
  description: string;
  price: number;
  employeeLimit: number;
  features: string[];
  isRecommended?: boolean;
  popularFeatures?: string[];
  supportLevel?: 'basic' | 'priority' | 'dedicated';
  trialPeriod?: number;
  savings?: number;
}

const plans: Plan[] = [
  {
    name: "Starter",
    description: "Parfait pour les petites entreprises",
    price: 35,
    employeeLimit: 5,
    features: [
      "Facturation illimitée",
      "Gestion des clients",
      "Rapports de base",
      "Support par email",
      "1 utilisateur",
      "Stockage 5GB",
      "Export PDF/Excel",
      "Intégration bancaire basique"
    ],
    popularFeatures: [
      "Facturation illimitée",
      "Gestion des clients",
      "Rapports de base"
    ],
    supportLevel: 'basic',
    trialPeriod: 14
  },
  {
    name: "Business",
    description: "Idéal pour les entreprises en croissance",
    price: 95,
    employeeLimit: 20,
    isRecommended: true,
    features: [
      "Tout le plan Starter",
      "Gestion multi-utilisateurs",
      "Rapports avancés",
      "Support prioritaire",
      "Stockage 50GB",
      "Intégrations avancées",
      "Tableaux de bord personnalisés",
      "API d'accès",
      "Formation d'équipe",
      "Sauvegarde automatique"
    ],
    popularFeatures: [
      "Gestion multi-utilisateurs",
      "Rapports avancés",
      "Support prioritaire"
    ],
    supportLevel: 'priority',
    trialPeriod: 30,
    savings: 20
  },
  {
    name: "Enterprise",
    description: "Solution complète pour grandes entreprises",
    price: 249,
    employeeLimit: 100,
    features: [
      "Tout le plan Business",
      "Utilisateurs illimités",
      "Support dédié 24/7",
      "Stockage illimité",
      "Intégrations personnalisées",
      "SLA garanti",
      "Formation sur site",
      "Audit de sécurité",
      "Conformité OHADA",
      "Développement sur mesure"
    ],
    popularFeatures: [
      "Utilisateurs illimités",
      "Support dédié 24/7",
      "Intégrations personnalisées"
    ],
    supportLevel: 'dedicated',
    trialPeriod: 45,
    savings: 30
  }
];

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState<{ [key: string]: boolean }>({});

  const toggleFeatures = (planName: string) => {
    setShowFeatures(prev => ({
      ...prev,
      [planName]: !prev[planName]
    }));
  };

  const getSupportIcon = (level: 'basic' | 'priority' | 'dedicated') => {
    switch (level) {
      case 'basic':
        return <MessageSquare className="w-5 h-5 text-gray-400" />;
      case 'priority':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'dedicated':
        return <Star className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Plans d'abonnement</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez le plan qui correspond le mieux à vos besoins. Tous les plans incluent une période d'essai gratuit.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annuel
            <span className="ml-1 text-xs text-green-600 font-medium">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-2xl shadow-sm border ${
              plan.isRecommended
                ? 'border-blue-500 shadow-blue-100'
                : 'border-gray-200'
            } overflow-hidden`}
          >
            {plan.isRecommended && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                Recommandé
              </div>
            )}

            {/* Plan Header */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${billingCycle === 'yearly' ? (plan.price * 0.8).toFixed(0) : plan.price}
                </span>
                <span className="text-gray-500">/mois</span>
              </div>
              {billingCycle === 'yearly' && (
                <div className="mt-2 text-sm text-green-600">
                  Économisez ${plan.savings} par mois
                </div>
              )}
            </div>

            {/* Popular Features */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Fonctionnalités populaires</h4>
              <ul className="space-y-3">
                {plan.popularFeatures?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Level */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                {getSupportIcon(plan.supportLevel!)}
                <h4 className="text-sm font-semibold text-gray-900">Support {plan.supportLevel}</h4>
              </div>
              <p className="text-sm text-gray-600">
                {plan.supportLevel === 'basic' && 'Support par email avec réponse sous 24h'}
                {plan.supportLevel === 'priority' && 'Support prioritaire avec réponse sous 4h'}
                {plan.supportLevel === 'dedicated' && 'Support dédié 24/7 avec gestionnaire de compte'}
              </p>
            </div>

            {/* Trial Period */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">
                  {plan.trialPeriod} jours d'essai gratuit
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-6">
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.isRecommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Commencer l'essai gratuit
              </button>
            </div>

            {/* Features Toggle */}
            <div className="border-t border-gray-100">
              <button
                onClick={() => toggleFeatures(plan.name)}
                className="w-full p-4 flex items-center justify-between text-sm text-gray-600 hover:text-gray-900"
              >
                <span>Voir toutes les fonctionnalités</span>
                {showFeatures[plan.name] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {showFeatures[plan.name] && (
                <div className="p-4 bg-gray-50">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Questions fréquentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Puis-je changer de plan à tout moment ?
            </h3>
            <p className="text-gray-600">
              Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prendront effet au début du prochain cycle de facturation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comment fonctionne la période d'essai ?
            </h3>
            <p className="text-gray-600">
              Tous nos plans incluent une période d'essai gratuit. Vous pouvez tester toutes les fonctionnalités sans engagement. Aucune carte de crédit n'est requise.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Qu'en est-il du support client ?
            </h3>
            <p className="text-gray-600">
              Nous offrons différents niveaux de support selon votre plan. Du support par email basique au support dédié 24/7 pour les entreprises.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Puis-je annuler à tout moment ?
            </h3>
            <p className="text-gray-600">
              Oui, vous pouvez annuler votre abonnement à tout moment. Vous conserverez l'accès jusqu'à la fin de votre période de facturation.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Besoin d'une solution personnalisée ?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et obtenir une offre sur mesure.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <MessageSquare className="w-5 h-5" />
          Contactez-nous
        </button>
      </div>
    </div>
  );
} 