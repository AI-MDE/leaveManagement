"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestController = void 0;
class LeaveRequestController {
    constructor(service, queryService) {
        this.service = service;
        this.queryService = queryService;
    }
    async submit(body, actor) {
        return this.service.submit({
            employeeId: actor.id,
            leaveTypeId: body.leaveTypeId,
            startDate: body.startDate,
            endDate: body.endDate,
            reason: body.reason,
        }, actor);
    }
    async modify(id, body, actor) {
        return this.service.modify({
            leaveRequestId: id,
            startDate: body.startDate,
            endDate: body.endDate,
            reason: body.reason,
        }, actor);
    }
    async approve(id, body, actor) {
        return this.service.approve({ leaveRequestId: id, managerComment: body.managerComment }, actor);
    }
    async reject(id, body, actor) {
        return this.service.reject({ leaveRequestId: id, managerComment: body.managerComment }, actor);
    }
    async cancel(id, actor) {
        return this.service.cancel({ leaveRequestId: id }, actor);
    }
    async list(query, actor) {
        if (actor.role === 'HR_ADMIN')
            return this.queryService.getAllForHrAdmin(query);
        if (actor.role === 'MANAGER')
            return this.queryService.getPendingForManager({ managerId: actor.id });
        return this.queryService.getByEmployee({ employeeId: actor.id, ...query });
    }
    async getById(id) {
        return this.queryService.getById({ id });
    }
}
exports.LeaveRequestController = LeaveRequestController;
