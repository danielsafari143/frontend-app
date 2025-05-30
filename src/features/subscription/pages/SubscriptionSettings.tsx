import React from 'react';
import {
  Bell,
  Shield,
  CreditCard,
  Settings,
  AlertCircle,
  Check,
  X,
  Lock,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SubscriptionSettings() {
  const [notifications, setNotifications] = React.useState<NotificationSetting[]>([
    {
      id: 'invoices',
      title: 'Factures',
      description: 'Recevoir des notifications pour les nouvelles factures',
      enabled: true,
    },
    {
      id: 'updates',
      title: 'Mises à jour',
      description: 'Être informé des nouvelles fonctionnalités et mises à jour',
      enabled: true,
    },
    {
      id: 'security',
      title: 'Sécurité',
      description: 'Recevoir des alertes de sécurité importantes',
      enabled: true,
    },
    {
      id: 'usage',
      title: 'Alertes d\'utilisation',
      description: 'Être notifié lorsque vous approchez des limites d\'utilisation',
      enabled: false,
    },
  ]);

  // Modal states
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = React.useState(false);
  const [isSessionsModalOpen, setIsSessionsModalOpen] = React.useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = React.useState(false);
  const [isBillingDateModalOpen, setIsBillingDateModalOpen] = React.useState(false);

  // Form states
  const [selectedCurrency, setSelectedCurrency] = React.useState('EUR');
  const [billingDate, setBillingDate] = React.useState('15');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleToggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const handleUpdateCurrency = async () => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to update the currency
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsCurrencyModalOpen(false);
    } catch (error) {
      console.error('Failed to update currency:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateBillingDate = async () => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to update the billing date
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsBillingDateModalOpen(false);
    } catch (error) {
      console.error('Failed to update billing date:', error);
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
              <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
              <p className="mt-2 text-gray-600">
                Gérez vos préférences de notification et vos paramètres de sécurité
              </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
              {/* Notifications */}
              <div className="bg-white rounded-xl border">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <p className="text-sm text-gray-500">{notification.description}</p>
                        </div>
                        <button
                          onClick={() => handleToggleNotification(notification.id)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            notification.enabled ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              notification.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-xl border">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Authentification à deux facteurs</h3>
                        <p className="text-sm text-gray-500">
                          Ajoutez une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <button
                        onClick={() => setIsTwoFactorModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Configurer
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Sessions actives</h3>
                        <p className="text-sm text-gray-500">
                          Gérez les appareils connectés à votre compte
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSessionsModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Voir les sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className="bg-white rounded-xl border">
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Facturation</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Devise</h3>
                        <p className="text-sm text-gray-500">
                          Choisissez la devise pour vos factures
                        </p>
                      </div>
                      <button
                        onClick={() => setIsCurrencyModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Modifier
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Date de facturation</h3>
                        <p className="text-sm text-gray-500">
                          Choisissez le jour du mois pour vos factures
                        </p>
                      </div>
                      <button
                        onClick={() => setIsBillingDateModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      <Modal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        title="Authentification à deux facteurs"
        size="sm"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Shield className="w-5 h-5" />
            <p className="text-sm">Sécurisez votre compte</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte. Voici comment l'activer :
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Téléchargez une application d'authentification (Google Authenticator, Authy, etc.)</li>
              <li>Scannez le code QR qui s'affichera</li>
              <li>Entrez le code généré par l'application</li>
            </ol>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsTwoFactorModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                // Here you would typically handle 2FA setup
                setIsTwoFactorModalOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Commencer la configuration
            </button>
          </div>
        </div>
      </Modal>

      {/* Active Sessions Modal */}
      <Modal
        isOpen={isSessionsModalOpen}
        onClose={() => setIsSessionsModalOpen(false)}
        title="Sessions actives"
        size="sm"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Session actuelle</div>
                  <div className="text-sm text-gray-500">Windows • Chrome • Paris, France</div>
                </div>
                <div className="text-sm text-green-600">Active</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">iPhone 12</div>
                  <div className="text-sm text-gray-500">iOS • Safari • Paris, France</div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">Déconnecter</button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsSessionsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>

      {/* Currency Modal */}
      <Modal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        title="Changer la devise"
        size="sm"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Devise
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsCurrencyModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleUpdateCurrency}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Billing Date Modal */}
      <Modal
        isOpen={isBillingDateModalOpen}
        onClose={() => setIsBillingDateModalOpen(false)}
        title="Changer la date de facturation"
        size="sm"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="billingDate" className="block text-sm font-medium text-gray-700">
              Jour du mois
            </label>
            <select
              id="billingDate"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString()}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsBillingDateModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleUpdateBillingDate}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 