import React from 'react';
import {
  CreditCard,
  AlertCircle,
  Check,
  X,
  Download,
  Calendar,
  DollarSign,
  RefreshCw,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface SubscriptionEvent {
  id: string;
  date: string;
  type: 'payment' | 'plan_change' | 'refund' | 'trial';
  description: string;
  amount?: number;
  status: 'success' | 'pending' | 'failed';
}

export default function SubscriptionHistory() {
  const [events, setEvents] = React.useState<SubscriptionEvent[]>([
    {
      id: '1',
      date: '2024-03-15',
      type: 'payment',
      description: 'Facture mensuelle - Plan Business',
      amount: 79,
      status: 'success',
    },
    {
      id: '2',
      date: '2024-02-15',
      type: 'payment',
      description: 'Facture mensuelle - Plan Business',
      amount: 79,
      status: 'success',
    },
    {
      id: '3',
      date: '2024-01-15',
      type: 'plan_change',
      description: 'Passage au Plan Business',
      status: 'success',
    },
    {
      id: '4',
      date: '2024-01-01',
      type: 'payment',
      description: 'Facture mensuelle - Plan Starter',
      amount: 29,
      status: 'success',
    },
    {
      id: '5',
      date: '2023-12-15',
      type: 'payment',
      description: 'Facture mensuelle - Plan Starter',
      amount: 29,
      status: 'success',
    },
    {
      id: '6',
      date: '2023-12-01',
      type: 'trial',
      description: 'Début de la période d\'essai',
      status: 'success',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = React.useState<SubscriptionEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const getEventIcon = (type: SubscriptionEvent['type']) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5" />;
      case 'plan_change':
        return <RefreshCw className="w-5 h-5" />;
      case 'refund':
        return <DollarSign className="w-5 h-5" />;
      case 'trial':
        return <Calendar className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: SubscriptionEvent['type']) => {
    switch (type) {
      case 'payment':
        return 'text-blue-600';
      case 'plan_change':
        return 'text-purple-600';
      case 'refund':
        return 'text-green-600';
      case 'trial':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: SubscriptionEvent['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDownloadInvoice = async (eventId: string) => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to download the invoice
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Downloading invoice for event:', eventId);
    } catch (error) {
      console.error('Failed to download invoice:', error);
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
              <h1 className="text-3xl font-bold text-gray-900">Historique</h1>
              <p className="mt-2 text-gray-600">
                Consultez l'historique de votre abonnement et vos factures
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Dépenses totales</h3>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">$235</p>
                <p className="text-sm text-gray-500">Depuis le début de l'abonnement</p>
              </div>
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Changements de plan</h3>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-500">Au cours des 6 derniers mois</p>
              </div>
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Taux de succès</h3>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Paiements réussis</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Historique des événements</h2>
              </div>
              <div className="divide-y">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEventModalOpen(true);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${getEventColor(event.type)} bg-opacity-10`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{event.description}</h3>
                          <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        {event.amount && (
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${event.amount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Détails de l'événement"
        size="sm"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${getEventColor(
                  selectedEvent.type
                )} bg-opacity-10`}
              >
                {getEventIcon(selectedEvent.type)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedEvent.description}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Type</div>
                <div className="text-sm font-medium text-gray-900">
                  {selectedEvent.type === 'payment'
                    ? 'Paiement'
                    : selectedEvent.type === 'plan_change'
                    ? 'Changement de plan'
                    : selectedEvent.type === 'refund'
                    ? 'Remboursement'
                    : 'Période d\'essai'}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Statut</div>
                <div className={`text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status === 'success'
                    ? 'Succès'
                    : selectedEvent.status === 'pending'
                    ? 'En attente'
                    : 'Échec'}
                </div>
              </div>

              {selectedEvent.amount && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Montant</div>
                  <div className="text-sm font-medium text-gray-900">${selectedEvent.amount}</div>
                </div>
              )}
            </div>

            {selectedEvent.type === 'payment' && (
              <div className="mt-6">
                <button
                  onClick={() => handleDownloadInvoice(selectedEvent.id)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {isProcessing ? 'Téléchargement...' : 'Télécharger la facture'}
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
} 