import React, { useState } from 'react';
import {
  User,
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Building,
  Briefcase,
  FileText,
  Plus,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Contact {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier' | 'partner';
  status: 'active' | 'inactive';
  lastContact: string;
  notes: string;
}

export default function ContactDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // TODO: Replace with actual API call
  const contact: Contact = {
    id: '1',
    code: 'CON001',
    firstName: 'Jean',
    lastName: 'Dupont',
    company: 'Entreprise ABC',
    position: 'Directeur Commercial',
    email: 'jean.dupont@abc.com',
    phone: '+225 0123456789',
    type: 'customer',
    status: 'active',
    lastContact: '2024-03-15',
    notes: 'Contact principal pour les négociations',
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/contacts')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User className="w-7 h-7 text-blue-600" />
              Détails du contact
            </h1>
            <p className="text-gray-500">Code: {contact.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/crm/contacts/${contact.id}/edit`)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-red-600">
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Nom complet</p>
                <p className="font-medium">{contact.firstName} {contact.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Poste</p>
                <p className="font-medium">{contact.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Entreprise</p>
                <p className="font-medium">{contact.company}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Coordonnées</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Type de contact</p>
                <p className="font-medium">
                  {contact.type === 'customer' ? 'Client' :
                   contact.type === 'supplier' ? 'Fournisseur' : 'Partenaire'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <p className="font-medium">
                  {contact.status === 'active' ? 'Actif' : 'Inactif'}
                </p>
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
              <p className="text-gray-700">{contact.notes}</p>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Dernier contact</p>
                <p className="font-medium">{contact.lastContact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="bg-white rounded-xl border shadow-sm p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Envoyer un email
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Appeler
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