export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface Notification {
  id: string;
  leaveRequestId: string;
  recipientEmail: string;
  eventType: string;
  subject: string;
  body: string;
  status: NotificationStatus;
  sentAt?: string;
  createdAt: string;
}
