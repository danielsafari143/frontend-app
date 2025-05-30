import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Reply,
  Forward,
  Archive,
  Star,
  StarOff,
  Paperclip,
  Trash2,
  Clock,
  Send,
  Mail,
  FileText,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Email {
  id: string;
  code: string;
  subject: string;
  from: string;
  to: string;
  cc: string;
  bcc: string;
  type: 'sent' | 'received' | 'draft';
  status: 'read' | 'unread' | 'archived';
  date: string;
  time: string;
  content: string;
  attachments: { name: string; size: number }[];
  starred: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function EmailDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState<Email | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch email data from API
    // For now, using mock data
    const mockEmail: Email = {
      id: id || '',
      code: 'EML001',
      subject: 'Proposition commerciale',
      from: 'jean.dupont@abc.com',
      to: 'contact@entreprise.com',
      cc: 'manager@entreprise.com',
      bcc: '',
      type: 'received',
      status: 'read',
      date: '2024-03-15',
      time: '14:30',
      content: 'Bonjour,\n\nJe vous propose de discuter de notre nouvelle offre...',
      attachments: [
        { name: 'proposition.pdf', size: 1024 * 1024 },
        { name: 'presentation.pptx', size: 2 * 1024 * 1024 },
      ],
      starred: true,
      priority: 'high',
    };
    setEmail(mockEmail);
  }, [id]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting email:', email);
    navigate('/crm/emails');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/crm/emails')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{email.subject}</h1>
            <p className="text-gray-500">Code: {email.code}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/crm/emails/${email.id}/reply`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Reply className="w-4 h-4" /> Répondre
          </button>
          <button
            onClick={() => navigate(`/crm/emails/${email.id}/forward`)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Forward className="w-4 h-4" /> Transférer
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        {/* Email Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {email.type === 'sent' ? (
                <Send className="w-5 h-5 text-blue-600" />
              ) : email.type === 'received' ? (
                <Mail className="w-5 h-5 text-green-600" />
              ) : (
                <FileText className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-medium">
                {email.type === 'sent' ? 'Envoyé' :
                 email.type === 'received' ? 'Reçu' : 'Brouillon'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {email.date} à {email.time}
              </span>
              <button className="text-yellow-400 hover:text-yellow-500">
                {email.starred ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">De</p>
              <p className="font-medium">{email.from}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">À</p>
              <p className="font-medium">{email.to}</p>
            </div>
            {email.cc && (
              <div>
                <p className="text-sm text-gray-500">CC</p>
                <p className="font-medium">{email.cc}</p>
              </div>
            )}
            {email.bcc && (
              <div>
                <p className="text-sm text-gray-500">BCC</p>
                <p className="font-medium">{email.bcc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Content */}
        <div className="border-t pt-6">
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{email.content}</p>
          </div>
        </div>

        {/* Attachments */}
        {email.attachments.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Pièces jointes</h3>
            <div className="space-y-2">
              {email.attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <span className="text-sm text-gray-400">({formatFileSize(file.size)})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title="Supprimer l'email"
        itemName={email.subject}
        itemType="email"
        customMessage={`Cette action supprimera définitivement l'email "${email.subject}" et toutes les pièces jointes associées. Cette action est irréversible.`}
      />
    </div>
  );
} 