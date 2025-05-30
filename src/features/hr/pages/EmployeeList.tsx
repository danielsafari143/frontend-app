import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit2,
  Trash2,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  contractType: 'full_time' | 'part_time' | 'contract';
}

export default function EmployeeList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedEmployees, setExpandedEmployees] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Sample data for demonstration
  const employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'Jean Dupont',
      position: 'Développeur Full Stack',
      department: 'Informatique',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      hireDate: '2023-01-15',
      status: 'active',
      contractType: 'full_time',
    },
    {
      id: 'EMP002',
      name: 'Marie Martin',
      position: 'Responsable RH',
      department: 'Ressources Humaines',
      email: 'marie.martin@example.com',
      phone: '+33 6 23 45 67 89',
      hireDate: '2022-06-01',
      status: 'active',
      contractType: 'full_time',
    },
  ];

  const toggleEmployee = (employeeId: string) => {
    const newExpanded = new Set(expandedEmployees);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedEmployees(newExpanded);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting employee:', selectedEmployee);
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeText = (type: string) => {
    switch (type) {
      case 'full_time': return 'Temps plein';
      case 'part_time': return 'Temps partiel';
      case 'contract': return 'Contrat';
      default: return type;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/hr')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User className="w-7 h-7 text-blue-600" />
              Gestion des employés
            </h1>
            <p className="text-gray-500">Gérez les informations des employés</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/hr/employees/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Nouvel employé
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un employé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedDepartment || ''}
          onChange={(e) => setSelectedDepartment(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les départements</option>
          <option value="Informatique">Informatique</option>
          <option value="Ressources Humaines">Ressources Humaines</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="on_leave">En congé</option>
          <option value="terminated">Terminé</option>
        </select>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEmployee(employee.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedEmployees.has(employee.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: {employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{employee.position}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{employee.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status === 'active' ? 'Actif' :
                         employee.status === 'on_leave' ? 'En congé' : 'Terminé'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/hr/employees/${employee.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/hr/employees/${employee.id}/edit`)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEmployees.has(employee.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Informations de contact</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {employee.email}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> {employee.phone}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Détails du contrat</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Building className="w-4 h-4" /> {getContractTypeText(employee.contractType)}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Date d'embauche: {employee.hireDate}
                              </p>
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
      {selectedEmployee && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title="Supprimer l'employé"
          itemName={selectedEmployee.name}
          itemType="employé"
          customMessage={`Cette action supprimera définitivement l'employé "${selectedEmployee.name}". Cette action est irréversible.`}
        />
      )}
    </div>
  );
} 