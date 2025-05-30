import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  Clock4,
  FileText,
  Download,
  Eye,
  Trash2,
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'offered' | 'hired' | 'rejected';
  appliedDate: string;
  location: string;
  experience: string;
  education: string;
  resume: string;
}

export default function Recruitment() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);

  // Sample data for demonstration
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      position: 'Développeur Full Stack',
      status: 'interviewed',
      appliedDate: '2024-03-01',
      location: 'Paris',
      experience: '5 ans',
      education: 'Master en Informatique',
      resume: 'jean_dupont_cv.pdf',
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 23 45 67 89',
      position: 'Designer UX/UI',
      status: 'new',
      appliedDate: '2024-03-05',
      location: 'Lyon',
      experience: '3 ans',
      education: 'Bachelor en Design',
      resume: 'marie_martin_cv.pdf',
    },
    {
      id: '3',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      phone: '+33 6 34 56 78 90',
      position: 'Chef de Projet',
      status: 'offered',
      appliedDate: '2024-02-28',
      location: 'Marseille',
      experience: '8 ans',
      education: 'MBA',
      resume: 'pierre_dubois_cv.pdf',
    },
  ];

  const statusOptions = [
    { value: 'new', label: 'Nouvelle candidature', color: 'bg-blue-100 text-blue-800' },
    { value: 'reviewed', label: 'En cours d\'examen', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'interviewed', label: 'Entretien effectué', color: 'bg-purple-100 text-purple-800' },
    { value: 'offered', label: 'Offre envoyée', color: 'bg-green-100 text-green-800' },
    { value: 'hired', label: 'Embauché', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'rejected', label: 'Refusé', color: 'bg-red-100 text-red-800' },
  ];

  const getStatusColor = (status: Candidate['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Candidate['status']) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(candidate.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/hr')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recrutement</h1>
          <p className="text-gray-500">Gérez les candidatures et le processus de recrutement</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un candidat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/recruitment/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" /> Nouvelle candidature
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filtrer
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status.value}
            onClick={() => {
              setSelectedStatus(prev =>
                prev.includes(status.value)
                  ? prev.filter(s => s !== status.value)
                  : [...prev, status.value]
              );
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedStatus.includes(status.value)
                ? status.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="divide-y">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-500">{candidate.position}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(candidate.status)}`}>
                      {getStatusText(candidate.status)}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Candidature le {new Date(candidate.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    {expandedCandidate === candidate.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {expandedCandidate === candidate.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Expérience</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Formation</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        {candidate.education}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                      <Eye className="w-4 h-4" />
                      Voir le profil
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                      <Download className="w-4 h-4" />
                      Télécharger CV
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 