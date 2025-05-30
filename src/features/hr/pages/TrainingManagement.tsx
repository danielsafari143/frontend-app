import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  GraduationCap,
  Users,
  Calendar,
  Clock,
  MapPin,
  FileText,
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
}

export default function TrainingManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedTrainings, setExpandedTrainings] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  // Sample data for demonstration
  const trainings: Training[] = [
    {
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
      ]
    },
    {
      id: 'TRN002',
      title: 'Certification Agile',
      type: 'external',
      status: 'in_progress',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      location: 'Centre de formation XYZ',
      instructor: 'Jean Martin',
      participants: 8,
      maxParticipants: 15,
      description: 'Formation certifiante en méthodologie Agile',
      objectives: [
        'Comprendre les principes Agile',
        'Maîtriser Scrum et Kanban',
        'Obtenir la certification'
      ],
      materials: [
        'Guide Agile',
        'Exemples de projets',
        'Tests de certification'
      ]
    }
  ];

  const toggleTraining = (trainingId: string) => {
    const newExpanded = new Set(expandedTrainings);
    if (newExpanded.has(trainingId)) {
      newExpanded.delete(trainingId);
    } else {
      newExpanded.add(trainingId);
    }
    setExpandedTrainings(newExpanded);
  };

  const handleDelete = (training: Training) => {
    setSelectedTraining(training);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting training:', selectedTraining);
    setIsDeleteModalOpen(false);
    setSelectedTraining(null);
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              Gestion des formations
            </h1>
            <p className="text-gray-500">Gérez les formations et le développement des compétences</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/training/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvelle formation
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedType || ''}
          onChange={(e) => setSelectedType(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les types</option>
          <option value="internal">Interne</option>
          <option value="external">Externe</option>
          <option value="online">En ligne</option>
        </select>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="scheduled">Planifiée</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminée</option>
          <option value="cancelled">Annulée</option>
        </select>
      </div>

      {/* Trainings Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainings.map((training) => (
                <React.Fragment key={training.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleTraining(training.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedTrainings.has(training.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{training.title}</div>
                          <div className="text-sm text-gray-500">ID: {training.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{getTypeText(training.type)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {training.startDate} - {training.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(training.status)}`}>
                        {getStatusText(training.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/hr/training/${training.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/hr/training/${training.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(training)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedTrainings.has(training.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Détails de la formation</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {training.location}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Users className="w-4 h-4" /> {training.participants}/{training.maxParticipants} participants
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> {training.description}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Objectifs et matériels</h3>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">Objectifs:</p>
                                <ul className="list-disc list-inside">
                                  {training.objectives.map((objective, index) => (
                                    <li key={index}>{objective}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">Matériels:</p>
                                <ul className="list-disc list-inside">
                                  {training.materials.map((material, index) => (
                                    <li key={index}>{material}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedTraining && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer la formation"
          itemName={selectedTraining.title}
          itemType="formation"
          customMessage={`Cette action supprimera définitivement la formation "${selectedTraining.title}". Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 