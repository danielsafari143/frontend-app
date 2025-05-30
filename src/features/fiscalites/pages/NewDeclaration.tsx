import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Building2,
  Calculator,
  Upload,
  CheckCircle2,
} from 'lucide-react';

interface DeclarationForm {
  type: string;
  period: string;
  dueDate: string;
  amount: number;
  description: string;
  attachments: File[];
}

export default function NewDeclaration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<DeclarationForm>({
    type: '',
    period: '',
    dueDate: '',
    amount: 0,
    description: '',
    attachments: [],
  });

  const declarationTypes = [
    { id: 'tva', name: 'TVA', description: 'Taxe sur la valeur ajoutée' },
    { id: 'is', name: 'Impôt sur les sociétés', description: 'Impôt sur les bénéfices des entreprises' },
    { id: 'cs', name: 'Cotisations sociales', description: 'Cotisations patronales et salariales' },
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
    navigate('/fiscalites/declarations');
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Type de déclaration', icon: FileText },
      { number: 2, title: 'Période et montant', icon: Calculator },
      { number: 3, title: 'Pièces jointes', icon: Upload },
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
            <h2 className="text-lg font-semibold text-gray-900">Sélectionnez le type de déclaration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {declarationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setForm((prev) => ({ ...prev, type: type.id }))}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    form.type === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Détails de la déclaration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Période
                </label>
                <input
                  type="text"
                  name="period"
                  value={form.period}
                  onChange={handleInputChange}
                  placeholder="Ex: Q1 2024"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant (FCFA)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ajoutez des détails sur cette déclaration..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Pièces jointes</h2>
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
          onClick={() => navigate('/fiscalites/declarations')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux déclarations
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
                  Soumettre la déclaration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 