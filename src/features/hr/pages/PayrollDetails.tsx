import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  FileText,
  Users,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import { generatePayrollPDF, generatePayslipPDF, downloadPDF } from '../../../utils/pdfGenerator';

interface EmployeePayroll {
  id: string;
  name: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
}

interface PayrollRecord {
  id: string;
  month: string;
  year: string;
  status: 'draft' | 'pending' | 'approved' | 'paid';
  totalAmount: number;
  employeeCount: number;
  createdAt: string;
  createdBy: string;
  employees: EmployeePayroll[];
  timeline: {
    date: string;
    action: string;
    description: string;
    user: string;
  }[];
}

export default function PayrollDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data
  const payrollRecord: PayrollRecord = {
    id: '1',
    month: 'Mars',
    year: '2024',
    status: 'paid',
    totalAmount: 45000,
    employeeCount: 12,
    createdAt: '2024-03-01',
    createdBy: 'Marie Martin',
    employees: [
      {
        id: '1',
        name: 'Jean Dupont',
        baseSalary: 3000,
        overtime: 200,
        bonuses: 300,
        deductions: 500,
        netSalary: 3000,
      },
      {
        id: '2',
        name: 'Marie Martin',
        baseSalary: 3500,
        overtime: 150,
        bonuses: 250,
        deductions: 600,
        netSalary: 3300,
      },
    ],
    timeline: [
      {
        date: '2024-03-01',
        action: 'Création',
        description: 'Fiche de paie créée',
        user: 'Marie Martin',
      },
      {
        date: '2024-03-02',
        action: 'Validation',
        description: 'Fiche de paie validée par le responsable',
        user: 'Pierre Dubois',
      },
      {
        date: '2024-03-03',
        action: 'Paiement',
        description: 'Salaires versés',
        user: 'Marie Martin',
      },
    ],
  };

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

  const handleDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting payroll record:', id);
    navigate('/hr/payroll');
  };

  const handleExportPDF = () => {
    const doc = generatePayrollPDF(payrollRecord);
    downloadPDF(doc, `fiche-paie-${payrollRecord.month}-${payrollRecord.year}.pdf`);
  };

  const handleGeneratePayslips = () => {
    payrollRecord.employees.forEach(employee => {
      const doc = generatePayslipPDF(employee, payrollRecord);
      downloadPDF(doc, `bulletin-${employee.name}-${payrollRecord.month}-${payrollRecord.year}.pdf`);
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr/payroll')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Fiche de paie {payrollRecord.month} {payrollRecord.year}
            </h1>
            <p className="text-gray-500">
              Créée le {new Date(payrollRecord.createdAt).toLocaleDateString()} par {payrollRecord.createdBy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payrollRecord.status)}`}>
            {getStatusText(payrollRecord.status)}
          </span>
          <button
            onClick={() => navigate(`/hr/payroll/${id}/edit`)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
        >
          <Download className="w-4 h-4" />
          Exporter en PDF
        </button>
        <button 
          onClick={handleGeneratePayslips}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
        >
          <FileText className="w-4 h-4" />
          Générer les bulletins
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{payrollRecord.employeeCount} employés</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{payrollRecord.month} {payrollRecord.year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span>{payrollRecord.totalAmount.toLocaleString()} €</span>
              </div>
            </div>
          </div>

          {/* Employee List */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails des employés</h2>
            <div className="space-y-4">
              {payrollRecord.employees.map(employee => (
                <div key={employee.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{employee.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Salaire de base</span>
                      <p className="font-medium">{employee.baseSalary.toLocaleString()} €</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Heures supplémentaires</span>
                      <p className="font-medium">{employee.overtime.toLocaleString()} €</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Primes</span>
                      <p className="font-medium">{employee.bonuses.toLocaleString()} €</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Déductions</span>
                      <p className="font-medium">{employee.deductions.toLocaleString()} €</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Salaire net</span>
                      <span className="text-lg font-semibold text-blue-600">
                        {employee.netSalary.toLocaleString()} €
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Historique</h2>
            <div className="space-y-4">
              {payrollRecord.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {index < payrollRecord.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{event.action}</div>
                    <div className="text-sm text-gray-500">{event.description}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString()} par {event.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        title="Supprimer la fiche de paie"
        itemName={`${payrollRecord.month} ${payrollRecord.year}`}
        itemType="fiche de paie"
        customMessage="Êtes-vous sûr de vouloir supprimer cette fiche de paie ? Cette action est irréversible."
      />
    </div>
  );
} 