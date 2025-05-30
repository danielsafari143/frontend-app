import React from 'react';
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Shield,
  UserPlus,
  UserMinus,
  Edit,
  AlertCircle,
} from 'lucide-react';
import SubscriptionNav from '../components/SubscriptionNav';
import Modal from '../components/Modal';

interface SubscriptionUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastActive: string;
}

export default function SubscriptionUserManagement() {
  const [users, setUsers] = React.useState<SubscriptionUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-03-15T10:30:00',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'manager',
      status: 'active',
      lastActive: '2024-03-14T15:45:00',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'user',
      status: 'inactive',
      lastActive: '2024-03-10T09:15:00',
    },
  ]);

  // Modal states
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = React.useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<SubscriptionUser | null>(null);

  // Form states
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<'admin' | 'manager' | 'user'>('user');
  const [selectedRole, setSelectedRole] = React.useState<'admin' | 'manager' | 'user'>('user');

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700';
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to invite the user
    const newUser: SubscriptionUser = {
      id: String(users.length + 1),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'inactive',
      lastActive: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setIsInviteModalOpen(false);
    setInviteEmail('');
    setInviteRole('user');
  };

  const handleUpdateRole = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        )
      );
      setIsEditRoleModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleRemoveUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setIsRemoveUserModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="md:col-span-1">
            <SubscriptionNav />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
                  <p className="text-gray-600 mt-1">
                    Gérez les utilisateurs de votre abonnement
                  </p>
                </div>
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <UserPlus className="w-5 h-5" />
                  Inviter un utilisateur
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">Tous les rôles</option>
                <option value="admin">Administrateurs</option>
                <option value="manager">Managers</option>
                <option value="user">Utilisateurs</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière activité
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setSelectedRole(user.role);
                                setIsEditRoleModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit className="w-5 h-5 text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setIsRemoveUserModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <UserMinus className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Utilisateurs actifs</h3>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">12/20</div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Rôles</h3>
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Administrateurs</span>
                    <span className="text-sm font-medium text-gray-900">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Managers</span>
                    <span className="text-sm font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Utilisateurs</span>
                    <span className="text-sm font-medium text-gray-900">7</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    Dernière connexion: il y a 2 heures
                  </div>
                  <div className="text-sm text-gray-600">
                    Utilisateurs en ligne: 5
                  </div>
                  <div className="text-sm text-gray-600">
                    Sessions aujourd'hui: 24
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Inviter un utilisateur"
        size="sm"
      >
        <form onSubmit={handleInviteUser} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="utilisateur@exemple.com"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rôle
            </label>
            <select
              id="role"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as 'admin' | 'manager' | 'user')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="user">Utilisateur</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Envoyer l'invitation
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Role Modal */}
      <Modal
        isOpen={isEditRoleModalOpen}
        onClose={() => setIsEditRoleModalOpen(false)}
        title="Modifier le rôle"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="editRole" className="block text-sm font-medium text-gray-700">
              Nouveau rôle
            </label>
            <select
              id="editRole"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'manager' | 'user')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="user">Utilisateur</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsEditRoleModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleUpdateRole}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </Modal>

      {/* Remove User Modal */}
      <Modal
        isOpen={isRemoveUserModalOpen}
        onClose={() => setIsRemoveUserModalOpen(false)}
        title="Supprimer l'utilisateur"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-yellow-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              Êtes-vous sûr de vouloir supprimer {selectedUser?.name} de votre équipe ?
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsRemoveUserModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleRemoveUser}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 