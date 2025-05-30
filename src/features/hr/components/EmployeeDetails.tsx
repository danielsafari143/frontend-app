import React from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building,
  Tag,
  Shield,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
}

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
  roles: Role[];
  photo?: string; // URL of the employee's photo
}

interface EmployeeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

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

export default function EmployeeDetails({ isOpen, onClose, employee }: EmployeeDetailsProps) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
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
                <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  <span>{employee.position}</span>
                  <span className="mx-2">•</span>
                  <Building className="w-4 h-4" />
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Informations personnelles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Date d'embauche: {employee.hireDate}</span>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Informations professionnelles
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Département: {employee.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Type de contrat: {getContractTypeText(employee.contractType)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Statut: </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status === 'active' ? 'Actif' :
                       employee.status === 'on_leave' ? 'En congé' : 'Terminé'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Roles and Permissions */}
              <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Rôles et permissions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employee.roles.map((role) => (
                    <div key={role.id} className="bg-white rounded-lg p-3 border">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{role.name}</p>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 