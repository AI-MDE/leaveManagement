"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cancel_leave_request_service_1 = require("../../../../src/leave-request/service/cancel-leave-request.service");
const submit_leave_request_service_1 = require("../../../../src/leave-request/service/submit-leave-request.service");
const leave_request_state_machine_1 = require("../../../../src/leave-request/domain/leave-request.state-machine");
const leave_request_entity_1 = require("../../../../src/leave-request/domain/leave-request.entity");
const makeProps = (status = 'PENDING') => ({
    id: 'req-001',
    employeeId: 'emp-001',
    leaveTypeId: 'lt-001',
    startDate: '2026-05-01',
    endDate: '2026-05-05',
    totalDays: 5,
    reason: null,
    status,
    submittedAt: new Date(),
    reviewedAt: null,
    reviewedBy: null,
    managerComment: null,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
});
const actorOwner = { id: 'emp-001', role: 'EMPLOYEE' };
const actorHrAdmin = { id: 'hr-001', role: 'HR_ADMIN' };
const actorOther = { id: 'emp-999', role: 'EMPLOYEE' };
describe('CancelLeaveRequestService', () => {
    let repo;
    let balanceService;
    let auditService;
    let publisher;
    let service;
    beforeEach(() => {
        repo = {
            findById: jest.fn(),
            findActiveByEmployee: jest.fn(),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(undefined),
        };
        balanceService = { validateAndReserve: jest.fn(), deduct: jest.fn(), restore: jest.fn().mockResolvedValue(undefined), setEntitlement: jest.fn() };
        auditService = { append: jest.fn().mockResolvedValue(undefined) };
        publisher = { publish: jest.fn().mockResolvedValue(undefined) };
        service = new cancel_leave_request_service_1.CancelLeaveRequestService(repo, balanceService, auditService, publisher);
    });
    it('cancels a PENDING request on the happy path', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('PENDING')));
        const result = await service.execute({ leaveRequestId: 'req-001' }, actorOwner);
        expect(repo.update).toHaveBeenCalledTimes(1);
        expect(balanceService.restore).not.toHaveBeenCalled();
        expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'CANCELLED' }));
        expect(result.status).toBe('CANCELLED');
    });
    it('restores balance when cancelling an APPROVED request (BR-004)', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('APPROVED')));
        await service.execute({ leaveRequestId: 'req-001' }, actorOwner);
        expect(balanceService.restore).toHaveBeenCalledTimes(1);
    });
    it('allows HR Admin to cancel any request', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('PENDING')));
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorHrAdmin)).resolves.not.toThrow();
    });
    it('throws RequestNotFoundError when leave request does not exist', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(service.execute({ leaveRequestId: 'req-999' }, actorOwner)).rejects.toThrow(submit_leave_request_service_1.RequestNotFoundError);
    });
    it('throws ForbiddenError when actor is not the owner or HR Admin', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('PENDING')));
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorOther)).rejects.toThrow(submit_leave_request_service_1.ForbiddenError);
    });
    it('throws InvalidStateError when request is CANCELLED', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('CANCELLED')));
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorOwner)).rejects.toThrow(leave_request_state_machine_1.InvalidStateError);
    });
    it('throws InvalidStateError when request is REJECTED', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(makeProps('REJECTED')));
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorOwner)).rejects.toThrow(leave_request_state_machine_1.InvalidStateError);
    });
});
