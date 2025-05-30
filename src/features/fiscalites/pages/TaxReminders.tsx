import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  X,
} from 'lucide-react';
import BackButton from '../../../components/BackButton';

interface ReminderForm {
  title: string;
  type: string;
  dueDate: string;
  description: string;
}

export default function TaxReminders() {
  const [isNewReminderPopupOpen, setIsNewReminderPopupOpen] = useState(false);
  const [newReminder, setNewReminder] = useState<ReminderForm>({
    title: '',
    type: '',
    dueDate: '',
    description: '',
  });

  // This would typically come from an API call
  const reminders = [
    {
      id: 1,
      type: 'TVA',
      title: 'Déclaration TVA Q1 2024',
      dueDate: '2024-04-30',
      status: 'pending',
      description: 'Déclaration de la TVA pour le premier trimestre 2024',
    },
    {
      id: 2,
      type: 'Corporate Tax',
      title: 'Déclaration fiscale annuelle',
      dueDate: '2024-05-15',
      status: 'upcoming',
      description: 'Déclaration fiscale pour l\'exercice 2023',
    },
    {
      id: 3,
      type: 'Social Security',
      title: 'Cotisations sociales',
      dueDate: '2024-03-31',
      status: 'overdue',
      description: 'Paiement des cotisations sociales du mois de mars',
    },
  ];

  const handleNewReminder = () => {
    // This would typically be an API call
    console.log('Creating new reminder:', newReminder);
    setIsNewReminderPopupOpen(false);
    setNewReminder({
      title: '',
      type: '',
      dueDate: '',
      description: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      case 'upcoming':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6">
      <BackButton to="/fiscalites" label="Retour au tableau de bord" />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rappels fiscaux</h1>
            <p className="mt-2 text-gray-600">
              Gérez vos rappels et échéances fiscales
            </p>
          </div>
          <button
            onClick={() => setIsNewReminderPopupOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau rappel
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white rounded-lg border p-6 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{reminder.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Échéance: {new Date(reminder.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(reminder.status)}`}>
                      {getStatusIcon(reminder.status)}
                      <span>
                        {reminder.status === 'completed'
                          ? 'Complété'
                          : reminder.status === 'overdue'
                          ? 'En retard'
                          : reminder.status === 'upcoming'
                          ? 'À venir'
                          : 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Reminder Popup */}
      {isNewReminderPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nouveau rappel</h3>
              <button
                onClick={() => setIsNewReminderPopupOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le titre du rappel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="TVA">TVA</option>
                  <option value="Corporate Tax">Impôt sur les sociétés</option>
                  <option value="Social Security">Sécurité sociale</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Entrez la description du rappel"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsNewReminderPopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Annuler
              </button>
              <button
                onClick={handleNewReminder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 