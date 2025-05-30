import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  FileSpreadsheet,
  TrendingUp,
  FileCheck,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  status: 'active' | 'inactive';
}

interface PayrollEntry {
  id: string;
  employeeId: string;
  period: string;
  baseSalary: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
}

export default function Payroll() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  // Sample data for employees
  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      position: 'Développeur',
      salary: 500000,
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'Comptable',
      salary: 450000,
      status: 'active',
    },
    // Add more employees...
  ];

  // Sample data for payroll entries
  const payrollEntries: PayrollEntry[] = [
    {
      id: '1',
      employeeId: '1',
      period: 'Mars 2024',
      baseSalary: 500000,
      deductions: 50000,
      netSalary: 450000,
      status: 'pending',
    },
    {
      id: '2',
      employeeId: '2',
      period: 'Mars 2024',
      baseSalary: 450000,
      deductions: 45000,
      netSalary: 405000,
      status: 'paid',
    },
    // Add more entries...
  ];

  const toggleEntry = (entryId: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR') + ' FCFA';
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Inconnu';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/accounting')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" />
              Paie
            </h1>
            <p className="text-gray-500">Gestion de la paie et des salaires</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" /> Nouvelle fiche de paie
          </button>
        </div>
      </div>

      {/* Payroll Entries Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Fiches de paie</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Salaire brut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Déductions</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Salaire net</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrollEntries.map((entry) => (
                <React.Fragment key={entry.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEntry(entry.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedEntries.has(entry.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{getEmployeeName(entry.employeeId)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{entry.period}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">{formatAmount(entry.baseSalary)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">{formatAmount(entry.deductions)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-gray-900">{formatAmount(entry.netSalary)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                        entry.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {entry.status === 'paid' ? 'Payé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEntries.has(entry.id) && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Salaire brut: {formatAmount(entry.baseSalary)}</div>
                            <div className="text-sm text-gray-500">Déductions: {formatAmount(entry.deductions)}</div>
                            <div className="text-sm text-gray-500">Salaire net: {formatAmount(entry.netSalary)}</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                              Générer fiche de paie
                            </button>
                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                              Marquer comme payé
                            </button>
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

      {/* Filters and Export */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une fiche de paie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Période: Ce mois</option>
          <option>Période: Le mois dernier</option>
        </select>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <FileSpreadsheet className="w-5 h-5" /> Exporter
        </button>
      </div>
    </div>
  );
} 