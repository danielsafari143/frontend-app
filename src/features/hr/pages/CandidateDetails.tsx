import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Download,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  MessageSquare,
  Calendar as CalendarIcon,
  UserPlus,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

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
  coverLetter: string;
  source: string;
  expectedSalary: string;
  availability: string;
  notes: string;
  timeline: {
    date: string;
    action: string;
    description: string;
    user: string;
  }[];
}

export default function CandidateDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data for demonstration
  const candidate: Candidate = {
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
    coverLetter: 'Lettre de motivation détaillée...',
    source: 'LinkedIn',
    expectedSalary: '45-50K€',
    availability: 'Immédiate',
    notes: 'Candidat très prometteur avec une bonne expérience...',
    timeline: [
      {
        date: '2024-03-01',
        action: 'Candidature reçue',
        description: 'CV et lettre de motivation reçus',
        user: 'Marie Martin',
      },
      {
        date: '2024-03-02',
        action: 'Premier contact',
        description: 'Email de confirmation envoyé',
        user: 'Marie Martin',
      },
      {
        date: '2024-03-05',
        action: 'Entretien technique',
        description: 'Entretien avec l\'équipe technique',
        user: 'Pierre Dubois',
      },
    ],
  };

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

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting candidate:', id);
    navigate('/hr/recruitment');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/recruitment')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
            <p className="text-gray-500">{candidate.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
            {getStatusText(candidate.status)}
          </span>
          <button
            onClick={() => navigate(`/hr/recruitment/${id}/edit`)}
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

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
          <MessageSquare className="w-4 h-4" />
          Envoyer un message
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
          <CalendarIcon className="w-4 h-4" />
          Planifier un entretien
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
          <UserPlus className="w-4 h-4" />
          Créer un contrat
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                Candidature le {new Date(candidate.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations professionnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Expérience</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Formation</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  {candidate.education}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Salaire attendu</h3>
                <div className="text-gray-600">{candidate.expectedSalary}</div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Disponibilité</h3>
                <div className="text-gray-600">{candidate.availability}</div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Source</h3>
                <div className="text-gray-600">{candidate.source}</div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">CV</h3>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <FileText className="w-4 h-4" />
                  {candidate.resume}
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Lettre de motivation</h3>
                <p className="text-gray-600">{candidate.coverLetter}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
            <p className="text-gray-600">{candidate.notes}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique</h2>
            <div className="space-y-4">
              {candidate.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {index < candidate.timeline.length - 1 && (
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
        onConfirm={handleDelete}
        title="Supprimer la candidature"
        message="Êtes-vous sûr de vouloir supprimer cette candidature ? Cette action est irréversible."
      />
    </div>
  );
} 