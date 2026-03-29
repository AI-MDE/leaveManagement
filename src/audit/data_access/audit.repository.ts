import { randomUUID } from 'crypto';
import { DatabaseClient } from '../../shared/db/database-client';
import { AppendAuditEntryCommand } from '../service/audit.service.interface';

export class AuditRepository {
  constructor(private readonly db: DatabaseClient) {}

  async insert(cmd: AppendAuditEntryCommand): Promise<void> {
    await this.db.execute(
      `INSERT INTO leave_audit_entries
       (id, leave_request_id, actor_id, action, from_status, to_status, comment, snapshot, occurred_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now())`,
      [
        randomUUID(), cmd.leaveRequestId, cmd.actorId, cmd.action,
        cmd.fromStatus, cmd.toStatus, cmd.comment ?? null,
        cmd.snapshot ? JSON.stringify(cmd.snapshot) : null,
      ],
    );
  }
  // No update or delete — append-only
}
