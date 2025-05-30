import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  MessageSquare,
  FileWarning,
  History,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface DisciplinaryCase {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'warning' | 'suspension' | 'dismissal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'hearing' | 'decided' | 'appealed' | 'closed';
  incidentDate: string;
  reportDate: string;
  description: string;
  investigator: string;
  evidence: {
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }[];
  policyViolation: string;
  previousIncidents: string;
  recommendedAction: string;
  decision?: {
    date: string;
    madeBy: string;
    details: string;
  };
  appeal?: {
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    reason: string;
    decision?: {
      date: string;
      madeBy: string;
      details: string;
    };
  };
  timeline: {
    date: string;
    action: string;
    user: string;
    details: string;
  }[];
}

export default function DisciplinaryCaseDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [case_, setCase] = useState<DisciplinaryCase | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['details', 'timeline']));

  useEffect(() => {
    // TODO: Fetch case data from API
    // For now, using mock data
    const mockCase: DisciplinaryCase = {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Jean Dupont',
      type: 'warning',
      severity: 'medium',
      status: 'investigating',
      incidentDate: '2024-03-15',
      reportDate: '2024-03-16',
      description: 'Retard répété au travail',
      investigator: 'Marie Martin',
      evidence: [
        {
          name: 'rapport_incident.pdf',
          type: 'application/pdf',
          size: '2.5 MB',
          uploadedAt: '2024-03-16 10:30',
        },
        {
          name: 'témoignages.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          size: '1.2 MB',
          uploadedAt: '2024-03-16 11:15',
        },
      ],
      policyViolation: 'Article 3.2 - Ponctualité',
      previousIncidents: '2 avertissements verbaux en janvier et février 2024',
      recommendedAction: 'Avertissement écrit avec suivi mensuel',
      timeline: [
        {
          date: '2024-03-15 09:00',
          action: 'Incident signalé',
          user: 'Superviseur',
          details: 'Retard de 45 minutes',
        },
        {
          date: '2024-03-16 10:30',
          action: 'Rapport soumis',
          user: 'Marie Martin',
          details: 'Rapport d\'incident initial',
        },
        {
          date: '2024-03-17 14:00',
          action: 'Investigation démarrée',
          user: 'Marie Martin',
          details: 'Entretien avec l\'employé prévu',
        },
      ],
    };
    setCase(mockCase);
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting case:', case_);
    navigate('/hr/disciplinary');
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'hearing': return 'bg-purple-100 text-purple-800';
      case 'decided': return 'bg-green-100 text-green-800';
      case 'appealed': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!case_) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/disciplinary')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Cas disciplinaire #{case_.id}</h1>
            <p className="text-gray-500">{case_.employeeName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/hr/disciplinary/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Details */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Détails du cas</h2>
                <button
                  onClick={() => toggleSection('details')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedSections.has('details') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.has('details') && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Type de sanction</h3>
                    <p className="text-sm text-gray-900">
                      {case_.type === 'warning' ? 'Avertissement' :
                       case_.type === 'suspension' ? 'Suspension' : 'Licenciement'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Sévérité</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getSeverityColor(case_.severity)}`}>
                      {case_.severity === 'low' ? 'Faible' :
                       case_.severity === 'medium' ? 'Moyenne' :
                       case_.severity === 'high' ? 'Élevée' : 'Critique'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Statut</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(case_.status)}`}>
                      {case_.status === 'pending' ? 'En attente' :
                       case_.status === 'investigating' ? 'En investigation' :
                       case_.status === 'hearing' ? 'Audience' :
                       case_.status === 'decided' ? 'Décidé' :
                       case_.status === 'appealed' ? 'En appel' : 'Clôturé'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Date de l'incident</h3>
                    <p className="text-sm text-gray-900">{case_.incidentDate}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                  <p className="text-sm text-gray-900">{case_.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Violation de politique</h3>
                  <p className="text-sm text-gray-900">{case_.policyViolation}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Incidents précédents</h3>
                  <p className="text-sm text-gray-900">{case_.previousIncidents}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Action recommandée</h3>
                  <p className="text-sm text-gray-900">{case_.recommendedAction}</p>
                </div>
              </div>
            )}
          </div>

          {/* Evidence */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium text-gray-900">Preuves</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {case_.evidence.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.size} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Chronologie</h2>
                <button
                  onClick={() => toggleSection('timeline')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedSections.has('timeline') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.has('timeline') && (
              <div className="p-6">
                <div className="space-y-4">
                  {case_.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <History className="w-4 h-4 text-blue-600" />
                        </div>
                        {index < case_.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{event.action}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                        <p className="text-xs text-gray-500 mt-1">Par {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Statut</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  case_.status === 'pending' ? 'bg-gray-500' :
                  case_.status === 'investigating' ? 'bg-blue-500' :
                  case_.status === 'hearing' ? 'bg-purple-500' :
                  case_.status === 'decided' ? 'bg-green-500' :
                  case_.status === 'appealed' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`} />
                <span className="text-sm font-medium text-gray-900">
                  {case_.status === 'pending' ? 'En attente' :
                   case_.status === 'investigating' ? 'En investigation' :
                   case_.status === 'hearing' ? 'Audience' :
                   case_.status === 'decided' ? 'Décidé' :
                   case_.status === 'appealed' ? 'En appel' : 'Clôturé'}
                </span>
              </div>
            </div>
          </div>

          {/* Investigator */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Investigateur</h2>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{case_.investigator}</p>
                <p className="text-xs text-gray-500">Investigateur principal</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Calendar className="w-4 h-4" /> Planifier audience
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <MessageSquare className="w-4 h-4" /> Ajouter note
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <FileWarning className="w-4 h-4" /> Signaler à la direction
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
        title="Supprimer le cas disciplinaire"
        itemName={case_.employeeName}
        itemType="cas disciplinaire"
        customMessage={`Cette action supprimera définitivement le cas disciplinaire de "${case_.employeeName}". Cette action est irréversible.`}
      />
    </div>
  );
} 