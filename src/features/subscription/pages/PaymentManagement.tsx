import React from 'react';
import {
  CreditCard,
  Plus,
  Trash2,
  AlertCircle,
  Check,
  X,
  Lock,
  Shield,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export default function PaymentManagement() {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 6,
      expiryYear: 2024,
      isDefault: false,
    },
  ]);

  const [invoices, setInvoices] = React.useState<Invoice[]>([
    {
      id: '1',
      date: '2024-03-15',
      amount: 79,
      status: 'paid',
      description: 'Facture mensuelle - Plan Business',
    },
    {
      id: '2',
      date: '2024-02-15',
      amount: 79,
      status: 'paid',
      description: 'Facture mensuelle - Plan Business',
    },
    {
      id: '3',
      date: '2024-01-15',
      amount: 29,
      status: 'paid',
      description: 'Facture mensuelle - Plan Starter',
    },
  ]);

  // Modal states
  const [isAddCardModalOpen, setIsAddCardModalOpen] = React.useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = React.useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<PaymentMethod | null>(null);

  // Form states
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

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

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Here you would typically make an API call to add the card
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      const newCard: PaymentMethod = {
        id: String(paymentMethods.length + 1),
        type: 'card',
        last4: cardNumber.slice(-4),
        brand: 'Visa', // This would be determined by the card number
        expiryMonth: parseInt(expiryDate.split('/')[0]),
        expiryYear: 2000 + parseInt(expiryDate.split('/')[1]),
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([...paymentMethods, newCard]);
      setIsAddCardModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to add card:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCard = async () => {
    if (selectedCard) {
      setIsProcessing(true);
      try {
        // Here you would typically make an API call to delete the card
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setPaymentMethods(paymentMethods.filter((card) => card.id !== selectedCard.id));
        setIsDeleteCardModalOpen(false);
        setSelectedCard(null);
      } catch (error) {
        console.error('Failed to delete card:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSetDefault = async (cardId: string) => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to set the default card
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setPaymentMethods(
        paymentMethods.map((card) => ({
          ...card,
          isDefault: card.id === cardId,
        }))
      );
    } catch (error) {
      console.error('Failed to set default card:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des paiements</h1>
              <p className="mt-2 text-gray-600">
                Gérez vos méthodes de paiement et consultez vos factures
              </p>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl border mb-8">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Méthodes de paiement
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsAddCardModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter une carte
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {paymentMethods.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {card.brand} •••• {card.last4}
                            </span>
                            {card.isDefault && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                Par défaut
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Expire {card.expiryMonth}/{card.expiryYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!card.isDefault && (
                          <button
                            onClick={() => handleSetDefault(card.id)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            Définir par défaut
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedCard(card);
                            setIsDeleteCardModalOpen(true);
                          }}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Factures récentes</h2>
              </div>
              <div className="divide-y">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {invoice.description}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(invoice.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${invoice.amount}
                          </div>
                          <div
                            className={`text-xs font-medium ${
                              invoice.status === 'paid'
                                ? 'text-green-600'
                                : invoice.status === 'pending'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {invoice.status}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Here you would typically handle the invoice download
                            console.log('Downloading invoice:', invoice.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <CreditCard className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
        size="sm"
      >
        <form onSubmit={handleAddCard} className="space-y-6">
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
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Ajout en cours...' : 'Ajouter la carte'}
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
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              Êtes-vous sûr de vouloir supprimer cette carte de paiement ?
            </p>
          </div>
          {selectedCard && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {selectedCard.brand} •••• {selectedCard.last4}
                  </div>
                  <div className="text-sm text-gray-500">
                    Expire {selectedCard.expiryMonth}/{selectedCard.expiryYear}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteCardModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleDeleteCard}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      </Modal>

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