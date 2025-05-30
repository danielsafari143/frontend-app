import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  FileText,
  Users,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface EmployeePayroll {
  id: string;
  name: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
}

export interface PayrollRecord {
  id: string;
  month: string;
  year: string;
  status: 'draft' | 'pending' | 'approved' | 'paid';
  totalAmount: number;
  employeeCount: number;
  createdAt: string;
  createdBy: string;
  employees: EmployeePayroll[];
}

export default function Payroll() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  // Sample data
  const payrollRecords: PayrollRecord[] = [
    {
      id: '1',
      month: 'Mars',
      year: '2024',
      status: 'paid',
      totalAmount: 45000,
      employeeCount: 12,
      createdAt: '2024-03-01',
      createdBy: 'Marie Martin',
      employees: [],
    },
    {
      id: '2',
      month: 'Février',
      year: '2024',
      status: 'approved',
      totalAmount: 42000,
      employeeCount: 12,
      createdAt: '2024-02-01',
      createdBy: 'Marie Martin',
      employees: [],
    },
    {
      id: '3',
      month: 'Janvier',
      year: '2024',
      status: 'paid',
      totalAmount: 41000,
      employeeCount: 11,
      createdAt: '2024-01-01',
      createdBy: 'Marie Martin',
      employees: [],
    },
  ];

  const statusOptions = [
    { value: 'draft', label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: 'Approuvé', color: 'bg-green-100 text-green-800' },
    { value: 'paid', label: 'Payé', color: 'bg-blue-100 text-blue-800' },
  ];

  const getStatusColor = (status: PayrollRecord['status']) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: PayrollRecord['status']) => {
    return statusOptions.find(option => option.value === status)?.label || status;
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.year.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(record.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion de la paie</h1>
            <p className="text-gray-500">Gérez les salaires et les paiements</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/hr/payroll/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle fiche de paie
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Exporter
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => toggleStatus(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedStatus.includes(option.value)
                ? option.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Payroll Records List */}
      <div className="bg-white rounded-xl border shadow-sm">
        {filteredRecords.map(record => (
          <div key={record.id} className="border-b last:border-b-0">
            <div
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Fiche de paie {record.month} {record.year}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Créée le {new Date(record.createdAt).toLocaleDateString()} par {record.createdBy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {getStatusText(record.status)}
                  </span>
                  {expandedRecord === record.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            {expandedRecord === record.id && (
              <div className="px-4 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{record.employeeCount} employés</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{record.month} {record.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-5 h-5" />
                    <span>{record.totalAmount.toLocaleString()} €</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/hr/payroll/${record.id}`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Voir les détails
                  </button>
                  <button
                    onClick={() => navigate(`/hr/payroll/${record.id}/edit`)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 