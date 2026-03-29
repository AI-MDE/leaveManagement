import { LeaveRequestEntity } from '../domain/leave-request.entity';

export interface ILeaveRequestRepository {
  findById(id: string): Promise<LeaveRequestEntity | null>;
  findActiveByEmployee(employeeId: string, excludeId?: string): Promise<Array<{ id: string; startDate: string; endDate: string }>>;
  save(entity: LeaveRequestEntity): Promise<void>;
  update(entity: LeaveRequestEntity): Promise<void>;
}
