import React, { useState } from 'react';
import { 
  Calculator, BookOpen, FileText, BarChart3, 
  ChevronDown, ChevronUp, Receipt, Wallet,
  FileSpreadsheet, FileCheck, FileWarning, FileX,
  Banknote, CreditCard, PiggyBank, TrendingUp,
  Settings, Users, Building2, FileSignature,
  Package, Briefcase, Calendar, PieChart,
  DollarSign, Percent, FileBarChart, FileSearch,
  ClipboardList, FileUp, FileDown, FileArchive,
  Smartphone, Globe, Zap, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Module {
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
  color: string;
  features: string[];
}

export default function Accounting() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules: Module[] = [
    {
      title: 'Grand Livre',
      description: 'Gestion du plan comptable et des écritures',
      link: '/accounting/general-ledger',
      icon: BookOpen,
      color: 'bg-blue-500',
      features: [
        'Plan comptable OHADA',
        'Écritures comptables',
        'Journaux récurrents',
        'Clôture périodique',
        'Balance de vérification',
        'Grand livre général'
      ]
    },
    {
      title: 'Comptes Fournisseurs',
      description: 'Gestion des fournisseurs et des factures',
      link: '/accounting/accounts-payable',
      icon: FileText,
      color: 'bg-green-500',
      features: [
        'Gestion des fournisseurs',
        'Factures fournisseurs',
        'Paiements fournisseurs',
        'Suivi des échéances',
        'Rapprochement fournisseurs'
      ]
    },
    {
      title: 'Comptes Clients',
      description: 'Gestion des clients et des factures',
      link: '/accounting/accounts-receivable',
      icon: Receipt,
      color: 'bg-purple-500',
      features: [
        'Gestion des clients',
        'Factures clients',
        'Reçus / Encaissements',
        'Relevés clients',
        'Lettres de relance'
      ]
    },
    {
      title: 'Trésorerie',
      description: 'Gestion de la trésorerie et des banques',
      link: '/accounting/cash-bank',
      icon: Wallet,
      color: 'bg-orange-500',
      features: [
        'Journaux de caisse',
        'Comptes bancaires',
        'Rapprochement bancaire',
        'Suivi des chèques',
        'Tableau de flux de trésorerie'
      ]
    },
    {
      title: 'Immobilisations',
      description: 'Gestion des actifs fixes',
      link: '/accounting/fixed-assets',
      icon: Building2,
      color: 'bg-red-500',
      features: [
        'Enregistrement des actifs',
        'Calcul des amortissements',
        'Réévaluation',
        'Cessions',
        'Suivi de maintenance'
      ]
    },
    {
      title: 'Comptabilité Analytique',
      description: 'Analyse des coûts et des projets',
      link: '/accounting/analytical',
      icon: PieChart,
      color: 'bg-yellow-500',
      features: [
        'Centres de coûts',
        'Projets',
        'Centres de profit',
        'Rapports par segment'
      ]
    },
    {
      title: 'Budgets',
      description: 'Gestion budgétaire et prévisions',
      link: '/accounting/budgeting',
      icon: FileBarChart,
      color: 'bg-indigo-500',
      features: [
        'Budgets annuels',
        'Budgets glissants',
        'Analyse des écarts',
        'Budgets multi-dimensionnels'
      ]
    },
    {
      title: 'Fiscalité',
      description: 'Gestion fiscale et conformité OHADA',
      link: '/accounting/tax',
      icon: Percent,
      color: 'bg-pink-500',
      features: [
        'TVA',
        'Impôts sur le revenu',
        'Taxes locales',
        'Déclarations fiscales',
        'États financiers OHADA'
      ]
    },
    {
      title: 'Paie',
      description: 'Gestion de la paie et des ressources humaines',
      link: '/accounting/payroll',
      icon: Users,
      color: 'bg-teal-500',
      features: [
        'Données employés',
        'Structure des salaires',
        'Traitement de la paie',
        'Taxes et cotisations',
        'Bulletins de paie'
      ]
    },
    {
      title: 'Documents',
      description: 'Gestion documentaire',
      link: '/accounting/documents',
      icon: FileArchive,
      color: 'bg-gray-500',
      features: [
        'Pièces jointes',
        'Archivage',
        'OCR',
        'Modèles de documents'
      ]
    },
    {
      title: 'Rapports',
      description: 'Rapports et tableaux de bord',
      link: '/accounting/reports',
      icon: FileSearch,
      color: 'bg-blue-600',
      features: [
        'Rapports standards',
        'Créateur de rapports',
        'Export Excel/PDF',
        'Widgets de tableau de bord'
      ]
    },
    {
      title: 'Configuration',
      description: 'Paramètres et configuration',
      link: '/accounting/settings',
      icon: Settings,
      color: 'bg-gray-600',
      features: [
        'Année fiscale',
        'Périodes comptables',
        'Mapping des comptes',
        'Taux de change',
        'Règles fiscales'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-7 h-7 text-blue-600" />
            Comptabilité
          </h1>
          <p className="text-gray-500">Gestion comptable complète selon les normes OHADA</p>
        </div>
        <div className="flex gap-2">
          <Link to="/accounting/dashboard" className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            <BarChart3 className="w-4 h-4" /> Tableau de bord
          </Link>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.title}
            className="bg-white rounded-xl border shadow-sm overflow-hidden"
          >
            <Link to={module.link} className="block p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {module.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{module.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${module.color} bg-opacity-10`}>
                  <module.icon className={`w-6 h-6 ${module.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedModule(expandedModule === module.title ? null : module.title);
                }}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {expandedModule === module.title ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Voir moins
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Voir les fonctionnalités
                  </>
                )}
              </button>
              {expandedModule === module.title && (
                <div className="mt-4 space-y-2">
                  {module.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/accounting/journal-entries/new"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouvelle écriture</div>
              <div className="text-sm text-gray-500">Créer une écriture comptable</div>
            </div>
          </Link>
          <Link
            to="/accounting/invoices/new"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Receipt className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Nouvelle facture</div>
              <div className="text-sm text-gray-500">Créer une facture</div>
            </div>
          </Link>
          <Link
            to="/accounting/reports"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Rapports</div>
              <div className="text-sm text-gray-500">Générer des rapports</div>
            </div>
          </Link>
          <Link
            to="/accounting/settings"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="p-2 bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Configuration</div>
              <div className="text-sm text-gray-500">Paramètres comptables</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 