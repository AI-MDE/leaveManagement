"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
class AuditService {
    constructor(repo) {
        this.repo = repo;
    }
    async append(cmd) {
        await this.repo.insert(cmd);
    }
}
exports.AuditService = AuditService;
