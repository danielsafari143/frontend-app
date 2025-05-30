import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CreditCard,
  Check,
  AlertCircle,
  Lock,
  Shield,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Modal from '../components/Modal';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: string[];
}

export default function NewSubscription() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTrial = searchParams.get('trial') === 'true';
  
  const [currentStep, setCurrentStep] = React.useState<'plan' | 'payment' | 'confirmation'>('plan');
  const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // Payment form states
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      billingPeriod: 'monthly',
      description: 'Parfait pour les petites équipes',
      features: [
        'Jusqu\'à 5 utilisateurs',
        '10GB de stockage',
        'Support par email',
        'Fonctionnalités de base',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: 79,
      billingPeriod: 'monthly',
      description: 'Idéal pour les entreprises en croissance',
      features: [
        'Jusqu\'à 20 utilisateurs',
        '50GB de stockage',
        'Support prioritaire',
        'Toutes les fonctionnalités',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      billingPeriod: 'monthly',
      description: 'Pour les grandes organisations',
      features: [
        'Utilisateurs illimités',
        'Stockage illimité',
        'Support 24/7',
        'Fonctionnalités avancées',
      ],
    },
  ];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    if (isTrial) {
      setCurrentStep('confirmation');
    } else {
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Here you would typically make an API call to process the payment
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Failed to process payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.8); // 20% discount for yearly billing
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'plan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Choisir un plan</div>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-gray-200">
              <div
                className={`h-full bg-blue-600 transition-all duration-300 ${
                  currentStep !== 'plan' ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            {!isTrial && (
              <>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === 'payment'
                        ? 'bg-blue-600 text-white'
                        : currentStep === 'confirmation'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    2
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-900">Paiement</div>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                  <div
                    className={`h-full bg-blue-600 transition-all duration-300 ${
                      currentStep === 'confirmation' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </>
            )}
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'confirmation'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isTrial ? 2 : 3}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">Confirmation</div>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        {currentStep === 'plan' && (
          <div className="bg-white rounded-xl border p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choisissez votre plan</h2>
              <p className="mt-2 text-gray-600">
                Sélectionnez le plan qui correspond le mieux à vos besoins
              </p>
            </div>

            {/* Billing Period Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingPeriod === 'yearly'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Annuel
                  <span className="ml-1 text-xs text-green-600">-20%</span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-sm border ${
                    plan.id === 'business'
                      ? 'border-blue-500 shadow-blue-100'
                      : 'border-gray-200'
                  } overflow-hidden`}
                >
                  {plan.id === 'business' && (
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
                        ${billingPeriod === 'yearly' ? getYearlyPrice(plan.price) : plan.price}
                      </span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <div className="mt-2 text-sm text-green-600">
                        Économisez ${Math.round(plan.price * 0.2)} par mois
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-6 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Fonctionnalités incluses</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="p-6">
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        plan.id === 'business'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Choisir ce plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Form */}
        {currentStep === 'payment' && selectedPlan && (
          <div className="bg-white rounded-xl border p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Paiement</h2>
              <p className="mt-2 text-gray-600">
                Complétez vos informations de paiement pour continuer
              </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{selectedPlan.name}</h3>
                  <p className="text-sm text-gray-500">
                    {billingPeriod === 'yearly' ? 'Facturation annuelle' : 'Facturation mensuelle'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    ${billingPeriod === 'yearly' ? getYearlyPrice(selectedPlan.price) : selectedPlan.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    /{billingPeriod === 'yearly' ? 'an' : 'mois'}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Numéro de carte
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                  Nom sur la carte
                </label>
                <input
                  type="text"
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Vos informations de paiement sont sécurisées et cryptées</span>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep('plan')}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Traitement...' : 'Payer maintenant'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation */}
        {currentStep === 'confirmation' && (
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {isTrial ? (
                <Sparkles className="w-8 h-8 text-blue-600" />
              ) : (
                <Check className="w-8 h-8 text-green-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isTrial ? 'Période d\'essai démarrée !' : 'Abonnement confirmé !'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isTrial
                ? 'Votre période d\'essai de 14 jours a commencé. Profitez de toutes les fonctionnalités gratuitement.'
                : 'Merci pour votre abonnement. Vous pouvez maintenant accéder à toutes les fonctionnalités.'}
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/subscription')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Accéder à mon compte
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Security Modal */}
      <Modal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        title="Sécurité du paiement"
        size="sm"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Shield className="w-5 h-5" />
            <p className="text-sm">Vos paiements sont sécurisés</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Nous utilisons les dernières technologies de cryptage pour protéger vos informations :
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Cryptage SSL/TLS</li>
              <li>Conformité PCI DSS</li>
              <li>Protection contre la fraude</li>
            </ul>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsSecurityModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 