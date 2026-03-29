export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  managerId: string | null;
  role: 'EMPLOYEE' | 'MANAGER' | 'HR_ADMIN';
}

export interface IEmployeeRepository {
  findById(id: string): Promise<EmployeeRecord | null>;
  findByEmail(email: string): Promise<EmployeeRecord | null>;
  findDirectReports(managerId: string): Promise<EmployeeRecord[]>;
  findAll(role?: string): Promise<EmployeeRecord[]>;
  save(record: EmployeeRecord): Promise<void>;
  update(record: EmployeeRecord): Promise<void>;
}
