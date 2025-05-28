import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  ShoppingCart,
  ShoppingBag,
  MessageSquare,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Activity,
  UserPlus,
  Building,
  FileSpreadsheet,
  BookOpen,
  Calculator,
  BookText
} from 'lucide-react';

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Tableau de bord',
    path: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: 'CRM',
    path: '/crm',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        title: 'Tableau de bord',
        path: '/crm',
        icon: <Activity className="w-5 h-5" />,
      },
      {
        title: 'Clients',
        path: '/crm/customers',
        icon: <UserPlus className="w-5 h-5" />,
      },
      {
        title: 'Fournisseurs',
        path: '/crm/suppliers',
        icon: <Building className="w-5 h-5" />,
      },
      {
        title: 'Documents',
        path: '/crm/documents',
        icon: <FileSpreadsheet className="w-5 h-5" />,
      },
    ],
  },
  {
    title: 'Comptabilité',
    path: '/accounting',
    icon: <Calculator className="w-5 h-5" />,
    children: [
      {
        title: 'Plan Comptable',
        path: '/accounting/chart-of-accounts',
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        title: 'Configuration',
        path: '/accounting/chart-of-accounts/config',
        icon: <Settings className="w-5 h-5" />,
      },
      {
        title: 'Journal Comptable',
        path: '/accounting/journal',
        icon: <BookText className="w-5 h-5" />,
      },
    ],
  },
  {
    title: 'Ventes',
    path: '/sales',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    title: 'Achats',
    path: '/buy',
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const active = isActive(item.path);

    return (
      <div key={item.path}>
        <button
          onClick={() => hasChildren ? toggleItem(item.path) : undefined}
          className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            active
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.title}</span>
          </div>
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          )}
        </button>
        {hasChildren && isExpanded && item.children && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map(child => (
              <Link
                key={child.path}
                to={child.path}
                className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(child.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {child.icon}
                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex-1 space-y-1">
        {sidebarItems.map(renderSidebarItem)}
      </div>
      <div className="pt-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
} 