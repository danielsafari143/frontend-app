import React, { useState } from 'react';
import {
  Phone,
  Plus,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  FileSpreadsheet,
  FileText,
  FileCheck,
  FileWarning,
  FileX,
  BarChart3,
  PieChart,
  TrendingUp,
  User,
  ArrowLeft,
  Clock,
  PhoneCall,
  PhoneMissed,
  PhoneOff,
  PhoneIncoming,
  PhoneOutgoing,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScheduleFollowUp from '../components/ScheduleFollowUp';

interface Call {
  id: string;
  code: string;
  contactName: string;
  contactType: 'customer' | 'supplier' | 'partner';
  phoneNumber: string;
  type: 'incoming' | 'outgoing' | 'missed';
  status: 'completed' | 'missed' | 'failed';
  duration: string;
  date: string;
  time: string;
  notes: string;
  followUp: boolean;
}

export default function Calls() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedCalls, setExpandedCalls] = useState<Set<string>>(new Set());
  const [isScheduleFollowUpOpen, setIsScheduleFollowUpOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  // Sample data for calls
  const calls: Call[] = [
    {
      id: '1',
      code: 'APP001',
      contactName: 'Jean Dupont',
      contactType: 'customer',
      phoneNumber: '+225 0123456789',
      type: 'outgoing',
      status: 'completed',
      duration: '15:30',
      date: '2024-03-15',
      time: '14:30',
      notes: 'Discussion sur le nouveau projet',
      followUp: true,
    },
    {
      id: '2',
      code: 'APP002',
      contactName: 'Marie Martin',
      contactType: 'supplier',
      phoneNumber: '+225 0123456789',
      type: 'incoming',
      status: 'completed',
      duration: '05:15',
      date: '2024-03-15',
      time: '16:45',
      notes: 'Confirmation de livraison',
      followUp: false,
    },
    // Add more calls...
  ];

  const toggleCall = (callId: string) => {
    const newExpanded = new Set(expandedCalls);
    if (newExpanded.has(callId)) {
      newExpanded.delete(callId);
    } else {
      newExpanded.add(callId);
    }
    setExpandedCalls(newExpanded);
  };

  const getCallTypeIcon = (type: Call['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="w-4 h-4 text-green-600" />;
      case 'outgoing':
        return <PhoneOutgoing className="w-4 h-4 text-blue-600" />;
      case 'missed':
        return <PhoneMissed className="w-4 h-4 text-red-600" />;
    }
  };

  const getCallStatusIcon = (status: Call['status']) => {
    switch (status) {
      case 'completed':
        return <PhoneCall className="w-4 h-4 text-green-600" />;
      case 'missed':
        return <PhoneMissed className="w-4 h-4 text-red-600" />;
      case 'failed':
        return <PhoneOff className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleScheduleFollowUp = (call: Call) => {
    setSelectedCall(call);
    setIsScheduleFollowUpOpen(true);
  };

  const handleFollowUpScheduled = (date: string, time: string, notes: string) => {
    // TODO: Implement follow-up scheduling logic
    console.log('Follow-up scheduled:', { date, time, notes, callId: selectedCall?.id });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Phone className="w-7 h-7 text-blue-600" />
              Appels
            </h1>
            <p className="text-gray-500">Historique des appels</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/crm/calls/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvel appel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un appel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="completed">Terminé</option>
          <option value="missed">Manqué</option>
          <option value="failed">Échoué</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Tous les types</option>
          <option>Entrant</option>
          <option>Sortant</option>
          <option>Manqué</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Calls Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {calls.map((call) => (
                <React.Fragment key={call.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCall(call.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedCalls.has(call.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{call.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{call.contactName}</div>
                      <div className="text-sm text-gray-500">{call.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {getCallTypeIcon(call.type)}
                        <span className="text-sm text-gray-900">
                          {call.type === 'incoming' ? 'Entrant' :
                           call.type === 'outgoing' ? 'Sortant' : 'Manqué'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {getCallStatusIcon(call.status)}
                        <span className="text-sm text-gray-900">
                          {call.status === 'completed' ? 'Terminé' :
                           call.status === 'missed' ? 'Manqué' : 'Échoué'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{call.date}</div>
                      <div className="text-sm text-gray-500">{call.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{call.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/crm/calls/${call.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/crm/calls/${call.id}?edit=true`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCalls.has(call.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                            <p className="text-sm text-gray-600">{call.notes}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Actions rapides</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/crm/calls/${call.id}`)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Rappeler
                              </button>
                              <button
                                onClick={() => handleScheduleFollowUp(call)}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Planifier un suivi
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

      {/* Schedule Follow-up Modal */}
      {selectedCall && (
        <ScheduleFollowUp
          isOpen={isScheduleFollowUpOpen}
          onClose={() => setIsScheduleFollowUpOpen(false)}
          onSchedule={handleFollowUpScheduled}
          contactName={selectedCall.contactName}
        />
      )}
    </div>
  );
} 