import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  ChevronRight,
  CreditCard,
  Users,
  Zap,
  Shield,
  BarChart,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: string[];
  limits: {
    users: number;
    storage: string;
    support: string;
  };
}

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');
  const [isComparisonModalOpen, setIsComparisonModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const plans: Plan[] = [
    {
      id: '1',
      name: 'Starter',
      price: 29,
      billingPeriod: 'monthly',
      description: 'Parfait pour les petites équipes',
      features: [
        "Jusqu'à 5 utilisateurs",
        '10GB de stockage',
        'Support par email',
        'Fonctionnalités de base',
        'Mises à jour régulières',
      ],
      limits: {
        users: 5,
        storage: '10GB',
        support: 'Email',
      },
    },
    {
      id: '2',
      name: 'Business',
      price: 79,
      billingPeriod: 'monthly',
      description: 'Idéal pour les entreprises en croissance',
      features: [
        "Jusqu'à 20 utilisateurs",
        '50GB de stockage',
        'Support prioritaire',
        'Toutes les fonctionnalités',
        'API personnalisée',
        'Intégrations avancées',
      ],
      limits: {
        users: 20,
        storage: '50GB',
        support: 'Prioritaire',
      },
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 199,
      billingPeriod: 'monthly',
      description: 'Solution complète pour les grandes entreprises',
      features: [
        'Utilisateurs illimités',
        'Stockage illimité',
        'Support 24/7',
        'Toutes les fonctionnalités',
        'API personnalisée',
        'Intégrations avancées',
        'SLA garanti',
        'Formation dédiée',
      ],
      limits: {
        users: -1,
        storage: 'Illimité',
        support: '24/7',
      },
    },
  ];

  const calculateYearlyPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.8); // 20% discount for yearly billing
  };

  const handleStartTrial = async () => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to start the trial
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      navigate('/subscription/new?trial=true');
    } catch (error) {
      console.error('Failed to start trial:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="md:col-span-1">
            <SubscriptionNav />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Plans d'abonnement</h1>
              <p className="mt-2 text-gray-600">
                Choisissez le plan qui correspond le mieux à vos besoins
              </p>
            </div>

            {/* Free Trial Banner */}
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Essayez gratuitement pendant 14 jours</h2>
                  <p className="mt-1 text-blue-100">
                    Aucune carte de crédit requise. Annulez à tout moment.
                  </p>
                </div>
                <button
                  onClick={handleStartTrial}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  {isProcessing ? 'Chargement...' : 'Commencer l\'essai gratuit'}
                </button>
              </div>
            </div>

            {/* Billing Period Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-lg p-1 flex items-center gap-2">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingPeriod === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingPeriod === 'yearly'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annuel
                  <span className="ml-1 text-xs text-green-500">-20%</span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-xl border p-6 flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-gray-600">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${billingPeriod === 'yearly' ? calculateYearlyPrice(plan.price) : plan.price}
                      </span>
                      <span className="text-gray-600">/mois</span>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => navigate('/subscription/billing')}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Choisir ce plan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Puis-je changer de plan à tout moment ?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Oui, vous pouvez changer de plan à tout moment. Le changement sera effectif
                    immédiatement et le montant sera ajusté au prorata.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Y a-t-il un engagement de durée ?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Non, il n'y a pas d'engagement de durée. Vous pouvez annuler votre abonnement
                    à tout moment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Comment fonctionne la facturation ?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    La facturation est effectuée automatiquement à la date d'anniversaire de votre
                    abonnement. Vous pouvez choisir entre paiement mensuel ou annuel.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Y a-t-il une période d'essai ?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Oui, nous offrons une période d'essai de 14 jours pour tous nos plans. Vous
                    pouvez annuler à tout moment pendant cette période.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <Modal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        title="Comparaison des plans"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1"></div>
            {plans.map((plan) => (
              <div key={plan.id} className="text-center">
                <h3 className="font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Utilisateurs</span>
                </div>
              </div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center">
                  <span className="text-sm text-gray-600">
                    {plan.limits.users === -1 ? 'Illimité' : `Jusqu'à ${plan.limits.users}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Stockage</span>
                </div>
              </div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center">
                  <span className="text-sm text-gray-600">{plan.limits.storage}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Support</span>
                </div>
              </div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center">
                  <span className="text-sm text-gray-600">{plan.limits.support}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="col-span-1">
                <div className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Fonctionnalités</span>
                </div>
              </div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center">
                  <span className="text-sm text-gray-600">
                    {plan.features.length} fonctionnalités
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
} 