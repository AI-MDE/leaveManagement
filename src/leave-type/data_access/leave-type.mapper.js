"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeMapper = void 0;
class LeaveTypeMapper {
    static toDomain(row) {
        return {
            id: row.id,
            code: row.code,
            name: row.name,
            advanceNoticeDays: row.advance_notice_days,
            requiresBalance: Boolean(row.requires_balance),
            isActive: Boolean(row.is_active),
        };
    }
}
exports.LeaveTypeMapper = LeaveTypeMapper;
