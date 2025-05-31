import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  Building2,
  User,
  Home,
  FileText,
  Download,
  Share2,
  Trash2,
  Edit,
} from 'lucide-react';
import LoadingSpinner from '../../../../global-components/ui/LoadingSpinner';

interface Loan {
  id: string;
  type: 'personal' | 'business' | 'mortgage';
  amount: number;
  interestRate: number;
  term: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid' | 'overdue' | 'pending';
  lender: string;
  reference: string;
  nextPayment: {
    amount: number;
    date: string;
  };
}

export default function Loans() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockLoans: Loan[] = [
      {
        id: '1',
        type: 'business' as const,
        amount: 50000000,
        interestRate: 5.5,
        term: 36,
        startDate: '2024-01-01',
        endDate: '2027-01-01',
        status: 'active',
        lender: 'UBA',
        reference: 'LOAN-2024-001',
        nextPayment: {
          amount: 1500000,
          date: '2024-04-01',
        },
      },
      {
        id: '2',
        type: 'personal' as const,
        amount: 15000000,
        interestRate: 4.5,
        term: 24,
        startDate: '2024-02-01',
        endDate: '2026-02-01',
        status: 'pending',
        lender: 'SGBCI',
        reference: 'LOAN-2024-002',
        nextPayment: {
          amount: 750000,
          date: '2024-05-01',
        },
      },
      {
        id: '3',
        type: 'mortgage' as const,
        amount: 100000000,
        interestRate: 3.5,
        term: 240,
        startDate: '2024-03-01',
        endDate: '2044-03-01',
        status: 'active',
        lender: 'BOA',
        reference: 'LOAN-2024-003',
        nextPayment: {
          amount: 500000,
          date: '2024-04-01',
        },
      },
    ];
    setLoans(mockLoans);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'paid':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <XCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getLoanTypeIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return <User className="w-5 h-5" />;
      case 'business':
        return <Building2 className="w-5 h-5" />;
      case 'mortgage':
        return <Home className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getLoanTypeLabel = (type: string) => {
    switch (type) {
      case 'personal':
        return 'Personnel';
      case 'business':
        return 'Entreprise';
      case 'mortgage':
        return 'Hypothécaire';
      default:
        return type;
    }
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.lender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(loan.status);
    const matchesType = selectedType.length === 0 || selectedType.includes(loan.type);
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleActionClick = (loan: Loan, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate position to ensure menu is visible
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const menuHeight = 200; // Approximate height of the menu
    
    let top = rect.bottom + 8; // Default position below
    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      // If not enough space below but enough space above, position above
      top = rect.top - menuHeight - 8;
    }
    
    setMenuPosition({
      top,
      left: rect.right - 192 // 192px is the width of the menu (w-48 = 12rem = 192px)
    });
    setSelectedLoan(loan);
    setShowActionsMenu(showActionsMenu === loan.id ? null : loan.id);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Deleting loan:', selectedLoan?.id);
    setShowDeleteModal(false);
    setShowActionsMenu(null);
  };

  const handleShare = (method: string) => {
    // TODO: Implement share functionality
    console.log('Sharing loan:', selectedLoan?.id, 'via:', method);
    setShowShareModal(false);
    setShowActionsMenu(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionsMenu && !actionButtonRef.current?.contains(event.target as Node)) {
        setShowActionsMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showActionsMenu]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prêts</h1>
            <p className="text-sm text-gray-500">Gérez vos prêts et emprunts</p>
          </div>
          <button
            onClick={() => navigate('/finance/loans/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Nouveau Prêt
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un prêt..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              Filtres
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-lg border p-3 space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Statut</h3>
                <div className="flex flex-wrap gap-2">
                  {['active', 'paid', 'overdue', 'pending'].map((status) => (
                    <button
                      key={status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusFilter(status);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedStatus.includes(status)
                          ? getStatusColor(status)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'active' ? 'Actif' :
                       status === 'paid' ? 'Payé' :
                       status === 'overdue' ? 'En retard' : 'En attente'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Type de prêt</h3>
                <div className="flex flex-wrap gap-2">
                  {['personal', 'business', 'mortgage'].map((type) => (
                    <button
                      key={type}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTypeFilter(type);
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                        selectedType.includes(type)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getLoanTypeIcon(type)}
                      {getLoanTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prochain paiement
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{loan.reference}</div>
                    <div className="text-sm text-gray-500">{loan.lender}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getLoanTypeIcon(loan.type)}
                      <span className="text-sm text-gray-900">{getLoanTypeLabel(loan.type)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {loan.amount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.interestRate}%</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.term} mois</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(loan.nextPayment.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan.nextPayment.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(loan.status)}`}>
                      {getStatusIcon(loan.status)}
                      <span className="text-sm font-medium">
                        {loan.status === 'active' ? 'Actif' :
                         loan.status === 'paid' ? 'Payé' :
                         loan.status === 'overdue' ? 'En retard' : 'En attente'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="relative">
                      <button
                        ref={actionButtonRef}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(loan, e);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Menu Portal */}
      {showActionsMenu && (
        <div 
          className="fixed bg-white rounded-lg shadow-lg border py-1 z-50"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: '12rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (selectedLoan?.id) {
                navigate(`/finance/loans/${selectedLoan.id}`);
                setShowActionsMenu(null);
              }
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Voir détails
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (selectedLoan?.id) {
                navigate(`/finance/loans/${selectedLoan.id}/edit`);
                setShowActionsMenu(null);
              }
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowShareModal(true);
              setShowActionsMenu(null);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement download functionality
              console.log('Downloading loan:', selectedLoan?.id);
              setShowActionsMenu(null);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDeleteModal(true);
              setShowActionsMenu(null);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supprimer le prêt</h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer ce prêt ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager le prêt</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleShare('copy')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Copier le lien
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Envoyer par email
              </button>
              <button
                onClick={() => handleShare('pdf')}
                className="w-full px-4 py-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Télécharger en PDF
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 