import React, { useState } from 'react';
import {
  AlertTriangle,
  FileText,
  User,
  Calendar,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  FileWarning,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  evidence: string[];
  decision?: string;
  appealStatus?: 'pending' | 'approved' | 'rejected';
  nextAction?: string;
}

export default function DisciplinaryManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedCases, setExpandedCases] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<DisciplinaryCase | null>(null);

  // Sample data for demonstration
  const cases: DisciplinaryCase[] = [
    {
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
      evidence: ['rapport_incident.pdf', 'témoignages.docx'],
      nextAction: 'Audience disciplinaire prévue le 2024-03-25'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Sophie Bernard',
      type: 'suspension',
      severity: 'high',
      status: 'hearing',
      incidentDate: '2024-03-10',
      reportDate: '2024-03-11',
      description: 'Violation des règles de sécurité',
      investigator: 'Pierre Durand',
      evidence: ['rapport_sécurité.pdf', 'photos_incident.zip'],
      nextAction: 'Décision finale attendue'
    }
  ];

  const toggleCase = (caseId: string) => {
    const newExpanded = new Set(expandedCases);
    if (newExpanded.has(caseId)) {
      newExpanded.delete(caseId);
    } else {
      newExpanded.add(caseId);
    }
    setExpandedCases(newExpanded);
  };

  const handleDelete = (case_: DisciplinaryCase) => {
    setSelectedCase(case_);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting case:', selectedCase);
    setIsDeleteModalOpen(false);
    setSelectedCase(null);
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
              <AlertTriangle className="w-7 h-7 text-orange-600" />
              Gestion Disciplinaire
            </h1>
            <p className="text-gray-500">Gestion des cas disciplinaires et sanctions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/disciplinary/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouveau cas
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un cas..."
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
          <option value="warning">Avertissement</option>
          <option value="suspension">Suspension</option>
          <option value="dismissal">Licenciement</option>
        </select>
        <select
          value={selectedSeverity || ''}
          onChange={(e) => setSelectedSeverity(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les sévérités</option>
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
          <option value="critical">Critique</option>
        </select>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="investigating">En investigation</option>
          <option value="hearing">Audience</option>
          <option value="decided">Décidé</option>
          <option value="appealed">En appel</option>
          <option value="closed">Clôturé</option>
        </select>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sévérité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date incident</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.map((case_) => (
                <React.Fragment key={case_.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCase(case_.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedCases.has(case_.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{case_.employeeName}</div>
                          <div className="text-sm text-gray-500">ID: {case_.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {case_.type === 'warning' ? 'Avertissement' :
                         case_.type === 'suspension' ? 'Suspension' : 'Licenciement'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getSeverityColor(case_.severity)}`}>
                        {case_.severity === 'low' ? 'Faible' :
                         case_.severity === 'medium' ? 'Moyenne' :
                         case_.severity === 'high' ? 'Élevée' : 'Critique'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(case_.status)}`}>
                        {case_.status === 'pending' ? 'En attente' :
                         case_.status === 'investigating' ? 'En investigation' :
                         case_.status === 'hearing' ? 'Audience' :
                         case_.status === 'decided' ? 'Décidé' :
                         case_.status === 'appealed' ? 'En appel' : 'Clôturé'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{case_.incidentDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/hr/disciplinary/${case_.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/hr/disciplinary/${case_.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(case_)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCases.has(case_.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Détails du cas</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Description:</span> {case_.description}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Investigateur:</span> {case_.investigator}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Date du rapport:</span> {case_.reportDate}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Actions</h3>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Planifier audience
                              </button>
                              <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                                Ajouter preuve
                              </button>
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
      {selectedCase && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer le cas disciplinaire"
          itemName={selectedCase.employeeName}
          itemType="cas disciplinaire"
          customMessage={`Cette action supprimera définitivement le cas disciplinaire de "${selectedCase.employeeName}". Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 