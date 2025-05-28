import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  CalendarDays
} from 'lucide-react';

interface LeaveRequest {
  id: number;
  employeeName: string;
  type: 'annual' | 'sick' | 'maternity' | 'paternity' | 'unpaid';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  duration: number;
}

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: 'Marie Martin',
    type: 'annual',
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    status: 'pending',
    reason: 'Vacances familiales',
    duration: 15
  },
  {
    id: 2,
    employeeName: 'Jean Dupont',
    type: 'sick',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    status: 'approved',
    reason: 'Grippe',
    duration: 5
  },
  {
    id: 3,
    employeeName: 'Sophie Bernard',
    type: 'maternity',
    startDate: '2024-05-01',
    endDate: '2024-11-01',
    status: 'approved',
    reason: 'Congé maternité',
    duration: 180
  }
];

export default function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null);

  const leaveTypes = [
    { value: 'annual', label: 'Congés annuels' },
    { value: 'sick', label: 'Congés maladie' },
    { value: 'maternity', label: 'Congé maternité' },
    { value: 'paternity', label: 'Congé paternité' },
    { value: 'unpaid', label: 'Congé sans solde' }
  ];

  const statuses = [
    { value: 'pending', label: 'En attente' },
    { value: 'approved', label: 'Approuvé' },
    { value: 'rejected', label: 'Rejeté' }
  ];

  const filteredRequests = initialLeaveRequests.filter(request => {
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || request.type === selectedType;
    const matchesStatus = !selectedStatus || request.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'annual':
        return <CalendarDays className="w-5 h-5" />;
      case 'sick':
        return <AlertCircle className="w-5 h-5" />;
      case 'maternity':
      case 'paternity':
        return <User className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Congés</h1>
        </div>
        <p className="text-gray-600">
          Gérez les demandes de congés et les absences
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher une demande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les types</option>
            {leaveTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les statuts</option>
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nouvelle Demande
          </button>
        </div>
      </div>

      {/* Leave Requests List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredRequests.map(request => (
            <div key={request.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {getTypeIcon(request.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{request.employeeName}</h3>
                    <p className="text-sm text-gray-500">
                      {leaveTypes.find(t => t.value === request.type)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {statuses.find(s => s.value === request.status)?.label}
                  </span>
                  <button
                    onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {expandedRequest === request.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {expandedRequest === request.id && (
                <div className="mt-4 pl-12">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Période</p>
                      <p className="text-sm text-gray-900">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Durée</p>
                      <p className="text-sm text-gray-900">{request.duration} jours</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Motif</p>
                      <p className="text-sm text-gray-900">{request.reason}</p>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <div className="mt-4 flex gap-2">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                        Approuver
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                        <XCircle className="w-4 h-4" />
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 