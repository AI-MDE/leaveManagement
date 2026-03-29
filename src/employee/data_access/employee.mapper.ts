import { EmployeeRecord } from './employee.repository.interface';

export class EmployeeMapper {
  static toDomain(row: any): EmployeeRecord {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      managerId: row.manager_id ?? null,
      role: row.role,
    };
  }
}
