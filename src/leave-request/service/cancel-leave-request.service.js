"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelLeaveRequestService = void 0;
const domain_event_1 = require("../../shared/events/domain-event");
const leave_request_state_machine_1 = require("../domain/leave-request.state-machine");
const submit_leave_request_service_1 = require("./submit-leave-request.service");
class CancelLeaveRequestService {
    constructor(repo, balanceService, auditService, eventPublisher) {
        this.repo = repo;
        this.balanceService = balanceService;
        this.auditService = auditService;
        this.eventPublisher = eventPublisher;
    }
    async execute(cmd, actor) {
        const entity = await this.repo.findById(cmd.leaveRequestId);
        if (!entity)
            throw new submit_leave_request_service_1.RequestNotFoundError();
        if (actor.id !== entity.employeeId && actor.role !== 'HR_ADMIN') {
            throw new submit_leave_request_service_1.ForbiddenError();
        }
        leave_request_state_machine_1.LeaveRequestStateMachine.assertCancellable(entity.status);
        const wasApproved = leave_request_state_machine_1.LeaveRequestStateMachine.wasApproved(entity.status);
        const previousStatus = entity.status;
        if (wasApproved) {
            await this.balanceService.restore({
                employeeId: entity.employeeId,
                leaveTypeId: entity.leaveTypeId,
                totalDays: entity.totalDays,
                fromStatus: 'APPROVED',
            }, actor);
        }
        entity.cancel();
        await this.repo.update(entity);
        await this.auditService.append({
            leaveRequestId: entity.id,
            actorId: actor.id,
            action: 'CANCELLED',
            fromStatus: previousStatus,
            toStatus: 'CANCELLED',
        });
        await this.eventPublisher.publish((0, domain_event_1.createEvent)('LeaveRequestCancelledEvent', {
            leaveRequestId: entity.id,
            employeeId: entity.employeeId,
            previousStatus,
            balanceRestored: wasApproved,
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
exports.CancelLeaveRequestService = CancelLeaveRequestService;
