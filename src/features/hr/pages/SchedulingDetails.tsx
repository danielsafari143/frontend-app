import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Clock as ClockIcon,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Schedule {
  id: string;
  title: string;
  type: 'meeting' | 'training' | 'interview' | 'other';
  startDate: string;
  endDate: string;
  location: string;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  createdBy: string;
  createdAt: string;
  timeline: {
    date: string;
    action: string;
    description: string;
    user: string;
  }[];
}

export default function SchedulingDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const schedule: Schedule = {
    id: '1',
    title: 'Entretien annuel - Jean Dupont',
    type: 'interview',
    startDate: '2024-03-20T10:00:00',
    endDate: '2024-03-20T11:00:00',
    location: 'Salle de réunion 1',
    participants: ['Marie Martin', 'Jean Dupont'],
    status: 'scheduled',
    description: 'Entretien annuel d\'évaluation',
    createdBy: 'Marie Martin',
    createdAt: '2024-03-15',
    timeline: [
      {
        date: '2024-03-15',
        action: 'Création',
        description: 'Planification créée',
        user: 'Marie Martin',
      },
      {
        date: '2024-03-16',
        action: 'Modification',
        description: 'Heure de début modifiée',
        user: 'Marie Martin',
      },
    ],
  };

  const typeOptions = [
    { value: 'meeting', label: 'Réunion', color: 'bg-blue-100 text-blue-800' },
    { value: 'training', label: 'Formation', color: 'bg-green-100 text-green-800' },
    { value: 'interview', label: 'Entretien', color: 'bg-purple-100 text-purple-800' },
    { value: 'other', label: 'Autre', color: 'bg-gray-100 text-gray-800' },
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Planifié', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'En cours', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Terminé', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800' },
  ];

  const getTypeColor = (type: Schedule['type']) => {
    return typeOptions.find(option => option.value === type)?.color || 'bg-gray-100 text-gray-800';
  };

  const getTypeText = (type: Schedule['type']) => {
    return typeOptions.find(option => option.value === type)?.label || type;
  };

  const getStatusColor = (status: Schedule['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Schedule['status']) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting schedule:', id);
    navigate('/hr/scheduling');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <h1 className="text-2xl font-bold text-gray-900">{schedule.title}</h1>
            <p className="text-gray-500">
              Créé le {new Date(schedule.createdAt).toLocaleDateString()} par {schedule.createdBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(schedule.type)}`}>
            {getTypeText(schedule.type)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(schedule.status)}`}>
            {getStatusText(schedule.status)}
          </span>
          <button
            onClick={() => navigate(`/hr/scheduling/${id}/edit`)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{formatDate(schedule.startDate)} - {formatDate(schedule.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  <span>{schedule.location}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{schedule.description}</p>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Participants</h2>
            <div className="space-y-2">
              {schedule.participants.map(participant => (
                <div key={participant} className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>{participant}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique</h2>
            <div className="space-y-4">
              {schedule.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {index < schedule.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{event.action}</div>
                    <div className="text-sm text-gray-500">{event.description}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString()} par {event.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        title="Supprimer la planification"
        itemName={schedule.title}
        itemType="planification"
        customMessage="Êtes-vous sûr de vouloir supprimer cette planification ? Cette action est irréversible."
      />
    </div>
  );
} 