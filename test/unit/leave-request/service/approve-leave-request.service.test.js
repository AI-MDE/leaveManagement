"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approve_leave_request_service_1 = require("../../../../src/leave-request/service/approve-leave-request.service");
const submit_leave_request_service_1 = require("../../../../src/leave-request/service/submit-leave-request.service");
const leave_request_state_machine_1 = require("../../../../src/leave-request/domain/leave-request.state-machine");
const leave_request_entity_1 = require("../../../../src/leave-request/domain/leave-request.entity");
const pendingProps = () => ({
    id: 'req-001',
    employeeId: 'emp-001',
    leaveTypeId: 'lt-001',
    startDate: '2026-05-01',
    endDate: '2026-05-05',
    totalDays: 5,
    reason: null,
    status: 'PENDING',
    submittedAt: new Date(),
    reviewedAt: null,
    reviewedBy: null,
    managerComment: null,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
});
const actorManager = { id: 'mgr-001', role: 'MANAGER' };
describe('ApproveLeaveRequestService', () => {
    let repo;
    let employeeRepo;
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
        employeeRepo = { findById: jest.fn(), findDirectReports: jest.fn(), findAll: jest.fn() };
        balanceService = { validateAndReserve: jest.fn(), deduct: jest.fn().mockResolvedValue(undefined), restore: jest.fn(), setEntitlement: jest.fn() };
        auditService = { append: jest.fn().mockResolvedValue(undefined) };
        publisher = { publish: jest.fn().mockResolvedValue(undefined) };
        service = new approve_leave_request_service_1.ApproveLeaveRequestService(repo, employeeRepo, balanceService, auditService, publisher);
    });
    it('approves a PENDING request on the happy path', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(pendingProps()));
        employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-001' });
        const result = await service.execute({ leaveRequestId: 'req-001', managerComment: 'Approved' }, actorManager);
        expect(repo.update).toHaveBeenCalledTimes(1);
        expect(balanceService.deduct).toHaveBeenCalledTimes(1);
        expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'APPROVED' }));
        expect(publisher.publish).toHaveBeenCalledTimes(1);
        expect(result.status).toBe('APPROVED');
    });
    it('throws RequestNotFoundError when leave request does not exist', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(service.execute({ leaveRequestId: 'req-999' }, actorManager)).rejects.toThrow(submit_leave_request_service_1.RequestNotFoundError);
    });
    it('throws ForbiddenError when actor is not the direct manager', async () => {
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(pendingProps()));
        employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-OTHER' });
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorManager)).rejects.toThrow(submit_leave_request_service_1.ForbiddenError);
    });
    it('throws InvalidStateError when request is not PENDING', async () => {
        const approvedProps = { ...pendingProps(), status: 'APPROVED' };
        repo.findById.mockResolvedValue(leave_request_entity_1.LeaveRequestEntity.rehydrate(approvedProps));
        employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: 'mgr-001' });
        await expect(service.execute({ leaveRequestId: 'req-001' }, actorManager)).rejects.toThrow(leave_request_state_machine_1.InvalidStateError);
    });
});
