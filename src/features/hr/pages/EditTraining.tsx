import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  Plus,
  X,
} from 'lucide-react';

interface TrainingFormData {
  title: string;
  type: 'internal' | 'external' | 'online';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  maxParticipants: number;
  description: string;
  objectives: string[];
  materials: string[];
}

export default function EditTraining() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<TrainingFormData>({
    title: '',
    type: 'internal',
    status: 'scheduled',
    startDate: '',
    endDate: '',
    location: '',
    instructor: '',
    maxParticipants: 20,
    description: '',
    objectives: [''],
    materials: [''],
  });

  useEffect(() => {
    // TODO: Fetch training data from API
    // For now, using mock data
    setFormData({
      title: 'Formation Leadership',
      type: 'internal',
      status: 'scheduled',
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      location: 'Salle de conférence A',
      instructor: 'Marie Dubois',
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
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update logic
    console.log('Updating training:', formData);
    navigate('/hr/training');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'objectives' | 'materials') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'objectives' | 'materials') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'objectives' | 'materials') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
            Modifier la formation
          </h1>
          <p className="text-gray-500">Modifier les détails de la formation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="internal">Interne</option>
                <option value="external">Externe</option>
                <option value="online">En ligne</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="scheduled">Planifiée</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Formateur</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">Nombre maximum de participants</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
            <button
              type="button"
              onClick={() => addArrayItem('objectives')}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Ajouter un objectif
            </button>
          </div>
          <div className="space-y-2">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'objectives')}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'objectives')}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Matériels</h2>
            <button
              type="button"
              onClick={() => addArrayItem('materials')}
              className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Ajouter un matériel
            </button>
          </div>
          <div className="space-y-2">
            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={material}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'materials')}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'materials')}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/hr/training')}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
} 