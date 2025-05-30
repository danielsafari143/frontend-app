import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Minus,
  DollarSign,
  Percent,
  Calendar,
} from 'lucide-react';

interface EmployeePayroll {
  id: string;
  name: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
}

interface PayrollFormData {
  month: string;
  year: string;
  status: 'draft' | 'pending' | 'approved' | 'paid';
  employees: EmployeePayroll[];
}

export default function EditPayroll() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<PayrollFormData>({
    month: '',
    year: new Date().getFullYear().toString(),
    status: 'draft',
    employees: [],
  });

  // Sample employee data
  const sampleEmployees = [
    { id: '1', name: 'Jean Dupont', baseSalary: 3000 },
    { id: '2', name: 'Marie Martin', baseSalary: 3500 },
    { id: '3', name: 'Pierre Dubois', baseSalary: 2800 },
  ];

  useEffect(() => {
    // TODO: Fetch payroll data
    // For now, using sample data
    setFormData({
      month: 'Mars',
      year: '2024',
      status: 'pending',
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
    });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmployeeChange = (employeeId: string, field: keyof EmployeePayroll, value: number) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => {
        if (emp.id === employeeId) {
          const updated = { ...emp, [field]: value };
          // Recalculate net salary
          updated.netSalary = updated.baseSalary + updated.overtime + updated.bonuses - updated.deductions;
          return updated;
        }
        return emp;
      })
    }));
  };

  const addEmployee = (employeeId: string) => {
    const employee = sampleEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setFormData(prev => ({
        ...prev,
        employees: [...prev.employees, {
          id: employee.id,
          name: employee.name,
          baseSalary: employee.baseSalary,
          overtime: 0,
          bonuses: 0,
          deductions: 0,
          netSalary: employee.baseSalary,
        }]
      }));
    }
  };

  const removeEmployee = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.filter(emp => emp.id !== employeeId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    navigate(`/hr/payroll/${id}`);
  };

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/hr/payroll/${id}`)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modifier la fiche de paie</h1>
          <p className="text-gray-500">Modifier les informations de la fiche de paie</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mois
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un mois</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Année
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="draft">Brouillon</option>
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="paid">Payé</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Employés</h2>
            <select
              onChange={(e) => addEmployee(e.target.value)}
              className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value=""
            >
              <option value="">Ajouter un employé</option>
              {sampleEmployees
                .filter(emp => !formData.employees.some(e => e.id === emp.id))
                .map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
            </select>
          </div>

          <div className="space-y-4">
            {formData.employees.map(employee => (
              <div key={employee.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{employee.name}</h3>
                  <button
                    type="button"
                    onClick={() => removeEmployee(employee.id)}
                    className="text-red-600 hover:text-red-500"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salaire de base
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={employee.baseSalary}
                        onChange={(e) => handleEmployeeChange(employee.id, 'baseSalary', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heures supplémentaires
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={employee.overtime}
                        onChange={(e) => handleEmployeeChange(employee.id, 'overtime', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primes
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={employee.bonuses}
                        onChange={(e) => handleEmployeeChange(employee.id, 'bonuses', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Déductions
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={employee.deductions}
                        onChange={(e) => handleEmployeeChange(employee.id, 'deductions', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
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

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/hr/payroll/${id}`)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
} 