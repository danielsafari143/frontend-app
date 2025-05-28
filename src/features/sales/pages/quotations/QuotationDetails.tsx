import React, { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Printer,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Edit,
  Trash2,
  Mail,
  MessageCircle,
  X,
} from 'lucide-react';
import SendQuotationModal from '../../components/SendQuotationModal';
import { generateQuotationPDF } from '../../components/GenerateQuotationPDF';

interface QuotationDetails {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  currency: string;
  subtotal: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string[];
  charges: { description: string; amount: number }[];
  items: {
    id: string;
    productId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxRate: number;
    total: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockQuotation: QuotationDetails = {
  id: 'Q2024-001',
  quoteNumber: 'Q2024-001',
  customerId: 'C001',
  customerName: 'Entreprise ABC SARL',
  status: 'sent',
  currency: 'USD',
  subtotal: 3750,
  discount: 132,
  taxRate: 16,
  taxAmount: 578.88,
  total: 4196.88,
  notes: 'Livraison incluse dans un délai de 5 jours ouvrables.\nInstallation et configuration disponibles sur demande.',
  terms: [
    'Paiement à 30 jours',
    'Garantie 12 mois sur tous les produits',
    'Prix hors taxes',
    'Validité du devis: 30 jours',
    'Les prix sont susceptibles de changer sans préavis',
  ],
  charges: [
    { description: 'Frais de livraison', amount: 50 },
    { description: 'Installation', amount: 100 },
  ],
  items: [
    {
      id: '1',
      productId: 'P001',
      description: 'Ordinateur Portable Pro',
      quantity: 2,
      unitPrice: 1200,
      discount: 5,
      taxRate: 16,
      total: 2392.32,
    },
    {
      id: '2',
      productId: 'P002',
      description: 'Écran 27" 4K',
      quantity: 3,
      unitPrice: 450,
      discount: 0,
      taxRate: 16,
      total: 1566,
    },
    {
      id: '3',
      productId: 'P003',
      description: 'Clavier Mécanique',
      quantity: 2,
      unitPrice: 120,
      discount: 10,
      taxRate: 16,
      total: 224.64,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function QuotationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: QuotationDetails['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: QuotationDetails['status']) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'sent':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handlePrint = () => {
    navigate(`/quotations/${id}/print`);
  };

  const handleDownload = async () => {
    try {
      // Show loading state
      const downloadButton = document.querySelector('[data-download-button]');
      if (downloadButton) {
        downloadButton.setAttribute('disabled', 'true');
        downloadButton.innerHTML = 'Génération du PDF...';
      }

      await generateQuotationPDF({
        contentRef,
        quoteNumber: mockQuotation.quoteNumber,
        onStart: () => {
          // Button is already updated above
        },
        onComplete: () => {
          // Reset button state
          if (downloadButton) {
            downloadButton.removeAttribute('disabled');
            downloadButton.innerHTML = '<svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Télécharger';
          }
        },
        onError: (error) => {
          console.error('Error generating PDF:', error);
          alert('Une erreur est survenue lors de la génération du PDF.');
          // Reset button state
          if (downloadButton) {
            downloadButton.removeAttribute('disabled');
            downloadButton.innerHTML = '<svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Télécharger';
          }
        }
      });
    } catch (error) {
      console.error('Error in handleDownload:', error);
      alert('Une erreur est survenue lors de la génération du PDF.');
    }
  };

  const handleSend = () => {
    setShowSendModal(true);
  };

  const handleSendViaEmail = (email: string, message: string) => {
    const subject = `Devis #${mockQuotation.quoteNumber}`;
    const body = `Bonjour,\n\nVeuillez trouver ci-joint le devis #${mockQuotation.quoteNumber}.\n\nCordialement,\nCOMPTA PRO SARL${message ? `\n\nMessage personnalisé:\n${message}` : ''}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowSendModal(false);
  };

  const handleSendViaWhatsApp = useCallback(async (phone: string, message: string) => {
    try {
      setIsGeneratingPDF(true);
      
      // Generate PDF using the shared component
      await generateQuotationPDF({
        contentRef,
        quoteNumber: mockQuotation.quoteNumber,
        onError: (error) => {
          throw error; // Propagate error to be caught by the outer try-catch
        }
      });

      // Create the message text
      const text = `Bonjour,\n\nVeuillez trouver ci-joint le devis #${mockQuotation.quoteNumber}.\n\nCordialement,\nCOMPTA PRO SARL${message ? `\n\nMessage personnalisé:\n${message}` : ''}`;

      // Open WhatsApp after PDF is generated
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      setShowSendModal(false);

    } catch (error) {
      console.error('Error sending via WhatsApp:', error);
      alert('Une erreur est survenue lors de l\'envoi du devis');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6" ref={contentRef}>
          {/* Header with Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/quotations')}
              className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Printer className="h-5 w-5 mr-2" />
                Imprimer
              </button>
              <button
                onClick={handleDownload}
                data-download-button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-5 w-5 mr-2" />
                Télécharger
              </button>
              <button
                onClick={handleSend}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Envoyer
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="flex justify-between items-start">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Devis #{mockQuotation.quoteNumber}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Créé le {new Date(mockQuotation.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Votre Entreprise</h2>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">COMPTA PRO SARL</p>
                    <p>123 Avenue de l'Innovation</p>
                    <p>75001 Paris, France</p>
                    <p className="mt-2">Tél: +33 1 23 45 67 89</p>
                    <p>Email: contact@comptapro.fr</p>
                    <p>SIRET: 123 456 789 00012</p>
                    <p>TVA: FR 12 345678901</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                      mockQuotation.status
                    )}`}
                  >
                    {getStatusIcon(mockQuotation.status)}
                    <span className="ml-2">
                      {mockQuotation.status.charAt(0).toUpperCase() + mockQuotation.status.slice(1)}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p className="font-medium">Validité du devis</p>
                  <p>30 jours à compter de la date d'émission</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white shadow-sm rounded-lg p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations Client</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Nom du client</p>
                <p className="text-sm text-gray-900">{mockQuotation.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Devise</p>
                <p className="text-sm text-gray-900">{mockQuotation.currency}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white shadow-sm rounded-lg p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Articles</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix unitaire
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remise
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TVA
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockQuotation.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.unitPrice.toFixed(2)} {mockQuotation.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.discount}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.taxRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.total.toFixed(2)} {mockQuotation.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">
                    {mockQuotation.subtotal.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remises</span>
                  <span className="font-medium text-red-600">
                    -{mockQuotation.discount.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVA</span>
                  <span className="font-medium">
                    {mockQuotation.taxAmount.toFixed(2)} {mockQuotation.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais divers</span>
                  <span className="font-medium">
                    {mockQuotation.charges.reduce((sum, charge) => sum + charge.amount, 0).toFixed(2)}{' '}
                    {mockQuotation.currency}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-blue-600">
                      {mockQuotation.total.toFixed(2)} {mockQuotation.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{mockQuotation.notes}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {mockQuotation.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      <SendQuotationModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onSendViaEmail={handleSendViaEmail}
        onSendViaWhatsApp={handleSendViaWhatsApp}
        isGeneratingPDF={isGeneratingPDF}
        quoteNumber={mockQuotation.quoteNumber}
      />
    </div>
  );
} 