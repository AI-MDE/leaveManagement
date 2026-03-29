"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_leave_request_service_1 = require("../../../../src/leave-request/service/submit-leave-request.service");
const leave_request_validator_1 = require("../../../../src/leave-request/domain/leave-request.validator");
const makeRepo = () => ({
    findById: jest.fn(),
    findActiveByEmployee: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
});
const makeLeaveTypeRepo = () => ({
    findById: jest.fn(),
    findAll: jest.fn(),
    findActive: jest.fn(),
    save: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
});
const makeEmployeeRepo = () => ({
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findDirectReports: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
});
const makeBalanceService = () => ({
    validateAndReserve: jest.fn().mockResolvedValue(undefined),
    deduct: jest.fn().mockResolvedValue(undefined),
    restore: jest.fn().mockResolvedValue(undefined),
    setEntitlement: jest.fn().mockResolvedValue(undefined),
});
const makeAuditService = () => ({
    append: jest.fn().mockResolvedValue(undefined),
});
const makePublisher = () => ({
    publish: jest.fn().mockResolvedValue(undefined),
});
const farFutureDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return d.toISOString().split('T')[0];
};
const endDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 65);
    return d.toISOString().split('T')[0];
};
const actorEmployee = { id: 'emp-001', role: 'EMPLOYEE' };
const validCmd = () => ({
    employeeId: 'emp-001',
    leaveTypeId: 'lt-001',
    startDate: farFutureDate(),
    endDate: endDate(),
    reason: 'Holiday',
});
const activeLeaveType = { id: 'lt-001', advanceNoticeDays: 14, requiresBalance: true, isActive: true };
const employeeWithManager = { id: 'emp-001', managerId: 'mgr-001' };
describe('SubmitLeaveRequestService', () => {
    let repo;
    let leaveTypeRepo;
    let employeeRepo;
    let balanceService;
    let auditService;
    let publisher;
    let service;
    beforeEach(() => {
        repo = makeRepo();
        leaveTypeRepo = makeLeaveTypeRepo();
        employeeRepo = makeEmployeeRepo();
        balanceService = makeBalanceService();
        auditService = makeAuditService();
        publisher = makePublisher();
        service = new submit_leave_request_service_1.SubmitLeaveRequestService(repo, leaveTypeRepo, employeeRepo, balanceService, auditService, publisher);
    });
    it('creates and saves a leave request on the happy path', async () => {
        leaveTypeRepo.findById.mockResolvedValue(activeLeaveType);
        employeeRepo.findById.mockResolvedValue(employeeWithManager);
        const result = await service.execute(validCmd(), actorEmployee);
        expect(repo.save).toHaveBeenCalledTimes(1);
        expect(auditService.append).toHaveBeenCalledWith(expect.objectContaining({ action: 'SUBMITTED' }));
        expect(publisher.publish).toHaveBeenCalledTimes(1);
        expect(result.status).toBe('PENDING');
    });
    it('throws ForbiddenError when actor is not the employee submitting', async () => {
        const otherActor = { id: 'emp-999', role: 'EMPLOYEE' };
        await expect(service.execute(validCmd(), otherActor)).rejects.toThrow(submit_leave_request_service_1.ForbiddenError);
    });
    it('throws LeaveTypeNotFoundError when leave type is inactive', async () => {
        leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, isActive: false });
        await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(submit_leave_request_service_1.LeaveTypeNotFoundError);
    });
    it('throws LeaveTypeNotFoundError when leave type does not exist', async () => {
        leaveTypeRepo.findById.mockResolvedValue(null);
        await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(submit_leave_request_service_1.LeaveTypeNotFoundError);
    });
    it('throws ManagerNotAssignedError when employee has no manager', async () => {
        leaveTypeRepo.findById.mockResolvedValue(activeLeaveType);
        employeeRepo.findById.mockResolvedValue({ id: 'emp-001', managerId: null });
        await expect(service.execute(validCmd(), actorEmployee)).rejects.toThrow(submit_leave_request_service_1.ManagerNotAssignedError);
    });
    it('throws AdvanceNoticeViolationError when start date is too soon', async () => {
        leaveTypeRepo.findById.mockResolvedValue(activeLeaveType);
        employeeRepo.findById.mockResolvedValue(employeeWithManager);
        const cmd = { ...validCmd(), startDate: '2026-03-28', endDate: '2026-03-30' };
        await expect(service.execute(cmd, actorEmployee)).rejects.toThrow(leave_request_validator_1.AdvanceNoticeViolationError);
    });
    it('throws OverlappingRequestError when dates overlap existing request', async () => {
        leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, advanceNoticeDays: 0 });
        employeeRepo.findById.mockResolvedValue(employeeWithManager);
        const start = farFutureDate();
        repo.findActiveByEmployee.mockResolvedValue([{ id: 'req-existing', startDate: start, endDate: endDate() }]);
        await expect(service.execute({ ...validCmd(), startDate: start }, actorEmployee)).rejects.toThrow(leave_request_validator_1.OverlappingRequestError);
    });
    it('skips balance validation for leave types that do not require balance', async () => {
        leaveTypeRepo.findById.mockResolvedValue({ ...activeLeaveType, requiresBalance: false });
        employeeRepo.findById.mockResolvedValue(employeeWithManager);
        await service.execute(validCmd(), actorEmployee);
        expect(balanceService.validateAndReserve).not.toHaveBeenCalled();
    });
});
