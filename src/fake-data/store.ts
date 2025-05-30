export const metricCard = [
    {
        title: 'Chiffre d\'affaires',
        value: '€125,430',
        change: '+12.5%',
        trend: 'up',
        //icon: <DollarSign className="w-6 h-6" />,
        subtitle: 'Ce mois'
      },
      {
        title: 'Clients actifs',
        value: '248',
        change: '+8.2%',
        trend: 'up',
       // icon: <Users className="w-6 h-6" />,
        subtitle: 'Total'
      },
      {
        title: 'Commandes en cours',
        value: '45',
        change: '-3.1%',
        trend: 'down',
        //icon: <ShoppingCart className="w-6 h-6" />,
        subtitle: 'En attente'
      },
      {
        title: 'Stock disponible',
        value: '1,234',
        change: '+5.7%',
        trend: 'up',
        //icon: <FileText className="w-6 h-6" />,
        subtitle: 'Unités'
      }
]

export const recentActivities = [
    {
      type: 'vente',
      title: 'Nouvelle commande',
      description: 'Commande #12345 de Jean Dupont',
      date: 'Il y a 5 minutes',
      status: 'success'
    },
    {
      type: 'stock',
      title: 'Alerte stock',
      description: 'Stock faible pour le produit XYZ',
      date: 'Il y a 1 heure',
      status: 'warning'
    },
    {
      type: 'facture',
      title: 'Facture impayée',
      description: 'Facture #7890 en retard de paiement',
      date: 'Il y a 2 heures',
      status: 'error'
    },
    {
      type: 'client',
      title: 'Nouveau client',
      description: 'Marie Martin a créé un compte',
      date: 'Il y a 3 heures',
      status: 'success'
    }
  ];
  
  export const quickActions = [
    {
      title: 'Nouvelle vente',
    //   icon: <ShoppingCart className="w-6 h-6" />,
      path: '/sales/new'
    },
    {
      title: 'Nouvelle facture',
      //icon: <FileText className="w-6 h-6" />,
      path: '/invoices/new'
    },
    {
      title: 'Gestion des stocks',
      //icon: <FileText className="w-6 h-6" />,
      path: '/stock'
    },
    {
      title: 'Clients',
      //icon: <Users className="w-6 h-6" />,
      path: '/crm/customers'
    }
  ];
  
  // Enhanced financial data with more details
  export const financialData = [
    { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600, target: 3500 },
    { month: 'Fév', revenue: 3000, expenses: 1398, profit: 1602, target: 3500 },
    { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800, target: 3500 },
    { month: 'Avr', revenue: 2780, expenses: 3908, profit: -1128, target: 3500 },
    { month: 'Mai', revenue: 1890, expenses: 4800, profit: -2910, target: 3500 },
    { month: 'Juin', revenue: 2390, expenses: 3800, profit: -1410, target: 3500 },
  ];
  
  // Enhanced client data with more categories
  export const clientData = [
    { name: 'Particuliers', value: 400, fill: '#0088FE' },
    { name: 'Entreprises', value: 300, fill: '#00C49F' },
    { name: 'Gouvernement', value: 200, fill: '#FFBB28' },
    { name: 'ONG', value: 100, fill: '#FF8042' },
    { name: 'Éducation', value: 150, fill: '#8884d8' }
  ];
  
  // Bank account data
  export const bankAccounts = [
    {
      id: 1,
      name: 'Compte Principal',
      bank: 'BNP Paribas',
      balance: 125430.50,
      currency: 'EUR',
      lastTransaction: '2024-03-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Compte Épargne',
      bank: 'Société Générale',
      balance: 75000.00,
      currency: 'EUR',
      lastTransaction: '2024-03-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Compte Pro',
      bank: 'Crédit Agricole',
      balance: 45000.75,
      currency: 'EUR',
      lastTransaction: '2024-03-14',
      status: 'active'
    }
  ];
  