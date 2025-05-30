import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Plus,
  X,
  Star,
} from 'lucide-react';

interface EvaluationFormData {
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
}

export default function EditEvaluation() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<EvaluationFormData>({
    employeeId: '',
    employeeName: '',
    type: 'annual',
    status: 'pending',
    startDate: '',
    endDate: '',
    evaluator: '',
    rating: 0,
    comments: '',
    objectives: [{ title: '', status: 'not_achieved', comments: '' }],
    skills: [{ name: '', rating: 0, comments: '' }],
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockEvaluation: EvaluationFormData = {
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
    };
    setFormData(mockEvaluation);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form data:', formData);
    navigate('/hr/evaluation');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleObjectiveChange = (index: number, field: keyof typeof formData.objectives[0], value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => 
        i === index ? { ...obj, [field]: value } : obj
      ),
    }));
  };

  const handleSkillChange = (index: number, field: keyof typeof formData.skills[0], value: string | number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, { title: '', status: 'not_achieved', comments: '' }],
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', rating: 0, comments: '' }],
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/hr/evaluation/${id}`)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-7 h-7 text-blue-600" />
            Modifier l'évaluation
          </h1>
          <p className="text-gray-500">Modifiez les détails de l'évaluation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                ID de l'employé
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'employé
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type d'évaluation
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="annual">Annuelle</option>
                <option value="probation">Période d'essai</option>
                <option value="project">Projet</option>
                <option value="custom">Personnalisée</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="pending">En attente</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="evaluator" className="block text-sm font-medium text-gray-700 mb-1">
                Évaluateur
              </label>
              <input
                type="text"
                id="evaluator"
                name="evaluator"
                value={formData.evaluator}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Note globale
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commentaires</h2>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
            <button
              type="button"
              onClick={addObjective}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Ajouter un objectif
            </button>
          </div>
          <div className="space-y-4">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Objectif {index + 1}</h3>
                  {formData.objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeObjective(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={objective.title}
                      onChange={(e) => handleObjectiveChange(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      value={objective.status}
                      onChange={(e) => handleObjectiveChange(index, 'status', e.target.value as any)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="achieved">Atteint</option>
                      <option value="partially_achieved">Partiellement atteint</option>
                      <option value="not_achieved">Non atteint</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaires
                  </label>
                  <textarea
                    value={objective.comments}
                    onChange={(e) => handleObjectiveChange(index, 'comments', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Compétences</h2>
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Ajouter une compétence
            </button>
          </div>
          <div className="space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Compétence {index + 1}</h3>
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={skill.rating}
                        onChange={(e) => handleSkillChange(index, 'rating', parseFloat(e.target.value))}
                        min="0"
                        max="5"
                        step="0.5"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commentaires
                  </label>
                  <textarea
                    value={skill.comments}
                    onChange={(e) => handleSkillChange(index, 'comments', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/hr/evaluation/${id}`)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
} 