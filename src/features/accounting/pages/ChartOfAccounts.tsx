import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Search,
  Filter,
  FileSpreadsheet,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountClass {
  id: number;
  code: string;
  name: string;
  accounts: Account[];
}

interface Account {
  id: number;
  code: string;
  name: string;
  accountClassId: number;
  subAccounts: UserSubAccount[];
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
  {
    id: 1,
    code: '1',
    name: 'Comptes de capitaux',
    accounts: [
      {
        id: 1,
        code: '10',
        name: 'Capital et réserves',
        accountClassId: 1,
        subAccounts: []
      },
      {
        id: 2,
        code: '11',
        name: 'Report à nouveau',
        accountClassId: 1,
        subAccounts: []
      }
    ]
  },
  {
    id: 2,
    code: '2',
    name: 'Comptes d\'immobilisations',
    accounts: [
      {
        id: 3,
        code: '20',
        name: 'Immobilisations incorporelles',
        accountClassId: 2,
        subAccounts: []
      },
      {
        id: 4,
        code: '21',
        name: 'Immobilisations corporelles',
        accountClassId: 2,
        subAccounts: []
      }
    ]
  }
];

export default function ChartOfAccounts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClasses, setExpandedClasses] = useState<number[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const toggleClass = (classId: number) => {
    setExpandedClasses(prev =>
      prev.includes(classId)
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const filteredClasses = initialAccountClasses.filter(accountClass => {
    const matchesSearch = 
      accountClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accountClass.code.includes(searchTerm) ||
      accountClass.accounts.some(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.code.includes(searchTerm)
      );
    return matchesSearch;
  });

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
              <BookOpen className="w-7 h-7 text-blue-600" />
              Plan Comptable
            </h1>
            <p className="text-gray-500">Gestion du plan comptable OHADA</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une classe ou un compte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Nouvelle Classe
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FileSpreadsheet className="w-5 h-5" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Chart of Accounts */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredClasses.map(accountClass => (
            <div key={accountClass.id}>
              <button
                onClick={() => toggleClass(accountClass.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {expandedClasses.includes(accountClass.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{accountClass.code}</span>
                      <span className="text-gray-900">{accountClass.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </button>
              {expandedClasses.includes(accountClass.id) && (
                <div className="pl-12 divide-y divide-gray-100">
                  {accountClass.accounts.map(account => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{account.code}</span>
                            <span className="text-gray-900">{account.name}</span>
                          </div>
                          {account.subAccounts.length > 0 && (
                            <div className="mt-1 text-sm text-gray-500">
                              {account.subAccounts.length} sous-compte(s)
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedAccount(account)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full flex items-center gap-2 p-4 text-sm text-blue-600 hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                    Ajouter un compte
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun résultat</h3>
          <p className="text-gray-500">
            Aucune classe ou compte ne correspond à votre recherche
          </p>
        </div>
      )}
    </div>
  );
} 