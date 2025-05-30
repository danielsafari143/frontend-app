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
  Award,
  User,
  Calendar,
  Star,
  CheckCircle2,
  XCircle,
  Clock4,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Evaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'probation' | 'project' | 'custom';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
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
}

export default function EvaluationManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedEvaluations, setExpandedEvaluations] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);

  // Sample data for demonstration
  const evaluations: Evaluation[] = [
    {
      id: 'EVL001',
      employeeId: 'EMP001',
      employeeName: 'Jean Dupont',
      type: 'annual',
      status: 'completed',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      evaluator: 'Marie Martin',
      rating: 4.5,
      comments: 'Excellent performance globale',
      objectives: [
        {
          title: 'Améliorer la communication d\'équipe',
          status: 'achieved',
          comments: 'Très bonne progression'
        },
        {
          title: 'Maîtriser les nouvelles technologies',
          status: 'partially_achieved',
          comments: 'En cours d\'apprentissage'
        }
      ],
      skills: [
        {
          name: 'Leadership',
          rating: 4,
          comments: 'Bonne capacité à diriger l\'équipe'
        },
        {
          name: 'Communication',
          rating: 5,
          comments: 'Excellent communicateur'
        }
      ]
    },
    {
      id: 'EVL002',
      employeeId: 'EMP002',
      employeeName: 'Sophie Bernard',
      type: 'probation',
      status: 'in_progress',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      evaluator: 'Pierre Dubois',
      rating: 3.5,
      comments: 'Bonne adaptation',
      objectives: [
        {
          title: 'Intégration dans l\'équipe',
          status: 'achieved',
          comments: 'Intégration réussie'
        }
      ],
      skills: [
        {
          name: 'Adaptation',
          rating: 4,
          comments: 'S\'adapte bien aux changements'
        }
      ]
    }
  ];

  const toggleEvaluation = (evaluationId: string) => {
    const newExpanded = new Set(expandedEvaluations);
    if (newExpanded.has(evaluationId)) {
      newExpanded.delete(evaluationId);
    } else {
      newExpanded.add(evaluationId);
    }
    setExpandedEvaluations(newExpanded);
  };

  const handleDelete = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting evaluation:', selectedEvaluation);
    setIsDeleteModalOpen(false);
    setSelectedEvaluation(null);
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
      case 'annual': return 'Annuelle';
      case 'probation': return 'Période d\'essai';
      case 'project': return 'Projet';
      case 'custom': return 'Personnalisée';
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

  const getObjectiveStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-green-100 text-green-800';
      case 'partially_achieved': return 'bg-yellow-100 text-yellow-800';
      case 'not_achieved': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getObjectiveStatusText = (status: string) => {
    switch (status) {
      case 'achieved': return 'Atteint';
      case 'partially_achieved': return 'Partiellement atteint';
      case 'not_achieved': return 'Non atteint';
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
              <Award className="w-7 h-7 text-blue-600" />
              Gestion des évaluations
            </h1>
            <p className="text-gray-500">Gérez les évaluations de performance</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/evaluation/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvelle évaluation
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une évaluation..."
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
          <option value="annual">Annuelle</option>
          <option value="probation">Période d'essai</option>
          <option value="project">Projet</option>
          <option value="custom">Personnalisée</option>
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

      {/* Evaluations Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {evaluations.map((evaluation) => (
                <React.Fragment key={evaluation.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEvaluation(evaluation.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedEvaluations.has(evaluation.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{evaluation.employeeName}</div>
                          <div className="text-sm text-gray-500">ID: {evaluation.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{getTypeText(evaluation.type)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {evaluation.startDate} - {evaluation.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(evaluation.status)}`}>
                        {getStatusText(evaluation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/hr/evaluation/${evaluation.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/hr/evaluation/${evaluation.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(evaluation)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEvaluations.has(evaluation.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Détails de l'évaluation</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <User className="w-4 h-4" /> Évaluateur: {evaluation.evaluator}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Star className="w-4 h-4" /> Note: {evaluation.rating}/5
                              </p>
                              <p className="text-sm text-gray-600">
                                {evaluation.comments}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Objectifs et compétences</h3>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900 mb-2">Objectifs:</p>
                                <div className="space-y-2">
                                  {evaluation.objectives.map((objective, index) => (
                                    <div key={index} className="text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-900">{objective.title}</span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getObjectiveStatusColor(objective.status)}`}>
                                          {getObjectiveStatusText(objective.status)}
                                        </span>
                                      </div>
                                      <p className="text-gray-600 mt-1">{objective.comments}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 mb-2">Compétences:</p>
                                <div className="space-y-2">
                                  {evaluation.skills.map((skill, index) => (
                                    <div key={index} className="text-sm">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-900">{skill.name}</span>
                                        <span className="text-gray-600">{skill.rating}/5</span>
                                      </div>
                                      <p className="text-gray-600 mt-1">{skill.comments}</p>
                                    </div>
                                  ))}
                                </div>
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
      {selectedEvaluation && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer l'évaluation"
          itemName={`Évaluation de ${selectedEvaluation.employeeName}`}
          itemType="évaluation"
          customMessage={`Cette action supprimera définitivement l'évaluation de ${selectedEvaluation.employeeName}. Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 