import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Edit2,
  Trash2,
  Star,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import LoadingSpinner from '../../../global-components/ui/LoadingSpinner';

interface Evaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'probation' | 'project' | 'custom';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  evaluator: string;
  rating: number;
  comments: string;
  objectives: {
    title: string;
    status: 'achieved' | 'partially_achieved' | 'not_achieved';
    comments: string;
  }[];
  skills: {
    name: string;
    rating: number;
    comments: string;
  }[];
  timeline: {
    date: string;
    action: string;
    user: string;
    details: string;
  }[];
}

export default function EvaluationDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    objectives: true,
    skills: true,
    timeline: true,
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockEvaluation: Evaluation = {
      id: id || '1',
      employeeId: 'EMP001',
      employeeName: 'Jean Dupont',
      type: 'annual',
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      evaluator: 'Marie Martin',
      rating: 4.5,
      comments: 'Excellent performance overall. Shows great leadership skills and technical expertise.',
      objectives: [
        {
          title: 'Complete project X',
          status: 'achieved',
          comments: 'Successfully delivered the project ahead of schedule.',
        },
        {
          title: 'Improve team collaboration',
          status: 'partially_achieved',
          comments: 'Made progress but needs to work on communication skills.',
        },
      ],
      skills: [
        {
          name: 'Leadership',
          rating: 4.5,
          comments: 'Demonstrates strong leadership qualities.',
        },
        {
          name: 'Technical Skills',
          rating: 5,
          comments: 'Excellent technical knowledge and problem-solving abilities.',
        },
      ],
      timeline: [
        {
          date: '2024-01-01',
          action: 'Evaluation started',
          user: 'Marie Martin',
          details: 'Initial assessment completed',
        },
        {
          date: '2024-01-15',
          action: 'Mid-term review',
          user: 'Marie Martin',
          details: 'Progress review and feedback provided',
        },
        {
          date: '2024-01-31',
          action: 'Final evaluation',
          user: 'Marie Martin',
          details: 'Final assessment and rating submitted',
        },
      ],
    };
    setEvaluation(mockEvaluation);
    setIsLoading(false);
  }, [id]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting evaluation:', id);
    navigate('/hr/evaluation');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getStatusColor = (status: Evaluation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: Evaluation['type']) => {
    switch (type) {
      case 'annual':
        return 'Annuelle';
      case 'probation':
        return 'Période d\'essai';
      case 'project':
        return 'Projet';
      case 'custom':
        return 'Personnalisée';
      default:
        return type;
    }
  };

  const getStatusText = (status: Evaluation['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getObjectiveStatusIcon = (status: Evaluation['objectives'][0]['status']) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'partially_achieved':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'not_achieved':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (isLoading || !evaluation) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/evaluation')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-7 h-7 text-blue-600" />
              Évaluation de {evaluation.employeeName}
            </h1>
            <p className="text-gray-500">ID: {evaluation.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/hr/evaluation/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="w-5 h-5" />
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>

      {/* General Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Employé</p>
                <p className="font-medium">{evaluation.employeeName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{getTypeText(evaluation.type)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(evaluation.status)}`}>
                {getStatusText(evaluation.status)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Période</p>
                <p className="font-medium">
                  {new Date(evaluation.startDate).toLocaleDateString()} - {new Date(evaluation.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Évaluateur</p>
                <p className="font-medium">{evaluation.evaluator}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-500">Note globale</p>
                <p className="font-medium">{evaluation.rating}/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commentaires</h2>
          <p className="text-gray-700">{evaluation.comments}</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate(`/hr/evaluation/${id}/edit`)}
              className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 className="w-5 h-5" />
              Modifier l'évaluation
            </button>
            <button
              onClick={() => {/* TODO: Implement print functionality */}}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <FileText className="w-5 h-5" />
              Imprimer l'évaluation
            </button>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('objectives')}
        >
          <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
          <button className="text-gray-400 hover:text-gray-600">
            {expandedSections.objectives ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {expandedSections.objectives && (
          <div className="mt-4 space-y-4">
            {evaluation.objectives.map((objective, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{objective.title}</h3>
                  {getObjectiveStatusIcon(objective.status)}
                </div>
                <p className="text-gray-600">{objective.comments}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('skills')}
        >
          <h2 className="text-lg font-semibold text-gray-900">Compétences</h2>
          <button className="text-gray-400 hover:text-gray-600">
            {expandedSections.skills ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {expandedSections.skills && (
          <div className="mt-4 space-y-4">
            {evaluation.skills.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{skill.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{skill.rating}</span>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <p className="text-gray-600">{skill.comments}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('timeline')}
        >
          <h2 className="text-lg font-semibold text-gray-900">Historique</h2>
          <button className="text-gray-400 hover:text-gray-600">
            {expandedSections.timeline ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {expandedSections.timeline && (
          <div className="mt-4 space-y-4">
            {evaluation.timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  {index < evaluation.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{event.action}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{event.user}</p>
                  <p className="text-gray-600 mt-1">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Supprimer l'évaluation"
        message="Êtes-vous sûr de vouloir supprimer cette évaluation ? Cette action est irréversible."
      />
    </div>
  );
} 