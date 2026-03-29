import { AuditRepository } from '../data_access/audit.repository';
import { AppendAuditEntryCommand, IAuditService } from './audit.service.interface';

export class AuditService implements IAuditService {
  constructor(private readonly repo: AuditRepository) {}

  async append(cmd: AppendAuditEntryCommand): Promise<void> {
    await this.repo.insert(cmd);
  }
}
