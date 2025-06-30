export interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    hireDate: string;
    status: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'ON_LEAVE';
    contractType: 'full_time' | 'part_time' | 'contract';
    roles: Role[];
    photo?: string; // URL of the employee's photo
  }

  interface Role {
    id: string;
    name: string;
    description: string;
  }