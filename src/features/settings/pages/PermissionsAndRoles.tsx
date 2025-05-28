import React, { useState } from 'react';
import { Shield, UserPlus, Lock, Users, Plus, Edit2, Trash2 } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Administrateur',
    description: 'Accès complet à toutes les fonctionnalités',
    permissions: ['all'],
  },
  {
    id: '2',
    name: 'Comptable',
    description: 'Gestion de la comptabilité et des finances',
    permissions: ['accounting', 'finance', 'reports'],
  },
  {
    id: '3',
    name: 'Commercial',
    description: 'Gestion des ventes et des clients',
    permissions: ['sales', 'crm', 'quotations'],
  },
];

const availablePermissions = [
  { id: 'accounting', label: 'Comptabilité' },
  { id: 'finance', label: 'Finance' },
  { id: 'sales', label: 'Ventes' },
  { id: 'crm', label: 'CRM' },
  { id: 'inventory', label: 'Inventaire' },
  { id: 'hr', label: 'Ressources Humaines' },
  { id: 'reports', label: 'Rapports' },
  { id: 'settings', label: 'Paramètres' },
  { id: 'quotations', label: 'Devis' },
  { id: 'purchases', label: 'Achats' },
];

export default function PermissionsAndRoles() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddingRole, setIsAddingRole] = useState(false);

  const handleAddRole = () => {
    setIsAddingRole(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Permissions et Rôles</h1>
        </div>
        <p className="text-gray-600">
          Gérez les rôles utilisateurs et leurs permissions d'accès
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Rôles</h2>
                <button
                  onClick={handleAddRole}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau rôle
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedRole ? `Permissions - ${selectedRole.name}` : 'Sélectionnez un rôle'}
              </h2>
            </div>
            {selectedRole ? (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
                    >
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={selectedRole.permissions.includes(permission.id) || selectedRole.permissions.includes('all')}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        onChange={() => {
                          // Handle permission toggle
                        }}
                      />
                      <label htmlFor={permission.id} className="text-sm font-medium text-gray-700">
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Sélectionnez un rôle pour gérer ses permissions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 