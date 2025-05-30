import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';

interface TaxEvent {
  id: string;
  title: string;
  type: 'declaration' | 'payment' | 'reminder';
  date: string;
  status: 'upcoming' | 'due' | 'overdue' | 'completed';
  amount?: number;
  description: string;
}

export default function TaxCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<TaxEvent | null>(null);

  const events: TaxEvent[] = [
    {
      id: '1',
      title: 'Déclaration TVA Q1 2024',
      type: 'declaration',
      date: '2024-04-30',
      status: 'upcoming',
      amount: 15000,
      description: 'Déclaration de la TVA pour le premier trimestre 2024',
    },
    {
      id: '2',
      title: 'Paiement Impôt sur les sociétés',
      type: 'payment',
      date: '2024-05-15',
      status: 'upcoming',
      amount: 45000,
      description: 'Paiement de l\'impôt sur les sociétés pour l\'exercice 2023',
    },
    {
      id: '3',
      title: 'Cotisations sociales',
      type: 'payment',
      date: '2024-04-25',
      status: 'due',
      amount: 8500,
      description: 'Paiement des cotisations sociales du mois d\'avril',
    },
    {
      id: '4',
      title: 'Déclaration TVA Q4 2023',
      type: 'declaration',
      date: '2024-01-31',
      status: 'completed',
      amount: 12500,
      description: 'Déclaration de la TVA pour le quatrième trimestre 2023',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      case 'due':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      case 'due':
        return <Clock className="w-5 h-5" />;
      default:
        return <CalendarIcon className="w-5 h-5" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'declaration':
        return <FileText className="w-5 h-5" />;
      case 'payment':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: React.ReactElement[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-900">{day}</span>
            {dayEvents.length > 0 && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full text-left text-xs p-1 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-1">
                  {getEventTypeIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendrier fiscal</h1>
          <p className="mt-2 text-gray-600">
            Suivez vos échéances fiscales et vos déclarations
          </p>
        </div>
        <button
          onClick={() => navigate('/fiscalites/declarations/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle déclaration</span>
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {formatDate(currentDate)}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getEventTypeIcon(selectedEvent.type)}
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Fermer</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">{selectedEvent.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </span>
              </div>
              {selectedEvent.amount && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {selectedEvent.amount.toLocaleString()} FCFA
                  </span>
                </div>
              )}
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                  selectedEvent.status
                )}`}
              >
                {getStatusIcon(selectedEvent.status)}
                <span>
                  {selectedEvent.status === 'completed'
                    ? 'Complété'
                    : selectedEvent.status === 'overdue'
                    ? 'En retard'
                    : selectedEvent.status === 'due'
                    ? 'Échéance'
                    : 'À venir'}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Fermer
              </button>
              {selectedEvent.type === 'declaration' && (
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    navigate(`/fiscalites/declarations/${selectedEvent.id}`);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Voir la déclaration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 