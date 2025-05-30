import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Plus,
  Trash2,
  Download,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function BillingManagement() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
    },
  ]);

  const [billingHistory] = React.useState([
    {
      id: '1',
      date: '2024-03-01',
      amount: 95,
      status: 'paid',
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 95,
      status: 'paid',
    },
  ]);

  // Modal states
  const [isAddCardModalOpen, setIsAddCardModalOpen] = React.useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<PaymentMethod | null>(null);
  const [isDownloadInvoiceModalOpen, setIsDownloadInvoiceModalOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null);

  // Form states
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the card
    const newCard: PaymentMethod = {
      id: String(paymentMethods.length + 1),
      type: 'card',
      last4: cardNumber.slice(-4),
      expiry: expiryDate,
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods([...paymentMethods, newCard]);
    setIsAddCardModalOpen(false);
    // Reset form
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
  };

  const handleDeleteCard = () => {
    if (selectedCard) {
      setPaymentMethods(paymentMethods.filter(card => card.id !== selectedCard.id));
      setIsDeleteCardModalOpen(false);
      setSelectedCard(null);
    }
  };

  const handleDownloadInvoice = () => {
    // Here you would typically make an API call to download the invoice
    console.log('Downloading invoice:', selectedInvoice);
    setIsDownloadInvoiceModalOpen(false);
    setSelectedInvoice(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion de la facturation</h1>
              <p className="mt-2 text-gray-600">
                Gérez vos méthodes de paiement et consultez l'historique des factures
              </p>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl border mb-8">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Méthodes de paiement</h2>
                  <button
                    onClick={() => setIsAddCardModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter une carte
                  </button>
                </div>
              </div>
              <div className="divide-y">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Carte se terminant par {method.last4}
                        </p>
                        <p className="text-sm text-gray-600">Expire le {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Par défaut
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCard(method);
                          setIsDeleteCardModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl border mb-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Historique des factures</h2>
              </div>
              <div className="divide-y">
                {billingHistory.map((invoice) => (
                  <div key={invoice.id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Facture #{invoice.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-900">${invoice.amount}</span>
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsDownloadInvoiceModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Settings */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Paramètres de facturation</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Facturation automatique</h3>
                    <p className="text-sm text-gray-600">
                      Renouvellement automatique de l'abonnement
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="sr-only">Activer la facturation automatique</span>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Notifications par email</h3>
                    <p className="text-sm text-gray-600">
                      Recevoir les factures par email
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="sr-only">Activer les notifications</span>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <Modal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        title="Ajouter une carte"
      >
        <form onSubmit={handleAddCard} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Numéro de carte
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              required
            />
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
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
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
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="123"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddCardModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Ajouter la carte
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Card Modal */}
      <Modal
        isOpen={isDeleteCardModalOpen}
        onClose={() => setIsDeleteCardModalOpen(false)}
        title="Supprimer la carte"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              Êtes-vous sûr de vouloir supprimer la carte se terminant par {selectedCard?.last4} ?
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteCardModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleDeleteCard}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>

      {/* Download Invoice Modal */}
      <Modal
        isOpen={isDownloadInvoiceModalOpen}
        onClose={() => setIsDownloadInvoiceModalOpen(false)}
        title="Télécharger la facture"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Voulez-vous télécharger la facture #{selectedInvoice?.id} du{' '}
            {selectedInvoice?.date && new Date(selectedInvoice.date).toLocaleDateString()} ?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsDownloadInvoiceModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Télécharger
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 