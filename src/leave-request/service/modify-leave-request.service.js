"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyLeaveRequestService = void 0;
const domain_event_1 = require("../../shared/events/domain-event");
const leave_request_state_machine_1 = require("../domain/leave-request.state-machine");
const leave_request_validator_1 = require("../domain/leave-request.validator");
const submit_leave_request_service_1 = require("./submit-leave-request.service");
class ModifyLeaveRequestService {
    constructor(repo, leaveTypeRepo, balanceService, auditService, eventPublisher) {
        this.repo = repo;
        this.leaveTypeRepo = leaveTypeRepo;
        this.balanceService = balanceService;
        this.auditService = auditService;
        this.eventPublisher = eventPublisher;
    }
    async execute(cmd, actor) {
        const entity = await this.repo.findById(cmd.leaveRequestId);
        if (!entity)
            throw new submit_leave_request_service_1.RequestNotFoundError();
        if (actor.id !== entity.employeeId)
            throw new submit_leave_request_service_1.ForbiddenError();
        leave_request_state_machine_1.LeaveRequestStateMachine.assertModifiable(entity.status);
        const leaveType = await this.leaveTypeRepo.findById(entity.leaveTypeId);
        leave_request_validator_1.LeaveRequestValidator.checkAdvanceNotice(cmd.startDate, leaveType.advanceNoticeDays);
        const totalDays = this.calculateDays(cmd.startDate, cmd.endDate);
        const previousStatus = entity.status;
        const wasApproved = leave_request_state_machine_1.LeaveRequestStateMachine.wasApproved(entity.status);
        if (wasApproved && leaveType.requiresBalance) {
            await this.balanceService.restore({
                employeeId: entity.employeeId,
                leaveTypeId: entity.leaveTypeId,
                totalDays: entity.totalDays,
                fromStatus: 'APPROVED',
            }, actor);
            await this.balanceService.validateAndReserve({
                employeeId: entity.employeeId,
                leaveTypeId: entity.leaveTypeId,
                totalDays,
            }, actor);
        }
        const active = await this.repo.findActiveByEmployee(entity.employeeId, entity.id);
        leave_request_validator_1.LeaveRequestValidator.checkOverlap(cmd.startDate, cmd.endDate, active);
        entity.modify(cmd.startDate, cmd.endDate, totalDays, cmd.reason);
        await this.repo.update(entity);
        await this.auditService.append({
            leaveRequestId: entity.id,
            actorId: actor.id,
            action: 'MODIFIED',
            fromStatus: previousStatus,
            toStatus: entity.status,
        });
        await this.eventPublisher.publish((0, domain_event_1.createEvent)('LeaveRequestModifiedEvent', {
            leaveRequestId: entity.id,
            employeeId: entity.employeeId,
            previousStatus,
            newStartDate: entity.startDate,
            newEndDate: entity.endDate,
        }));
        return this.toDto(entity);
    }
    calculateDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
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
exports.ModifyLeaveRequestService = ModifyLeaveRequestService;
