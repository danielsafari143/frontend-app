export interface RessourceType {
  type: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export const hrPermission: Array<RessourceType> = [
  {
    type: 'reports',
    read: true,
    create: true,
    update: true,
    delete: true
  },
  {
    type: 'employee',
    read: true,
    create: true,
    update: true,
    delete: true
  },
  {
    type: 'contracts',
    read: true,
    create: true,
    update: true,
    delete: true
  },
  {
    type: 'planning',
    read: true,
    create: true,
    update: true,
    delete: true
  },
  {
    type: 'dashboard',
    read: false, // Keeping read as false as per your original request
    create: true,
    update: true,
    delete: true
  },
  // --- New entries based on your menuItems with empty 'type' ---
  {
    type: 'disciplinary',
    read: false,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'training',
    read: false,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'evaluation',
    read: false,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'payroll',
    read: false,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'leaves',
    read: true,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'recruitment',
    read: false,
    create: false,
    update: false,
    delete: false
  },
  {
    type: 'compliance',
    read: true,
    create: false,
    update: false,
    delete: false
  }
];