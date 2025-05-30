import React, { useState } from 'react';
import {
  Phone,
  ArrowLeft,
  Edit2,
  Trash2,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneOff,
  Clock,
  Calendar,
  User,
  FileText,
  Plus,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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
  followUpDate?: string;
  followUpTime?: string;
}

export default function CallDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Replace with actual API call
  const call: Call = {
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
    followUpDate: '2024-03-20',
    followUpTime: '10:00',
  };

  const getCallTypeIcon = (type: Call['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="w-5 h-5 text-green-600" />;
      case 'outgoing':
        return <PhoneOutgoing className="w-5 h-5 text-blue-600" />;
      case 'missed':
        return <PhoneMissed className="w-5 h-5 text-red-600" />;
    }
  };

  const getCallStatusIcon = (status: Call['status']) => {
    switch (status) {
      case 'completed':
        return <PhoneCall className="w-5 h-5 text-green-600" />;
      case 'missed':
        return <PhoneMissed className="w-5 h-5 text-red-600" />;
      case 'failed':
        return <PhoneOff className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/calls')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Phone className="w-7 h-7 text-blue-600" />
              Détails de l'appel
            </h1>
            <p className="text-gray-500">Code: {call.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-red-600">
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      {/* Call Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du contact</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-medium">{call.contactName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Numéro de téléphone</p>
                <p className="font-medium">{call.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Type de contact</p>
                <p className="font-medium">
                  {call.contactType === 'customer' ? 'Client' :
                   call.contactType === 'supplier' ? 'Fournisseur' : 'Partenaire'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de l'appel</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getCallTypeIcon(call.type)}
              <div>
                <p className="text-sm text-gray-500">Type d'appel</p>
                <p className="font-medium">
                  {call.type === 'incoming' ? 'Entrant' :
                   call.type === 'outgoing' ? 'Sortant' : 'Manqué'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getCallStatusIcon(call.status)}
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <p className="font-medium">
                  {call.status === 'completed' ? 'Terminé' :
                   call.status === 'missed' ? 'Manqué' : 'Échoué'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Durée</p>
                <p className="font-medium">{call.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date et heure</p>
                <p className="font-medium">{call.date} à {call.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-gray-400 mt-1" />
              <p className="text-gray-700">{call.notes}</p>
            </div>
            {call.followUp && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Suivi planifié</p>
                  <p className="font-medium">
                    {call.followUpDate} à {call.followUpTime}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Actions */}
        <div className="bg-white rounded-xl border shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Rappeler
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Planifier un suivi
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Créer une note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 