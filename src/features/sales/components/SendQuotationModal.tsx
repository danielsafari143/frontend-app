import React, { useState } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';

interface SendQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendViaEmail: (email: string, message: string) => void;
  onSendViaWhatsApp: (phone: string, message: string) => void;
  isGeneratingPDF: boolean;
  quoteNumber: string;
}

export default function SendQuotationModal({
  isOpen,
  onClose,
  onSendViaEmail,
  onSendViaWhatsApp,
  isGeneratingPDF,
  quoteNumber,
}: SendQuotationModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Envoyer le devis</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md ${
                  selectedMethod === 'email'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Mail className="h-5 w-5" />
                Email
              </button>
              <button
                onClick={() => setSelectedMethod('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-md ${
                  selectedMethod === 'whatsapp'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </button>
            </div>

            {selectedMethod === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optionnel)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ajoutez un message personnalisé..."
                  />
                </div>
                <button
                  onClick={() => onSendViaEmail(email, message)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Envoyer par email
                </button>
              </div>
            )}

            {selectedMethod === 'whatsapp' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="+243 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (optionnel)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Ajoutez un message personnalisé..."
                  />
                </div>
                <button
                  onClick={() => onSendViaWhatsApp(phone, message)}
                  disabled={isGeneratingPDF}
                  className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isGeneratingPDF ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Génération du PDF...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Envoyer par WhatsApp
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 