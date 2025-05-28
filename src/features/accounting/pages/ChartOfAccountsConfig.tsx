import React, { useState } from 'react';
import {
  Settings,
  Save,
  X,
  AlertCircle,
  Info,
  ChevronRight,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';

interface AccountClass {
  id: number;
  code: string;
  name: string;
}

interface Account {
  id: number;
  code: string;
  name: string;
  accountClassId: number;
}

interface UserSubAccount {
  id: number;
  code: string;
  name: string;
  companyId: string;
  accountId: number;
  isCustom: boolean;
}

const initialAccountClasses: AccountClass[] = [
  { id: 1, code: '1', name: 'Comptes de capitaux' },
  { id: 2, code: '2', name: 'Comptes d\'immobilisations' },
  { id: 3, code: '3', name: 'Comptes de stocks' },
  { id: 4, code: '4', name: 'Comptes de tiers' },
  { id: 5, code: '5', name: 'Comptes financiers' },
  { id: 6, code: '6', name: 'Comptes de charges' },
  { id: 7, code: '7', name: 'Comptes de produits' },
  { id: 8, code: '8', name: 'Comptes spéciaux' },
  { id: 9, code: '9', name: 'Comptes de gestion' }
];

export default function ChartOfAccountsConfig() {
  const [accountClasses, setAccountClasses] = useState(initialAccountClasses);
  const [editingClass, setEditingClass] = useState<AccountClass | null>(null);
  const [newClass, setNewClass] = useState<Partial<AccountClass>>({});

  const handleSaveClass = (classId: number) => {
    if (editingClass) {
      setAccountClasses(prev =>
        prev.map(ac =>
          ac.id === classId
            ? { ...ac, code: editingClass.code, name: editingClass.name }
            : ac
        )
      );
      setEditingClass(null);
    }
  };

  const handleAddClass = () => {
    if (newClass.code && newClass.name) {
      const newId = Math.max(...accountClasses.map(ac => ac.id)) + 1;
      setAccountClasses(prev => [...prev, { id: newId, code: newClass.code!, name: newClass.name! }]);
      setNewClass({});
    }
  };

  const handleDeleteClass = (classId: number) => {
    setAccountClasses(prev => prev.filter(ac => ac.id !== classId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Configuration du Plan Comptable</h1>
        </div>
        <p className="text-gray-600">
          Configurez les classes de comptes et leurs paramètres
        </p>
      </div>

      {/* Configuration Sections */}
      <div className="space-y-6">
        {/* Account Classes */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Classes de Comptes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {accountClasses.map(accountClass => (
              <div key={accountClass.id} className="p-4">
                {editingClass?.id === accountClass.id ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={editingClass.code}
                      onChange={(e) => setEditingClass({ ...editingClass, code: e.target.value })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Code"
                    />
                    <input
                      type="text"
                      value={editingClass.name}
                      onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom"
                    />
                    <button
                      onClick={() => handleSaveClass(accountClass.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingClass(null)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900">{accountClass.code}</span>
                      <span className="text-gray-900">{accountClass.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingClass(accountClass)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClass(accountClass.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Add New Class */}
            <div className="p-4 bg-gray-50">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newClass.code || ''}
                  onChange={(e) => setNewClass({ ...newClass, code: e.target.value })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Code"
                />
                <input
                  type="text"
                  value={newClass.name || ''}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nom"
                />
                <button
                  onClick={handleAddClass}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                À propos des classes de comptes
              </h3>
              <p className="text-sm text-blue-700">
                Les classes de comptes sont les catégories principales de votre plan comptable.
                Chaque classe doit avoir un code unique à un chiffre et un nom descriptif.
                Les comptes seront organisés sous ces classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 