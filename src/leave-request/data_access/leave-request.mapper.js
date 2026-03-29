"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestMapper = void 0;
const leave_request_entity_1 = require("../domain/leave-request.entity");
class LeaveRequestMapper {
    static toDomain(row) {
        const props = {
            id: row.id,
            employeeId: row.employee_id,
            leaveTypeId: row.leave_type_id,
            startDate: row.start_date,
            endDate: row.end_date,
            totalDays: parseFloat(row.total_days),
            reason: row.reason,
            status: row.status,
            submittedAt: row.submitted_at,
            reviewedAt: row.reviewed_at,
            reviewedBy: row.reviewed_by,
            managerComment: row.manager_comment,
            version: row.version,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
        return leave_request_entity_1.LeaveRequestEntity.rehydrate(props);
    }
    static toRow(entity) {
        return {
            id: entity.id,
            employee_id: entity.employeeId,
            leave_type_id: entity.leaveTypeId,
            start_date: entity.startDate,
            end_date: entity.endDate,
            total_days: entity.totalDays,
            reason: entity.reason,
            status: entity.status,
            submitted_at: entity.submittedAt,
            reviewed_at: entity.reviewedAt,
            reviewed_by: entity.reviewedBy,
            manager_comment: entity.managerComment,
            version: entity.version,
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
        };
    }
}
exports.LeaveRequestMapper = LeaveRequestMapper;
