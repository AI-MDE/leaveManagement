"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditRepository = void 0;
const crypto_1 = require("crypto");
class AuditRepository {
    constructor(db) {
        this.db = db;
    }
    async insert(cmd) {
        await this.db.execute(`INSERT INTO leave_audit_entries
       (id, leave_request_id, actor_id, action, from_status, to_status, comment, snapshot, occurred_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())`, [
            (0, crypto_1.randomUUID)(), cmd.leaveRequestId, cmd.actorId, cmd.action,
            cmd.fromStatus, cmd.toStatus, cmd.comment ?? null,
            cmd.snapshot ? JSON.stringify(cmd.snapshot) : null,
        ]);
    }
}
exports.AuditRepository = AuditRepository;
