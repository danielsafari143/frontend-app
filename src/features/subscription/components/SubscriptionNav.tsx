import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CreditCard,
  Users,
  History,
  Settings,
  FileText,
  BarChart,
} from 'lucide-react';

export default function SubscriptionNav() {
  const links = [
    {
      to: '/subscription',
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Aperçu',
    },
    {
      to: '/subscription/plans',
      icon: <FileText className="w-5 h-5" />,
      label: 'Plans',
    },
    {
      to: '/subscription/comparison',
      icon: <BarChart className="w-5 h-5" />,
      label: 'Comparaison',
    },
    {
      to: '/subscription/billing',
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Facturation',
    },
    {
      to: '/subscription/users',
      icon: <Users className="w-5 h-5" />,
      label: 'Utilisateurs',
    },
    {
      to: '/subscription/history',
      icon: <History className="w-5 h-5" />,
      label: 'Historique',
    },
    {
      to: '/subscription/settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'Paramètres',
    },
  ];

  return (
    <nav className="bg-white rounded-lg border p-4">
      <div className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
} 