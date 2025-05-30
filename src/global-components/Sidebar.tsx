import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Calculator,
  Package,
  Settings,
  Users,
  Menu,
  X,
  ShoppingCart,
  ShoppingBag,
  UserCircle,
  UserCog,
  Building2,
  BarChart3,
  Receipt,
  Wallet,
  Landmark,
  Briefcase,
  Search,
  History,
  FileSpreadsheet,
  CreditCard,
  HelpCircle,
  BookOpen,
  Lightbulb,
  MessageSquare,
  LogOut,
  Building2 as CompanyIcon,
  UserPlus,
  Bell,
  FileType,
  ChevronLeft,
  ChevronRight,
  Brain,
  Calendar,
  GitBranch,
  ArrowUpDown,
  LayoutDashboard,
  Tag,
} from "lucide-react";

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Entreprises', href: '/companies', icon: Building2 },
  { name: 'Factures', href: '/invoices', icon: FileText },
  { name: 'Ventes', href: '/sales', icon: ShoppingCart },
  { name: 'Achats', href: '/buy', icon: ShoppingBag },
  { name: 'Gestion des Stocks', href: '/inventory', icon: Package },
  { name: 'CRM', href: '/crm', icon: UserCircle },
  { name: 'Comptabilité', href: '/accounting', icon: Calculator },
  { name: 'Plan Comptable', href: '/accounting/chart-of-accounts', icon: BookOpen },
  { name: 'Fiscalité', href: '/fiscalites', icon: Landmark },
  { name: 'Ressources Humaines', href: '/hr', icon: UserCog },
  { name: 'Employés', href: '/hr/employees', icon: Users },
  { name: 'Gestion des Congés', href: '/hr/leaves', icon: Calendar },
  { name: 'Finance & Trésorerie', href: '/finance', icon: Wallet },
  { name: 'Trésorerie', href: '/finance/treasury', icon: Landmark },
  { name: 'Flux de Trésorerie', href: '/finance/cash-flow', icon: ArrowUpDown },
  { name: 'Budgets & Prévisions', href: '/finance/budgeting', icon: FileSpreadsheet },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapse(collapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItemClasses = (path: string) => `
    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-blue-50 text-blue-700 font-medium' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }
  `;

  const sectionTitleClasses = `
    text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4
    ${isCollapsed ? "hidden" : ""}
  `;

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300 z-[55] ${
          isCollapsed ? "w-20" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="px-4 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
            {!isCollapsed && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                FinCalc
              </h2>
            )}
            <button
              onClick={() => handleCollapse(!isCollapsed)}
              className="p-1.5 rounded-lg hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {/* Section 1 - Navigation Principale */}
            <div className="mb-6">
              <h3 className={sectionTitleClasses}>
                Navigation Principale
              </h3>
              <ul className="space-y-1 px-2">
                {navigation.map((item) => {
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`flex-shrink-0 ${
                            isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                          aria-hidden="true"
                        />
                        {!isCollapsed && <span className="text-sm">{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Section 2 - Outils et Opérations */}
            <div className="mb-6">
              <h3 className={sectionTitleClasses}>
                Outils et Opérations
              </h3>
              <ul className="space-y-1 px-2">
                <li>
                  <Link to="/reports" className={navItemClasses("/reports")}>
                    <FileText size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Rapports & Tableaux de bord</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/export" className={navItemClasses("/export")}>
                    <FileSpreadsheet size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Exportations CSV/Excel</span>}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 3 - Gestion de l'entreprise */}
            <div className="mb-6">
              <h3 className={sectionTitleClasses}>
                Gestion de l'entreprise
              </h3>
              <ul className="space-y-1 px-2">
                <li>
                  <Link to="/company/settings" className={navItemClasses("/company/settings")}>
                    <Building2 size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Mon Entreprise</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/company/users" className={navItemClasses("/company/users")}>
                    <UserPlus size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Utilisateurs & Rôles</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/subscription" className={navItemClasses("/subscription")}>
                    <CreditCard size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Plan d'abonnement</span>}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 4 - Paramètres */}
            <div className="mb-6">
              <h3 className={sectionTitleClasses}>
                Paramètres
              </h3>
              <ul className="space-y-1 px-2">
                <li>
                  <Link to="/settings" className={navItemClasses("/settings")}>
                    <Settings size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Paramètres Généraux</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/settings/notifications" className={navItemClasses("/settings/notifications")}>
                    <Bell size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Notifications & Rappels</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/settings/invoices" className={navItemClasses("/settings/invoices")}>
                    <FileType size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Modèles de factures</span>}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section 5 - Assistance & Aide */}
            <div className="mb-6">
              <h3 className={sectionTitleClasses}>
                Assistance & Aide
              </h3>
              <ul className="space-y-1 px-2">
                <li>
                  <Link to="/help" className={navItemClasses("/help")}>
                    <HelpCircle size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Centre d'Aide</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/resources/ohada" className={navItemClasses("/resources/ohada")}>
                    <BookOpen size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Documentation OHADA</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/assistant" className={navItemClasses("/assistant")}>
                    <Lightbulb size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Assistant intelligent</span>}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/accountant-copilot" 
                    className={navItemClasses("/accountant-copilot")}
                    title="Assistant IA spécialisé en comptabilité OHADA"
                  >
                    <Brain size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex flex-col">
                        <span className="text-sm">Copilote Comptable</span>
                        <span className="text-xs text-gray-500">IA OHADA</span>
                      </div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/support" className={navItemClasses("/support")}>
                    <MessageSquare size={20} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm">Support client</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-100">
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
                  <CompanyIcon size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">Changer d'entreprise</span>}
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200">
                  <LogOut size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">Déconnexion</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[54] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
