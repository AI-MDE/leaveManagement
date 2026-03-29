"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectLeaveRequestService = void 0;
const domain_event_1 = require("../../shared/events/domain-event");
const leave_request_state_machine_1 = require("../domain/leave-request.state-machine");
const submit_leave_request_service_1 = require("./submit-leave-request.service");
class RejectLeaveRequestService {
    constructor(repo, employeeRepo, auditService, eventPublisher) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
        this.auditService = auditService;
        this.eventPublisher = eventPublisher;
    }
    async execute(cmd, actor) {
        const entity = await this.repo.findById(cmd.leaveRequestId);
        if (!entity)
            throw new submit_leave_request_service_1.RequestNotFoundError();
        const employee = await this.employeeRepo.findById(entity.employeeId);
        if (employee?.managerId !== actor.id)
            throw new submit_leave_request_service_1.ForbiddenError('Only the direct manager can reject');
        leave_request_state_machine_1.LeaveRequestStateMachine.assertRejectable(entity.status);
        entity.reject(actor.id, cmd.managerComment);
        await this.repo.update(entity);
        await this.auditService.append({
            leaveRequestId: entity.id,
            actorId: actor.id,
            action: 'REJECTED',
            fromStatus: 'PENDING',
            toStatus: 'REJECTED',
            comment: cmd.managerComment,
        });
        await this.eventPublisher.publish((0, domain_event_1.createEvent)('LeaveRequestRejectedEvent', {
            leaveRequestId: entity.id,
            employeeId: entity.employeeId,
            reviewedBy: actor.id,
            managerComment: cmd.managerComment ?? null,
        }));
        return this.toDto(entity);
    }
    toDto(e) {
        return {
            id: e.id, employeeId: e.employeeId, leaveTypeId: e.leaveTypeId,
            startDate: e.startDate, endDate: e.endDate, totalDays: e.totalDays,
            reason: e.reason, status: e.status, submittedAt: e.submittedAt.toISOString(),
            reviewedAt: e.reviewedAt?.toISOString() ?? null, reviewedBy: e.reviewedBy,
            managerComment: e.managerComment, version: e.version,
        };
    }
}
exports.RejectLeaveRequestService = RejectLeaveRequestService;
