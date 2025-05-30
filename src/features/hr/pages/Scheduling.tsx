import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Clock,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

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
}

export default function Scheduling() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);

  // Sample data
  const schedules: Schedule[] = [
    {
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
    },
    {
      id: '2',
      title: 'Formation Excel Avancé',
      type: 'training',
      startDate: '2024-03-22T09:00:00',
      endDate: '2024-03-22T17:00:00',
      location: 'Salle de formation',
      participants: ['Pierre Dubois', 'Sophie Martin', 'Lucas Bernard'],
      status: 'scheduled',
      description: 'Formation sur les fonctionnalités avancées d\'Excel',
      createdBy: 'Marie Martin',
      createdAt: '2024-03-10',
    },
  ];

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

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(schedule.type);
    return matchesSearch && matchesType;
  });

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
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Planification</h1>
            <p className="text-gray-500">Gérez les réunions, formations et entretiens</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/hr/scheduling/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle planification
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {typeOptions.map(option => (
          <button
            key={option.value}
            onClick={() => toggleType(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedTypes.includes(option.value)
                ? option.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-xl border shadow-sm">
        {filteredSchedules.map(schedule => (
          <div key={schedule.id} className="border-b last:border-b-0">
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpandedSchedule(expandedSchedule === schedule.id ? null : schedule.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{schedule.title}</h3>
                    <p className="text-sm text-gray-500">
                      Créé le {new Date(schedule.createdAt).toLocaleDateString()} par {schedule.createdBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(schedule.type)}`}>
                    {getTypeText(schedule.type)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(schedule.status)}`}>
                    {getStatusText(schedule.status)}
                  </span>
                  {expandedSchedule === schedule.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {expandedSchedule === schedule.id && (
              <div className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{formatDate(schedule.startDate)} - {formatDate(schedule.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="w-5 h-5" />
                    <span>{schedule.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>{schedule.participants.length} participants</span>
                  </div>
                </div>
                <p className="text-gray-600">{schedule.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/hr/scheduling/${schedule.id}`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Voir les détails
                  </button>
                  <button
                    onClick={() => navigate(`/hr/scheduling/${schedule.id}/edit`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 