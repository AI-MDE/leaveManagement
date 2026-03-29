export type EmployeeRole = 'EMPLOYEE' | 'MANAGER' | 'HR_ADMIN';

export interface Employee {
  id: string;
  name: string;
  email: string;
  managerId: string | null;
  role: EmployeeRole;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeWithDirectReports extends Employee {
  directReports: Employee[];
}
