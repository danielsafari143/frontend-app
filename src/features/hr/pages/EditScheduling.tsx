import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  User,
  Building2,
  Clock,
  Calendar as CalendarIcon,
} from 'lucide-react';

interface ScheduleFormData {
  title: string;
  type: 'meeting' | 'training' | 'interview' | 'other';
  startDate: string;
  endDate: string;
  location: string;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
}

export default function EditScheduling() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: '',
    type: 'meeting',
    startDate: '',
    endDate: '',
    location: '',
    participants: [],
    status: 'scheduled',
    description: '',
  });

  // Sample data for participants
  const availableParticipants = [
    'Marie Martin',
    'Jean Dupont',
    'Pierre Dubois',
    'Sophie Martin',
    'Lucas Bernard',
  ];

  const typeOptions = [
    { value: 'meeting', label: 'Réunion' },
    { value: 'training', label: 'Formation' },
    { value: 'interview', label: 'Entretien' },
    { value: 'other', label: 'Autre' },
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Planifié' },
    { value: 'in-progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' },
  ];

  useEffect(() => {
    // TODO: Fetch schedule data
    // For now, using sample data
    setFormData({
      title: 'Entretien annuel - Jean Dupont',
      type: 'interview',
      startDate: '2024-03-20T10:00',
      endDate: '2024-03-20T11:00',
      location: 'Salle de réunion 1',
      participants: ['Marie Martin', 'Jean Dupont'],
      status: 'scheduled',
      description: 'Entretien annuel d\'évaluation',
    });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddParticipant = (participant: string) => {
    if (!formData.participants.includes(participant)) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, participant],
      }));
    }
  };

  const handleRemoveParticipant = (participant: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter(p => p !== participant),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form data:', formData);
    navigate('/hr/scheduling');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/scheduling')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Modifier la planification</h1>
            <p className="text-gray-500">Modifiez les détails de la planification</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
          {/* General Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Date et heure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date et heure de début
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date et heure de fin
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lieu</h2>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Lieu
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut</h2>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Participants */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Participants</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="participant" className="block text-sm font-medium text-gray-700 mb-1">
                  Ajouter un participant
                </label>
                <select
                  id="participant"
                  onChange={(e) => handleAddParticipant(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un participant</option>
                  {availableParticipants
                    .filter(p => !formData.participants.includes(p))
                    .map(participant => (
                      <option key={participant} value={participant}>
                        {participant}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.participants.map(participant => (
                  <div
                    key={participant}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  >
                    <User className="w-4 h-4" />
                    <span>{participant}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveParticipant(participant)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/hr/scheduling')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
} 