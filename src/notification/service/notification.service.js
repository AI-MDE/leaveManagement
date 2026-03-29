"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const crypto_1 = require("crypto");
const NOTIFICATION_MATRIX = {
    SUBMITTED: ['manager'],
    APPROVED: ['employee'],
    REJECTED: ['employee'],
    CANCELLED: ['manager'],
    MODIFIED_PENDING: ['manager'],
    MODIFIED_APPROVED: ['manager', 'hr_admin'],
};
class NotificationService {
    constructor(db, employeeRepo, emailAdapter) {
        this.db = db;
        this.employeeRepo = employeeRepo;
        this.emailAdapter = emailAdapter;
    }
    async dispatch(params) {
        const recipientRoles = NOTIFICATION_MATRIX[params.event];
        const recipients = [];
        if (recipientRoles.includes('employee'))
            recipients.push(params.employeeId);
        if (recipientRoles.includes('manager') && params.managerId)
            recipients.push(params.managerId);
        if (recipientRoles.includes('hr_admin')) {
            const admins = await this.employeeRepo.findAll('HR_ADMIN');
            recipients.push(...admins.map(a => a.id));
        }
        for (const recipientId of recipients) {
            const recipient = await this.employeeRepo.findById(recipientId);
            if (!recipient)
                continue;
            let status = 'SENT';
            let sentAt = null;
            try {
                await this.emailAdapter.send(recipient.email, `Leave Request ${params.event}`, `Leave request ${params.leaveRequestId} has been ${params.event.toLowerCase()}.`);
                sentAt = new Date();
            }
            catch {
                status = 'FAILED';
            }
            await this.db.execute(`INSERT INTO notifications (id, leave_request_id, recipient_id, event, channel, status, sent_at, created_at)
         VALUES (?, ?, ?, ?, 'EMAIL', ?, ?, NOW())`, [(0, crypto_1.randomUUID)(), params.leaveRequestId, recipientId, params.event, status, sentAt]);
        }
    }
}
exports.NotificationService = NotificationService;
