import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building,
  Tag,
  Shield,
  Users,
  Upload,
  X,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface EmployeeFormData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'on_leave' | 'terminated';
  contractType: 'full_time' | 'part_time' | 'contract';
  roles: string[]; // Array of role IDs
  photo?: string;
}

// Mock roles data - replace with actual API call
const availableRoles: Role[] = [
  { id: 'admin', name: 'Administrateur', description: 'Accès complet au système' },
  { id: 'hr_manager', name: 'Responsable RH', description: 'Gestion des ressources humaines' },
  { id: 'accountant', name: 'Comptable', description: 'Gestion de la comptabilité' },
  { id: 'manager', name: 'Manager', description: 'Gestion d\'équipe' },
  { id: 'employee', name: 'Employé', description: 'Accès basique' },
];

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    hireDate: '',
    status: 'active',
    contractType: 'full_time',
    roles: [],
    photo: undefined,
  });

  useEffect(() => {
    // TODO: Fetch employee data using the id
    // This is a mock implementation
    const mockEmployee = {
      name: 'Jean Dupont',
      position: 'Développeur Full Stack',
      department: 'Informatique',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      hireDate: '2023-01-15',
      status: 'active' as const,
      contractType: 'full_time' as const,
      roles: ['employee', 'manager'], // Mock roles
    };
    setFormData(mockEmployee);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement employee update logic
    console.log('Updating employee:', formData);
    navigate('/hr/employees');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (roleId: string) => {
    setFormData(prev => {
      const roles = prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId];
      return { ...prev, roles };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to your server
      // and get back a URL. For now, we'll create a local URL.
      const photoUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photo: photoUrl }));
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/hr/employees')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-7 h-7 text-blue-600" />
                  Modifier l'employé
                </h1>
                <p className="text-gray-500">Modifier les informations de l'employé</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Informations personnelles
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo de profil
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.photo ? (
                      <div className="relative">
                        <img
                          src={formData.photo}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Choisir une photo</span>
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        PNG, JPG jusqu'à 5MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
                    Date d'embauche
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="hireDate"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Information Card */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Informations professionnelles
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Poste
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Département
                  </label>
                  <div className="relative">
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">Sélectionner un département</option>
                      <option value="Informatique">Informatique</option>
                      <option value="Ressources Humaines">Ressources Humaines</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">
                    Type de contrat
                  </label>
                  <div className="relative">
                    <select
                      id="contractType"
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="full_time">Temps plein</option>
                      <option value="part_time">Temps partiel</option>
                      <option value="contract">Contrat</option>
                    </select>
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="active">Actif</option>
                      <option value="on_leave">En congé</option>
                      <option value="terminated">Terminé</option>
                    </select>
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Assignment Card */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Rôles et permissions
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Sélectionnez les rôles à attribuer à cet employé. Les rôles déterminent les permissions d'accès dans le système.
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableRoles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={formData.roles.includes(role.id)}
                      onChange={() => handleRoleChange(role.id)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <label
                        htmlFor={`role-${role.id}`}
                        className="block text-sm font-medium text-gray-900"
                      >
                        {role.name}
                      </label>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/hr/employees')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" /> Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 