import { randomUUID } from 'crypto';
import { DatabaseClient } from '../../shared/db/database-client';
import { IEmployeeRepository } from '../../employee/data_access/employee.repository.interface';

export interface IEmailAdapter {
  send(to: string, subject: string, body: string): Promise<void>;
}

type NotificationEvent = 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'MODIFIED_PENDING' | 'MODIFIED_APPROVED';

const NOTIFICATION_MATRIX: Record<NotificationEvent, Array<'employee' | 'manager' | 'hr_admin'>> = {
  SUBMITTED:         ['manager'],
  APPROVED:          ['employee'],
  REJECTED:          ['employee'],
  CANCELLED:         ['manager'],
  MODIFIED_PENDING:  ['manager'],
  MODIFIED_APPROVED: ['manager', 'hr_admin'],
};

export class NotificationService {
  constructor(
    private readonly db: DatabaseClient,
    private readonly employeeRepo: IEmployeeRepository,
    private readonly emailAdapter: IEmailAdapter,
  ) {}

  async dispatch(params: {
    leaveRequestId: string;
    event: NotificationEvent;
    employeeId: string;
    managerId: string | null;
  }): Promise<void> {
    const recipientRoles = NOTIFICATION_MATRIX[params.event];
    const recipients: string[] = [];

    if (recipientRoles.includes('employee')) recipients.push(params.employeeId);
    if (recipientRoles.includes('manager') && params.managerId) recipients.push(params.managerId);
    if (recipientRoles.includes('hr_admin')) {
      const admins = await this.employeeRepo.findAll('HR_ADMIN');
      recipients.push(...admins.map(a => a.id));
    }

    for (const recipientId of recipients) {
      const recipient = await this.employeeRepo.findById(recipientId);
      if (!recipient) continue;

      let status: 'SENT' | 'FAILED' = 'SENT';
      let sentAt: Date | null = null;

      try {
        await this.emailAdapter.send(
          recipient.email,
          `Leave Request ${params.event}`,
          `Leave request ${params.leaveRequestId} has been ${params.event.toLowerCase()}.`,
        );
        sentAt = new Date();
      } catch {
        status = 'FAILED';
      }

      await this.db.execute(
        `INSERT INTO notifications (id, leave_request_id, recipient_id, event, channel, status, sent_at, created_at)
         VALUES (?, ?, ?, ?, 'EMAIL', ?, ?, NOW())`,
        [randomUUID(), params.leaveRequestId, recipientId, params.event, status, sentAt],
      );
    }
  }
}
