import React, { useEffect, useState } from 'react';
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
  Shield,
  Users,
  Briefcase,
  Tag,
} from 'lucide-react';
import DeleteConfirmation from '../../../components/DeleteConfirmation';
import EmployeeDetails from '../components/EmployeeDetails';
import { useLocation } from 'react-router-dom';
import { RessourceType } from '../../../permissions/permission';
import Spinner from '../../../global-components/ui/Spinner';
import { Employee } from '../../../types/hr';
import { fetchEmployees } from '../../../api/hr/employee';


export default function EmployeeList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedEmployees, setExpandedEmployees] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const permissions = useLocation().state;

  console.log(permissions.ressources)
  // Sample data for demonstration
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const result = await fetchEmployees(1, 10, 'd91bb74f-8a46-4fcb-87a8-814f2b6ed3d9');
        if (result.data) {
          setLoading(false);
          setEmployees(result.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  console.log(employees)

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
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'ON_LEAVE': return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED': return 'bg-orange-100 text-orange-800';
      case 'TERMINATED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeText = (type: string) => {
    const types = {
      full_time: 'Temps plein',
      part_time: 'Temps partiel',
      contract: 'Contrat'
    };
    return types[type as keyof typeof types] || type;
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
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
                    <Users className="w-7 h-7 text-blue-600" />
                    Gestion des employés
                  </h1>
                  <p className="text-gray-500">Gérez les informations des employés</p>
                </div>
              </div>
              <div className="flex gap-2">
                {permissions.ressources.create && <button
                  onClick={() => navigate('/hr/employees/new')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Nouvel employé
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
     {loading&&<Spinner/>}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
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
              <option value="ACTIVE">Actif</option>
              <option value="ON_LEAVE">En congé</option>
              <option value="SUSPENDED">Suspendu</option>
              <option value="TERMINATED">Terminé</option>
            </select>
          </div>
        </div>

        {/* Employees List */}
        <div className="space-y-4">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
              {/* Employee Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Briefcase className="w-4 h-4" />
                        <span>{employee.position}</span>
                        <span className="mx-2">•</span>
                        <Building className="w-4 h-4" />
                        <span>{employee.department}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${getStatusColor(employee.status)}`}>
                     {formatStatus(employee.status)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(employee)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => navigate(`/hr/employees/${employee.id}/edit`)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Modifier"
                        disabled={!permissions.ressources.update}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                        disabled={!permissions.ressources.delete}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleEmployee(employee.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        disabled={!permissions.ressources.read}
                      >
                        {expandedEmployees.has(employee.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedEmployees.has(employee.id) && (
                <div className="border-t bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Contact Information */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          Informations de contact
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> {employee.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4" /> {employee.phone}
                          </p>
                        </div>
                      </div>

                      {/* Contract Details */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Tag className="w-4 h-4 text-blue-600" />
                          Détails du contrat
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Building className="w-4 h-4" /> {getContractTypeText(employee.contractType)}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Date d'embauche: {employee.hireDate}
                          </p>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          Rôles et permissions
                        </h4>
                        <div className="space-y-3">
                          {employee.roles.map((role) => (
                            <div key={role.id} className="flex items-start gap-2">
                              <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{role.name}</p>
                                <p className="text-xs text-gray-500">{role.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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

      {/* Employee Details Modal */}
      <EmployeeDetails
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
} 