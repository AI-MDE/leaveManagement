"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMapper = void 0;
class EmployeeMapper {
    static toDomain(row) {
        return {
            id: row.id,
            name: row.name,
            email: row.email,
            managerId: row.manager_id ?? null,
            role: row.role,
        };
    }
}
exports.EmployeeMapper = EmployeeMapper;
