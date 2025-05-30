import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  Edit,
  Users,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  MessageSquare,
  History,
  Star,
} from 'lucide-react';

interface Interaction {
  id: string;
  date: string;
  type: 'call' | 'email' | 'meeting';
  description: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export default function BankContactDetails() {
  const navigate = useNavigate();
  const { id, contactId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sample contact data
  const contact = {
    id: contactId,
    name: 'Moussa Diallo',
    position: 'Directeur Commercial',
    email: 'moussa.diallo@uba.sn',
    phone: '+221 77 123 4567',
    mobile: '+221 77 765 4321',
    address: '123 Avenue de la Banque, Dakar',
    bank: 'UBA',
    department: 'Commercial',
    isPrimary: true,
    startDate: '2022-01-15',
    notes: 'Contact principal pour toutes les opérations bancaires',
  };

  const interactions: Interaction[] = [
    {
      id: '1',
      date: '2024-03-20',
      type: 'meeting',
      description: 'Réunion trimestrielle de suivi',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-03-15',
      type: 'call',
      description: 'Discussion sur les nouveaux services',
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-04-01',
      type: 'meeting',
      description: 'Présentation des nouveaux produits',
      status: 'scheduled',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'meeting':
        return <Calendar className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/finance/bank-relations/${id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
            <p className="text-gray-500">{contact.position} - {contact.bank}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-5 h-5" />
            Partager
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Edit className="w-5 h-5" />
            Modifier
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Overview */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Informations du contact</h2>
                <p className="text-gray-500">Détails et coordonnées</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium">{contact.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium">{contact.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Département</p>
                <p className="font-medium">{contact.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de début</p>
                <p className="font-medium">
                  {new Date(contact.startDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Interactions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interactions récentes</h2>
            <div className="space-y-4">
              {interactions.map(interaction => (
                <div key={interaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{interaction.description}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(interaction.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {interaction.type === 'call' ? 'Appel' :
                           interaction.type === 'email' ? 'Email' : 'Réunion'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(interaction.status)}`}>
                    {interaction.status === 'completed' ? 'Complété' :
                     interaction.status === 'scheduled' ? 'Planifié' : 'Annulé'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Status */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut du contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className={`w-5 h-5 ${contact.isPrimary ? 'text-yellow-400' : 'text-gray-400'}`} />
                <span className="font-medium">
                  {contact.isPrimary ? 'Contact Principal' : 'Contact Secondaire'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="mt-1 text-gray-600">{contact.notes}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <MessageSquare className="w-5 h-5" />
                Nouvelle interaction
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Mail className="w-5 h-5" />
                Envoyer un email
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Phone className="w-5 h-5" />
                Appeler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 