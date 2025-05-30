import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  FileText,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Clock4,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Training {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'online';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  participants: number;
  maxParticipants: number;
  description: string;
  objectives: string[];
  materials: string[];
  timeline: {
    date: string;
    event: string;
    status: 'completed' | 'pending' | 'cancelled';
  }[];
}

export default function TrainingDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [training, setTraining] = useState<Training | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch training data from API
    // For now, using mock data
    setTraining({
      id: 'TRN001',
      title: 'Formation Leadership',
      type: 'internal',
      status: 'scheduled',
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      location: 'Salle de conférence A',
      instructor: 'Marie Dubois',
      participants: 12,
      maxParticipants: 20,
      description: 'Formation sur les compétences en leadership et gestion d\'équipe',
      objectives: [
        'Développer les compétences en leadership',
        'Améliorer la communication d\'équipe',
        'Gérer les conflits efficacement'
      ],
      materials: [
        'Manuel du participant',
        'Présentation PowerPoint',
        'Exercices pratiques'
      ],
      timeline: [
        {
          date: '2024-03-01',
          event: 'Inscription ouverte',
          status: 'completed'
        },
        {
          date: '2024-03-10',
          event: 'Date limite d\'inscription',
          status: 'pending'
        },
        {
          date: '2024-03-15',
          event: 'Début de la formation',
          status: 'pending'
        }
      ]
    });
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting training:', training);
    navigate('/hr/training');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'internal': return 'Interne';
      case 'external': return 'Externe';
      case 'online': return 'En ligne';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Planifiée';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock4 className="w-5 h-5 text-blue-500" />;
    }
  };

  if (!training) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/training')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              {training.title}
            </h1>
            <p className="text-gray-500">Détails de la formation</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/hr/training/${training.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type de formation</p>
                <p className="text-sm font-medium text-gray-900">{getTypeText(training.type)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(training.status)}`}>
                  {getStatusText(training.status)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de début</p>
                <p className="text-sm font-medium text-gray-900">{training.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de fin</p>
                <p className="text-sm font-medium text-gray-900">{training.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lieu</p>
                <p className="text-sm font-medium text-gray-900">{training.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Formateur</p>
                <p className="text-sm font-medium text-gray-900">{training.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="text-sm font-medium text-gray-900">
                  {training.participants}/{training.maxParticipants}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-sm text-gray-600">{training.description}</p>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Objectifs</h2>
            <ul className="list-disc list-inside space-y-2">
              {training.objectives.map((objective, index) => (
                <li key={index} className="text-sm text-gray-600">{objective}</li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Matériels</h2>
            <ul className="list-disc list-inside space-y-2">
              {training.materials.map((material, index) => (
                <li key={index} className="text-sm text-gray-600">{material}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {training.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getTimelineIcon(item.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/hr/training/${training.id}/participants`)}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Users className="w-4 h-4" /> Gérer les participants
              </button>
              <button
                onClick={() => navigate(`/hr/training/${training.id}/materials`)}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-4 h-4" /> Gérer les matériels
              </button>
              <button
                onClick={() => navigate(`/hr/training/${training.id}/schedule`)}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Calendar className="w-4 h-4" /> Modifier le planning
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title="Supprimer la formation"
        itemName={training.title}
        itemType="formation"
        customMessage={`Cette action supprimera définitivement la formation "${training.title}". Cette action est irréversible.`}
      />
    </div>
  );
} 