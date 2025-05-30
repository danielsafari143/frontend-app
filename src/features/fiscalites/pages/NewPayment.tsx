import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Calendar,
  CreditCard,
  Building2,
  Upload,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface PaymentForm {
  declarationId: string;
  type: string;
  amount: number;
  date: string;
  paymentMethod: string;
  reference: string;
  description: string;
  attachments: File[];
}

export default function NewPayment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<PaymentForm>({
    declarationId: '',
    type: '',
    amount: 0,
    date: '',
    paymentMethod: '',
    reference: '',
    description: '',
    attachments: [],
  });

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Virement bancaire',
      description: 'Paiement par virement bancaire',
      icon: Building2,
    },
    {
      id: 'credit_card',
      name: 'Carte bancaire',
      description: 'Paiement par carte bancaire',
      icon: CreditCard,
    },
    {
      id: 'direct_debit',
      name: 'Prélèvement',
      description: 'Paiement par prélèvement automatique',
      icon: FileText,
    },
  ];

  const declarations = [
    {
      id: 'DEC001',
      type: 'TVA',
      amount: 15000,
      dueDate: '2024-04-30',
    },
    {
      id: 'DEC002',
      type: 'Impôt sur les sociétés',
      amount: 45000,
      dueDate: '2024-05-15',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate('/fiscalites/paiements');
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Sélection de la déclaration', icon: FileText },
      { number: 2, title: 'Méthode de paiement', icon: CreditCard },
      { number: 3, title: 'Pièces justificatives', icon: Upload },
    ];

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Sélectionnez la déclaration</h2>
            <div className="grid grid-cols-1 gap-4">
              {declarations.map((declaration) => (
                <button
                  key={declaration.id}
                  onClick={() => setForm((prev) => ({
                    ...prev,
                    declarationId: declaration.id,
                    type: declaration.type,
                    amount: declaration.amount,
                  }))}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    form.declarationId === declaration.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{declaration.type}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Échéance: {new Date(declaration.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {declaration.amount.toLocaleString()} FCFA
                      </p>
                      <p className="text-sm text-gray-500">Montant à payer</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Choisissez la méthode de paiement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setForm((prev) => ({ ...prev, paymentMethod: method.id }))}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      form.paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{method.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {form.paymentMethod && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Référence du paiement
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={form.reference}
                    onChange={handleInputChange}
                    placeholder="Ex: VIR-2024-001"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date du paiement
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ajoutez des détails sur ce paiement..."
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Pièces justificatives</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Télécharger des fichiers</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG jusqu'à 10MB
                  </p>
                </div>
              </div>
            </div>
            {form.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Fichiers téléchargés</h3>
                <ul className="divide-y divide-gray-200">
                  {form.attachments.map((file, index) => (
                    <li key={index} className="py-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                      </div>
                      <button
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter((_, i) => i !== index),
                          }))
                        }
                        className="text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/fiscalites/paiements')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux paiements
        </button>

        <div className="bg-white rounded-lg border p-6">
          {renderStepIndicator()}
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            <div className="mt-8 flex justify-end gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Précédent
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Enregistrer le paiement
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 