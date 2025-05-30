import React, { useState } from 'react';
import {
  Mail,
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
  Send,
  Reply,
  Forward,
  Archive,
  Star,
  StarOff,
  Paperclip,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Email {
  id: string;
  code: string;
  subject: string;
  from: string;
  to: string;
  type: 'sent' | 'received' | 'draft';
  status: 'read' | 'unread' | 'archived';
  date: string;
  time: string;
  content: string;
  attachments: number;
  starred: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function Emails() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Sample data for emails
  const emails: Email[] = [
    {
      id: '1',
      code: 'EML001',
      subject: 'Proposition commerciale',
      from: 'jean.dupont@abc.com',
      to: 'contact@entreprise.com',
      type: 'sent',
      status: 'read',
      date: '2024-03-15',
      time: '14:30',
      content: 'Bonjour,\n\nJe vous propose de discuter de notre nouvelle offre...',
      attachments: 2,
      starred: true,
      priority: 'high',
    },
    {
      id: '2',
      code: 'EML002',
      subject: 'Confirmation de commande',
      from: 'marie.martin@xyz.com',
      to: 'contact@entreprise.com',
      type: 'received',
      status: 'unread',
      date: '2024-03-15',
      time: '16:45',
      content: 'Cher partenaire,\n\nNous confirmons la réception de votre commande...',
      attachments: 1,
      starred: false,
      priority: 'medium',
    },
    // Add more emails...
  ];

  const toggleEmail = (emailId: string) => {
    const newExpanded = new Set(expandedEmails);
    if (newExpanded.has(emailId)) {
      newExpanded.delete(emailId);
    } else {
      newExpanded.add(emailId);
    }
    setExpandedEmails(newExpanded);
  };

  const handleDelete = (email: Email) => {
    setSelectedEmail(email);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting email:', selectedEmail);
    setIsDeleteModalOpen(false);
    setSelectedEmail(null);
  };

  const getPriorityColor = (priority: Email['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
    }
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
              <Mail className="w-7 h-7 text-blue-600" />
              Emails
            </h1>
            <p className="text-gray-500">Gestion des emails</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/crm/emails/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvel email
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un email..."
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
          <option value="read">Lu</option>
          <option value="unread">Non lu</option>
          <option value="archived">Archivé</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Tous les types</option>
          <option>Envoyé</option>
          <option>Reçu</option>
          <option>Brouillon</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Emails Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sujet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">De</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pièces jointes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {emails.map((email) => (
                <React.Fragment key={email.id}>
                  <tr className={`hover:bg-gray-50 ${email.status === 'unread' ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEmail(email.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedEmails.has(email.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{email.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {email.starred ? (
                          <Star className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <StarOff className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={`text-sm font-medium ${email.status === 'unread' ? 'text-blue-600' : 'text-gray-900'}`}>
                          {email.subject}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{email.from}</div>
                      <div className="text-sm text-gray-500">{email.to}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {email.type === 'sent' ? (
                          <Send className="w-4 h-4 text-blue-600" />
                        ) : email.type === 'received' ? (
                          <Mail className="w-4 h-4 text-green-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-gray-600" />
                        )}
                        <span className={`text-sm ${getPriorityColor(email.priority)}`}>
                          {email.type === 'sent' ? 'Envoyé' :
                           email.type === 'received' ? 'Reçu' : 'Brouillon'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{email.date}</div>
                      <div className="text-sm text-gray-500">{email.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      {email.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{email.attachments}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/crm/emails/${email.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/crm/emails/${email.id}/reply`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(email)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEmails.has(email.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Contenu</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-line">{email.content}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Actions rapides</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/crm/emails/${email.id}/reply`)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                <Reply className="w-4 h-4 inline mr-1" /> Répondre
                              </button>
                              <button
                                onClick={() => navigate(`/crm/emails/${email.id}/forward`)}
                                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                <Forward className="w-4 h-4 inline mr-1" /> Transférer
                              </button>
                              <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                                <Archive className="w-4 h-4 inline mr-1" /> Archiver
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
      {selectedEmail && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer l'email"
          itemName={selectedEmail.subject}
          itemType="email"
          customMessage={`Cette action supprimera définitivement l'email "${selectedEmail.subject}" et toutes les pièces jointes associées. Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 