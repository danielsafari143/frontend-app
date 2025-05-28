import React, { useState, useRef, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  AlertTriangle,
  Mail,
  RefreshCw,
} from 'lucide-react';
import NewQuotation from '../../components/NewQuotation';
import QuotationDetails from './QuotationDetails';

type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

interface Quotation {
  id: string;
  quoteNumber: string;
  customerName: string;
  date: string;
  total: number;
  status: QuotationStatus;
  currency: string;
  validUntil: string;
  items: number;
}

export default function Quotations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<QuotationStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState<Quotation | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock data
  const quotations: Quotation[] = [
    {
      id: '1',
      quoteNumber: 'QT-2024-001',
      customerName: 'Client A',
      date: '2024-03-15',
      total: 1500.00,
      status: 'draft',
      currency: 'EUR',
      validUntil: '2024-04-15',
      items: 5,
    },
    {
      id: '2',
      quoteNumber: 'QT-2024-002',
      customerName: 'Client B',
      date: '2024-03-14',
      total: 2300.00,
      status: 'sent',
      currency: 'EUR',
      validUntil: '2024-04-14',
      items: 8,
    },
    {
      id: '3',
      quoteNumber: 'QT-2024-003',
      customerName: 'Client C',
      date: '2024-03-13',
      total: 950.00,
      status: 'accepted',
      currency: 'EUR',
      validUntil: '2024-04-13',
      items: 3,
    },
    {
      id: '4',
      quoteNumber: 'QT-2024-004',
      customerName: 'Client D',
      date: '2024-03-12',
      total: 3200.00,
      status: 'rejected',
      currency: 'EUR',
      validUntil: '2024-04-12',
      items: 6,
    },
    {
      id: '5',
      quoteNumber: 'QT-2024-005',
      customerName: 'Client E',
      date: '2024-03-11',
      total: 1800.00,
      status: 'expired',
      currency: 'EUR',
      validUntil: '2024-04-11',
      items: 4,
    },
  ];

  const getStatusColor = (status: QuotationStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: QuotationStatus) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'sent':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: QuotationStatus) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyé';
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'expired':
        return 'Expiré';
      default:
        return status;
    }
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch = 
      quotation.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || quotation.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleMenuClick = (quotationId: string) => {
    setOpenMenuId(openMenuId === quotationId ? null : quotationId);
  };

  const handleSendForValidation = (quotation: Quotation) => {
    // Add your send for validation logic here
    console.log('Sending for validation:', quotation);
    setOpenMenuId(null);
  };

  const handleChangeStatus = (quotation: Quotation, newStatus: QuotationStatus) => {
    // Add your status change logic here
    console.log('Changing status:', quotation, 'to', newStatus);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (quotation: Quotation) => {
    setQuotationToDelete(quotation);
    setDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log('Deleting quotation:', quotationToDelete);
    setDeleteModalOpen(false);
    setQuotationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setQuotationToDelete(null);
  };

  return (
    <div className="space-y-6 pb-6">
      <Routes>
        <Route path="new" element={<NewQuotation />} />
        <Route path=":id" element={<QuotationDetails />} />
        <Route
          index
          element={
            <>
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Devis</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Gérez vos devis et propositions commerciales
                  </p>
                </div>
                <Link
                  to="/quotations/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nouveau devis
                </Link>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Rechercher un devis..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as QuotationStatus | 'all')}
                      className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="draft">Brouillons</option>
                      <option value="sent">Envoyés</option>
                      <option value="accepted">Acceptés</option>
                      <option value="rejected">Refusés</option>
                      <option value="expired">Expirés</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Filter className="h-5 w-5 mr-2 text-gray-400" />
                    Plus de filtres
                  </button>
                </div>
              </div>

              {/* Additional Filters */}
              {showFilters && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Montant minimum</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quotations Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          N° Devis
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Validité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Articles
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredQuotations.map((quotation) => (
                        <tr key={quotation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link to={`/quotations/${quotation.id}`} className="text-blue-600 hover:text-blue-800">
                              {quotation.quoteNumber}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {quotation.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {quotation.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {quotation.validUntil}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {quotation.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {quotation.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                              {getStatusIcon(quotation.status)}
                              <span className="ml-1">{getStatusText(quotation.status)}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button className="text-gray-400 hover:text-gray-500">
                                <Eye className="h-5 w-5" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-500">
                                <Edit className="h-5 w-5" />
                              </button>
                              <div className="relative" ref={menuRef}>
                                <button
                                  onClick={() => handleMenuClick(quotation.id)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {openMenuId === quotation.id && (
                                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                      <button
                                        onClick={() => handleSendForValidation(quotation)}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                      >
                                        <Mail className="h-4 w-4 mr-3 text-gray-400" />
                                        Envoyer pour validation
                                      </button>
                                      
                                      <div className="px-4 py-2 text-xs font-medium text-gray-500">
                                        Changer le statut
                                      </div>
                                      
                                      {['draft', 'sent', 'accepted', 'rejected', 'expired'].map((status) => (
                                        <button
                                          key={status}
                                          onClick={() => handleChangeStatus(quotation, status as QuotationStatus)}
                                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          role="menuitem"
                                        >
                                          <RefreshCw className="h-4 w-4 mr-3 text-gray-400" />
                                          {getStatusText(status as QuotationStatus)}
                                        </button>
                                      ))}
                                      
                                      <div className="border-t border-gray-100 my-1"></div>
                                      
                                      <button
                                        onClick={() => handleDeleteClick(quotation)}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        role="menuitem"
                                      >
                                        <Trash2 className="h-4 w-4 mr-3" />
                                        Supprimer
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              {deleteModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                    <div className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                        Supprimer le devis
                      </h3>
                      <p className="text-sm text-gray-500 text-center mb-6">
                        Êtes-vous sûr de vouloir supprimer le devis {quotationToDelete?.quoteNumber} ? 
                        Cette action est irréversible.
                      </p>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={handleDeleteCancel}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleDeleteConfirm}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
} 