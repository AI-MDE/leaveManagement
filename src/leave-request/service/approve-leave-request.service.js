"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveLeaveRequestService = void 0;
const domain_event_1 = require("../../shared/events/domain-event");
const leave_request_state_machine_1 = require("../domain/leave-request.state-machine");
const submit_leave_request_service_1 = require("./submit-leave-request.service");
class ApproveLeaveRequestService {
    constructor(repo, employeeRepo, balanceService, auditService, eventPublisher) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
        this.balanceService = balanceService;
        this.auditService = auditService;
        this.eventPublisher = eventPublisher;
    }
    async execute(cmd, actor) {
        const entity = await this.repo.findById(cmd.leaveRequestId);
        if (!entity)
            throw new submit_leave_request_service_1.RequestNotFoundError();
        const employee = await this.employeeRepo.findById(entity.employeeId);
        if (employee?.managerId !== actor.id)
            throw new submit_leave_request_service_1.ForbiddenError('Only the direct manager can approve');
        leave_request_state_machine_1.LeaveRequestStateMachine.assertApprovable(entity.status);
        await this.balanceService.deduct({
            employeeId: entity.employeeId,
            leaveTypeId: entity.leaveTypeId,
            totalDays: entity.totalDays,
        }, actor);
        entity.approve(actor.id, cmd.managerComment);
        await this.repo.update(entity);
        await this.auditService.append({
            leaveRequestId: entity.id,
            actorId: actor.id,
            action: 'APPROVED',
            fromStatus: 'PENDING',
            toStatus: 'APPROVED',
            comment: cmd.managerComment,
        });
        await this.eventPublisher.publish((0, domain_event_1.createEvent)('LeaveRequestApprovedEvent', {
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
exports.ApproveLeaveRequestService = ApproveLeaveRequestService;
