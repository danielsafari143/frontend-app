import React, { useState } from 'react';
import {
  User,
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
  ArrowLeft,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import SendEmail from '../components/SendEmail';
import MakeCall from '../components/MakeCall';

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

export default function Contacts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedContacts, setExpandedContacts] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Sample data for contacts
  const contacts: Contact[] = [
    {
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
    },
    {
      id: '2',
      code: 'CON002',
      firstName: 'Marie',
      lastName: 'Martin',
      company: 'Fournisseur XYZ',
      position: 'Responsable Logistique',
      email: 'marie.martin@xyz.com',
      phone: '+225 0123456789',
      type: 'supplier',
      status: 'active',
      lastContact: '2024-03-10',
      notes: 'Gère les livraisons',
    },
    // Add more contacts...
  ];

  const toggleContact = (contactId: string) => {
    const newExpanded = new Set(expandedContacts);
    if (newExpanded.has(contactId)) {
      newExpanded.delete(contactId);
    } else {
      newExpanded.add(contactId);
    }
    setExpandedContacts(newExpanded);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleEmail = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEmailModalOpen(true);
  };

  const handleCall = (contact: Contact) => {
    setSelectedContact(contact);
    setIsCallModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting contact:', selectedContact);
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
  };

  const handleSendEmail = (subject: string, content: string, attachments: File[]) => {
    // TODO: Implement email sending logic
    console.log('Sending email:', { subject, content, attachments });
    setIsEmailModalOpen(false);
  };

  const handleMakeCall = (type: 'incoming' | 'outgoing', status: 'completed' | 'missed' | 'failed', duration: string, notes: string) => {
    // TODO: Implement call recording logic
    console.log('Recording call:', { type, status, duration, notes });
    setIsCallModalOpen(false);
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
              <User className="w-7 h-7 text-blue-600" />
              Contacts
            </h1>
            <p className="text-gray-500">Gestion des contacts</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/crm/contacts/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouveau contact
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
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
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Tous les types</option>
          <option>Client</option>
          <option>Fournisseur</option>
          <option>Partenaire</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernier contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <React.Fragment key={contact.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleContact(contact.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedContacts.has(contact.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{contact.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{contact.firstName} {contact.lastName}</div>
                      <div className="text-sm text-gray-500">{contact.position}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{contact.company}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                        contact.type === 'customer' ? 'bg-blue-100 text-blue-800' :
                        contact.type === 'supplier' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {contact.type === 'customer' ? 'Client' :
                         contact.type === 'supplier' ? 'Fournisseur' : 'Partenaire'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{contact.lastContact}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/crm/contacts/${contact.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/crm/contacts/${contact.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedContacts.has(contact.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                            <p className="text-sm text-gray-600">{contact.notes}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Actions rapides</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEmail(contact)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Envoyer un email
                              </button>
                              <button
                                onClick={() => handleCall(contact)}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Appeler
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

      {/* Modals */}
      {selectedContact && (
        <>
          <DeleteConfirmation
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={confirmDelete}
            title="Supprimer le contact"
            itemName={`${selectedContact.firstName} ${selectedContact.lastName}`}
            itemType="contact"
          />
          <SendEmail
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)}
            onSend={handleSendEmail}
            contactName={`${selectedContact.firstName} ${selectedContact.lastName}`}
            contactEmail={selectedContact.email}
          />
          <MakeCall
            isOpen={isCallModalOpen}
            onClose={() => setIsCallModalOpen(false)}
            onCall={handleMakeCall}
            contactName={`${selectedContact.firstName} ${selectedContact.lastName}`}
            contactPhone={selectedContact.phone}
          />
        </>
      )}
    </div>
  );
} 