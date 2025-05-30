import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  X,
  Upload,
} from 'lucide-react';

interface DisciplinaryCaseFormData {
  employeeId: string;
  employeeName: string;
  type: 'warning' | 'suspension' | 'dismissal';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'hearing' | 'decided' | 'appealed' | 'closed';
  incidentDate: string;
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
}

export default function EditDisciplinaryCase() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<DisciplinaryCaseFormData>({
    employeeId: '',
    employeeName: '',
    type: 'warning',
    severity: 'medium',
    status: 'pending',
    incidentDate: '',
    description: '',
    investigator: '',
    evidence: [],
    policyViolation: '',
    previousIncidents: '',
    recommendedAction: '',
  });

  useEffect(() => {
    // TODO: Fetch case data from API
    // For now, using mock data
    const mockCase: DisciplinaryCaseFormData = {
      employeeId: 'EMP001',
      employeeName: 'Jean Dupont',
      type: 'warning',
      severity: 'medium',
      status: 'investigating',
      incidentDate: '2024-03-15',
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
    };
    setFormData(mockCase);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update logic
    console.log('Updating case:', formData);
    navigate(`/hr/disciplinary/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toLocaleString(),
      }));
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/hr/disciplinary/${id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Modifier le cas disciplinaire</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                ID Employé
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type de sanction
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="warning">Avertissement</option>
                <option value="suspension">Suspension</option>
                <option value="dismissal">Licenciement</option>
              </select>
            </div>
            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                Sévérité
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="critical">Critique</option>
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
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="pending">En attente</option>
                <option value="investigating">En investigation</option>
                <option value="hearing">Audience</option>
                <option value="decided">Décidé</option>
                <option value="appealed">En appel</option>
                <option value="closed">Clôturé</option>
              </select>
            </div>
            <div>
              <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-1">
                Date de l'incident
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Détails de l'incident</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="policyViolation" className="block text-sm font-medium text-gray-700 mb-1">
                Violation de politique
              </label>
              <input
                type="text"
                id="policyViolation"
                name="policyViolation"
                value={formData.policyViolation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="previousIncidents" className="block text-sm font-medium text-gray-700 mb-1">
                Incidents précédents
              </label>
              <textarea
                id="previousIncidents"
                name="previousIncidents"
                value={formData.previousIncidents}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Investigation</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="investigator" className="block text-sm font-medium text-gray-700 mb-1">
                Investigateur
              </label>
              <input
                type="text"
                id="investigator"
                name="investigator"
                value={formData.investigator}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="recommendedAction" className="block text-sm font-medium text-gray-700 mb-1">
                Action recommandée
              </label>
              <textarea
                id="recommendedAction"
                name="recommendedAction"
                value={formData.recommendedAction}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preuves</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <input
                  type="file"
                  id="evidence"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <label
                  htmlFor="evidence"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4" />
                  Ajouter des fichiers
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Glissez-déposez des fichiers ou cliquez pour sélectionner
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {formData.evidence.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/hr/disciplinary/${id}`)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
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