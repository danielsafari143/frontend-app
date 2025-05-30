import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Users,
  ArrowRight,
  CheckCircle2,
  FileText,
  BarChart,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';

export default function SubscriptionManagement() {
  const navigate = useNavigate();

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
              <h1 className="text-3xl font-bold text-gray-900">Gestion de l'abonnement</h1>
              <p className="mt-2 text-gray-600">
                Gérez votre abonnement, vos factures et vos utilisateurs
              </p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white rounded-xl border p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Plan Business</h2>
                  <p className="text-gray-600">$95/mois</p>
                </div>
                <button
                  onClick={() => navigate('/subscription/plans')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Changer de plan
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">20 utilisateurs</p>
                    <p className="text-sm text-gray-600">15 utilisés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">50GB stockage</p>
                    <p className="text-sm text-gray-600">25GB utilisés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Prochaine facture</p>
                    <p className="text-sm text-gray-600">15 Mars 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => navigate('/subscription/billing')}
                className="flex items-center justify-between p-6 bg-white rounded-xl border hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Gérer la facturation</h3>
                    <p className="text-sm text-gray-600">Mettre à jour les méthodes de paiement</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/subscription/users')}
                className="flex items-center justify-between p-6 bg-white rounded-xl border hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Gérer les utilisateurs</h3>
                    <p className="text-sm text-gray-600">Inviter et gérer les accès</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Factures récentes</h2>
              </div>
              <div className="divide-y">
                {[1, 2, 3].map((invoice) => (
                  <div key={invoice} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Facture #{invoice}</p>
                      <p className="text-sm text-gray-600">15 Mars 2024</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-900">$95.00</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        Télécharger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 